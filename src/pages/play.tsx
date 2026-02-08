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

function resolveExample(id: string | null): { code: string; title: string } {
  if (!id) return { code: examples[0].code, title: examples[0].title };
  const foundDemo = demos.find((d) => d.id === id);
  if (foundDemo) return { code: foundDemo.code, title: foundDemo.title };
  const foundExample = examples.find((e) => e.id === id);
  if (foundExample) return { code: foundExample.code, title: foundExample.title };
  return { code: examples[0].code, title: examples[0].title };
}

function PlayPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handleRef = useRef<{ stop: () => void } | null>(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const demoId = useQueryParam('demo');
    const exampleId = useQueryParam('example');
    const resolved = resolveExample(demoId ?? exampleId);
    setTitle(resolved.title);
    setCode(resolved.code);
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
      if (handleRef.current) handleRef.current.stop();
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('Canvas not ready');
      const factory = new Function('lib', `${prelude}\n${source}\nreturn scene;`);
      const scene = factory(lib);
      if (!scene) throw new Error('Scene not defined. Create a `const scene = Scene(...)`.');
      handleRef.current = lib.play(canvas, scene);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    }
  };

  return (
    <Layout title="Play">
      <div className="play-layout">
        <div className="play-header">
          <div>
            <h1>Playground</h1>
            <p className="play-subtitle">{title || 'Edit the code and preview the scene in real time.'}</p>
            <p className="play-hint">Tip: you can open shareable demos with <code>?demo=your-id</code>.</p>
          </div>
          <button className="play-run" onClick={() => runCode(code)}>Run</button>
        </div>
        <div className="play-grid">
          <div className="play-editor">
            <CodeEditor value={code} onChange={setCode} />
          </div>
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
