import React, { useEffect, useMemo, useRef, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';
import { CodeEditor } from '../components/CodeEditor';
import { examples } from '../data/examples';
import { demos } from '../data/demos';
import * as lib from 'disclose-dsl';

const prelude = `const {
  Scene,
  Circle,
  Rect,
  RoundedRect,
  Ellipse,
  Line,
  Path,
  Polygon,
  RegularPolygon,
  RegularStar,
  Star,
  Triangle,
  Text,
  Image,
  Arc,
  Ring,
  BezierPath,
  Capsule,
  Pie,
  Spiral,
  Custom,
  Shape,
  Copy,
  sequence,
  parallel,
  on,
  when,
} = lib;`;

function useQueryParam(name: string): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function resolveExample(id: string | null): { code: string; title: string; description: string } {
  if (!id) {
    return {
      code: `Scene(() => [\n  \n])`,
      title: 'Playground',
      description: 'Start from an empty scene.',
    };
  }
  const foundDemo = demos.find((d) => d.id === id);
  if (foundDemo) return { code: foundDemo.code, title: foundDemo.title, description: foundDemo.description };
  const foundExample = examples.find((e) => e.id === id);
  if (foundExample) return { code: foundExample.code, title: foundExample.title, description: foundExample.description };
  return {
    code: `Scene(() => [\n  \n])`,
    title: 'Playground',
    description: 'Start from an empty scene.',
  };
}

function PlayPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<{ stop: () => void } | null>(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [split, setSplit] = useState(50);
  const [logs, setLogs] = useState<string[]>([]);
  const dragRef = useRef(false);
  const diagCountRef = useRef(0);

  useEffect(() => {
    const demoId = useQueryParam('demo');
    const exampleId = useQueryParam('example');
    const resolved = resolveExample(demoId ?? exampleId);
    setTitle(resolved.title);
    setDescription(resolved.description);
    setCode(resolved.code);
  }, []);

  useEffect(() => {
    const unsubscribe = lib.Diagnostics.on((items) => {
      const next = items.slice(diagCountRef.current);
      if (next.length === 0) return;
      diagCountRef.current = items.length;
      setLogs((prev) => [...prev, ...next.map(formatDiagnostic)]);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragRef.current) return;
      const grid = gridRef.current;
      if (!grid) return;
      const rect = grid.getBoundingClientRect();
      const next = ((event.clientX - rect.left) / rect.width) * 100;
      const clamped = Math.min(78, Math.max(22, next));
      setSplit(clamped);
    };
    const onUp = () => {
      dragRef.current = false;
      document.body.classList.remove('is-dragging');
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  useEffect(() => {
    if (!code) return;
    const timeout = window.setTimeout(() => {
      runCode(code);
    }, 250);
    return () => window.clearTimeout(timeout);
  }, [code]);

  const runCode = (source: string) => {
    try {
      setError(null);
      setLogs([]);
      diagCountRef.current = 0;
      lib.Diagnostics.clear();
      if (handleRef.current) handleRef.current.stop();
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('Canvas not ready');
      const cleaned = source.replace(/;+\s*$/, '');
      const hasSceneCall = /\bScene\s*\(/.test(source);
      const wrapped = hasSceneCall
        ? `const scene = (${cleaned});\nreturn scene;`
        : `const scene = Scene(() => [\n${cleaned}\n]);\nreturn scene;`;
      const factory = new Function('lib', `${prelude}\n${wrapped}`);
      const original = { log: console.log, warn: console.warn, error: console.error };
      const sink = (label: string) => (...args: any[]) =>
        setLogs((prev) => [...prev, `${label} ${args.map(formatValue).join(' ')}`]);
      console.log = sink('log');
      console.warn = sink('warn');
      console.error = sink('error');
      const scene = factory(lib);
      console.log = original.log;
      console.warn = original.warn;
      console.error = original.error;
      if (!scene) throw new Error('Scene not defined. Create a `const scene = Scene(...)`.');
      const safeScene = (t: number) => {
        const out = scene(t);
        if (!Array.isArray(out)) return [];
        return out.filter((item) => {
          if (!item) return false;
          if (typeof (item as any).evaluate === 'function') return true;
          return typeof (item as any).kind === 'string' && (item as any).transform;
        });
      };

      const renderer = new lib.Renderer(canvas, safeScene);
      const timeline = new lib.Timeline();
      let raf = 0;
      const tick = () => {
        try {
          renderer.render(timeline.now());
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message);
          setLogs((prev) => [...prev, `error ${message}`]);
          return;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      handleRef.current = {
        stop: () => {
          if (raf) cancelAnimationFrame(raf);
        },
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setLogs((prev) => [...prev, `error ${message}`]);
    }
  };

  return (
    <Layout title="Play">
      <div className="play-layout">
        <div className="play-header">
          <div className="play-title">
            <span className="play-title-text">{title || 'Play'}</span>
            {description ? <div className="play-description">{description}</div> : null}
          </div>
          <button className="play-run" onClick={() => runCode(code)}>Run</button>
        </div>
        <div ref={gridRef} className="play-grid" style={{ gridTemplateColumns: `${split}% 12px ${100 - split}%` }}>
          <div className="play-left">
            <div className="play-editor">
              <CodeEditor value={code} onChange={setCode} />
            </div>
            <div className="play-console">
              <div className="play-console-header">
                <span>Console</span>
                <button className="play-console-clear" onClick={() => setLogs([])}>Clear</button>
              </div>
              <div className="play-console-body">
                {logs.length === 0 ? <div className="play-console-empty">No output.</div> : null}
                {logs.map((line, idx) => (
                  <div key={idx} className="play-console-line">{line}</div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="play-divider"
            role="separator"
            aria-orientation="vertical"
            onPointerDown={(event) => {
              event.preventDefault();
              dragRef.current = true;
              document.body.classList.add('is-dragging');
            }}
          />
          <div className="play-preview">
            <canvas ref={canvasRef} id="play-canvas" />
            {error ? <div className="play-error">{error}</div> : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function Play() {
  return (
    <BrowserOnly>
      {() => <PlayPage />}
    </BrowserOnly>
  );
}

function formatValue(value: any): string {
  if (typeof value === 'string') return value;
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return '[object]';
    }
  }
  return String(value);
}

function formatDiagnostic(item: any): string {
  const level = item.level ?? 'info';
  const detail = item.detail ? ` — ${item.detail}` : '';
  return `${level} ${item.message}${detail}`;
}
