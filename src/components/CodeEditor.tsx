import React, { useEffect, useRef } from 'react';
import { Compartment, EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { defaultHighlightStyle, syntaxHighlighting, indentOnInput } from '@codemirror/language';
import { indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark, oneDarkHighlightStyle } from '@codemirror/theme-one-dark';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function CodeEditor({ value, onChange }: Props) {
  const host = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const themeCompartment = useRef(new Compartment()).current;
  const highlightCompartment = useRef(new Compartment()).current;

  useEffect(() => {
    if (!host.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    });

    const isDark = document.documentElement.dataset.theme === 'dark';
    const state = EditorState.create({
      doc: value,
      extensions: [
        javascript(),
        indentOnInput(),
        lineNumbers(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        highlightCompartment.of(syntaxHighlighting(isDark ? oneDarkHighlightStyle : defaultHighlightStyle)),
        themeCompartment.of(
          isDark
            ? oneDark
            : EditorView.theme(
                {
                  '&': { backgroundColor: '#ffffff', color: '#111827' },
                  '.cm-gutters': {
                    backgroundColor: '#ffffff',
                    color: '#64748b',
                    borderRight: '1px solid #e2e8f0',
                  },
                },
                { dark: false }
              )
        ),
        keymap.of([indentWithTab]),
        updateListener,
        EditorView.lineWrapping,
        EditorState.tabSize.of(2),
      ],
    });

    const view = new EditorView({ state, parent: host.current });
    viewRef.current = view;

    const observer = new MutationObserver(() => {
      const dark = document.documentElement.dataset.theme === 'dark';
      view.dispatch({
        effects: [
          themeCompartment.reconfigure(
            dark
              ? oneDark
              : EditorView.theme(
                  {
                    '&': { backgroundColor: '#ffffff', color: '#111827' },
                    '.cm-gutters': {
                      backgroundColor: '#ffffff',
                      color: '#64748b',
                      borderRight: '1px solid #e2e8f0',
                    },
                  },
                  { dark: false }
                )
          ),
          highlightCompartment.reconfigure(
            syntaxHighlighting(dark ? oneDarkHighlightStyle : defaultHighlightStyle)
          ),
        ],
      });
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      observer.disconnect();
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
