import React, { useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { exampleCategories, examples } from '../data/examples';

export default function Examples() {
  const grouped = useMemo(
    () =>
      exampleCategories
        .map((category) => ({
          ...category,
          items: examples.filter((ex) => ex.category === category.id),
        }))
        .filter((category) => category.items.length > 0),
    []
  );

  return (
    <Layout title="Examples">
      <main className="container margin-vert--lg">
        <div className="row">
          <aside className="col col--3">
            <nav className="menu examples-menu">
              <ul className="menu__list">
                {grouped.map((category) => (
                  <li key={category.id} className="menu__list-item">
                    <a className="menu__link" href={`#${category.id}`}>
                      {category.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <section className="col col--9">
            <header className="margin-bottom--lg">
              <h1>Examples</h1>
              <p>Short, focused scenes you can open in the playground.</p>
            </header>
            {grouped.map((category) => (
              <section key={category.id} id={category.id} className="margin-bottom--lg">
                <h2 className="margin-bottom--sm">{category.title}</h2>
                <p className="margin-bottom--md">{category.description}</p>
                <div className="examples-grid">
                  {category.items.map((ex) => (
                    <Link key={ex.id} className="examples-card" to={`/play?example=${ex.id}`}>
                      <h3>{ex.title}</h3>
                      <p>{ex.description}</p>
                      <span className="examples-link">Open in Playground →</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </section>
        </div>
      </main>
    </Layout>
  );
}
