import React, { useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CodeBlock from '@theme/CodeBlock';
import * as lib from 'disclose-dsl';

type Props = {
  title: string;
  description?: string;
  code: string;
  swift?: string;
  height?: number;
  animate?: boolean;
};

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
  Triangle,
  Polyline,
  Custom,
  Shape,
  Copy,
  sequence,
  parallel,
  on,
  when,
} = lib;`;

function buildScene(source: string): any {
  const cleaned = source.replace(/;+\s*$/, '').trim();
  const hasSceneCall = /\bScene\s*\(/.test(cleaned);
  const wrapped = hasSceneCall
    ? `const scene = (${cleaned});\nreturn scene;`
    : `const scene = Scene(() => [\n${cleaned}\n]);\nreturn scene;`;
  const factory = new Function('lib', `${prelude}\n${wrapped}`);
  return factory(lib);
}

function CanvasPreview({ code, height, animate }: { code: string; height: number; animate: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf = 0;
    let active = true;

    try {
      const scene = buildScene(code);
      const renderer = new lib.Renderer(canvas, scene);
      const timeline = new lib.Timeline();
      if (animate) {
        const tick = () => {
          if (!active) return;
          renderer.render(timeline.now());
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      } else {
        const renderOnce = () => {
          if (!active) return;
          const done = renderer.render(0);
          if (!done) raf = requestAnimationFrame(renderOnce);
        };
        renderOnce();
      }
    } catch (err) {
      console.error(err);
    }

    return () => {
      active = false;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [code, animate]);

  return (
    <div className="shape-canvas" style={{ height }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export function ShapeShowcase({ title, description, code, swift, height = 200, animate = false }: Props) {
  const snippet = code;
  return (
    <div className="shape-showcase">
      <BrowserOnly>
        {() => <CanvasPreview code={code} height={height} animate={animate} />}
      </BrowserOnly>
      <div className="shape-showcase-body">
        <div className="shape-showcase-title">{title}</div>
        {description ? <div className="shape-showcase-desc">{description}</div> : null}
        <div className="shape-showcase-label">DSL</div>
        <CodeBlock language="ts">{snippet}</CodeBlock>
      </div>
    </div>
  );
}
