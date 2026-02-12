import React, { useMemo } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { demos } from '../data/demos';

type Group = {
  id: string;
  title: string;
  items: typeof demos;
};

function categoryTitle(id: string): string {
  return id
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export default function Demos() {
  const grouped = useMemo<Group[]>(
    () =>
      Array.from(new Set(demos.map((demo) => demo.category))).map((category) => ({
        id: category,
        title: categoryTitle(category),
        items: demos.filter((demo) => demo.category === category),
      })),
    []
  );

  return (
    <Layout title="Demos">
      <main className="container margin-vert--lg">
        <div className="row">
          <aside className="col col--3">
            <nav className="menu examples-menu">
              <ul className="menu__list">
                {grouped.map((group) => (
                  <li key={group.id} className="menu__list-item">
                    <a className="menu__link" href={`#${group.id}`}>
                      {group.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <section className="col col--9">
            <header className="margin-bottom--lg">
              <h1>Demos</h1>
              <p>Special demo scenes available in the playground.</p>
            </header>
            {grouped.map((group) => (
              <section key={group.id} id={group.id} className="margin-bottom--lg">
                <h2 className="margin-bottom--sm">{group.title}</h2>
                <div className="examples-grid">
                  {group.items.map((demo) => (
                    <Link key={demo.id} className="examples-card" to={`/play?demo=${demo.id}`}>
                      <h3>{demo.title}</h3>
                      <p>{demo.description}</p>
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
