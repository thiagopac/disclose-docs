import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { examples } from '../data/examples';

export default function Examples() {
  return (
    <Layout title="Examples">
      <div className="examples-layout">
        <div className="examples-header">
          <h1>Examples</h1>
          <p>Short, focused scenes you can open in the playground.</p>
        </div>
        <div className="examples-grid">
          {examples.map((ex) => (
            <Link key={ex.id} className="examples-card" to={`/play?example=${ex.id}`}>
              <h3>{ex.title}</h3>
              <p>{ex.description}</p>
              <span className="examples-link">Open in Playground →</span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
