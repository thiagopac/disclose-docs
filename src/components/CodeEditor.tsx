import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { StreamLanguage } from '@codemirror/stream-parser';
import { indentWithTab } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';

const keywords = new Set([
  'Scene',
  'Circle',
  'Rect',
  'RoundedRect',
  'Ellipse',
  'Line',
  'Path',
  'Polygon',
  'RegularPolygon',
  'RegularStar',
  'Star',
  'Text',
  'Image',
  'Arc',
  'Ring',
  'BezierPath',
  'Capsule',
  'Pie',
  'Spiral',
  'Custom',
  'sequence',
  'parallel',
  'on',
  'when',
  'Copy',
]);

const dslLanguage = StreamLanguage.define({
  token(stream) {
    if (stream.eatSpace()) return null;
    const ch = stream.peek();
    if (ch === '/' && stream.match('//')) {
      stream.skipToEnd();
      return 'comment';
    }
    if (ch === '"' || ch === "'") {
      stream.next();
      let escaped = false;
      while (!stream.eol()) {
        const c = stream.next();
        if (c === ch && !escaped) break;
        escaped = !escaped && c === '\\';
      }
      return 'string';
    }
    if (stream.match(/-?\d+(\.\d+)?/)) return 'number';
    if (stream.match(/[A-Za-z_][A-Za-z0-9_]*/)) {
      const word = stream.current();
      if (keywords.has(word)) return 'keyword';
      return 'variableName';
    }
    stream.next();
    return null;
  },
});

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function CodeEditor({ value, onChange }: Props) {
  const host = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!host.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: value,
      extensions: [
        dslLanguage,
        syntaxHighlighting(defaultHighlightStyle),
        keymap.of([indentWithTab]),
        oneDark,
        updateListener,
        EditorView.lineWrapping,
      ],
    });

    const view = new EditorView({ state, parent: host.current });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current === value) return;
    view.dispatch({
      changes: { from: 0, to: current.length, insert: value },
    });
  }, [value]);

  return <div className="dsl-editor" ref={host} />;
}
