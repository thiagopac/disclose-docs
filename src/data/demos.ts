import type { Example } from './examples';

export const demos: Example[] = [
  {
    id: 'logo-asics',
    title: 'Logo: Asics',
    description: 'Hidden demo for social posts.',
    category: 'logos-type',
    code: `Scene(() => [
  Rect(220, 70)
    .fill('#0f172a')
    .opacity({ from: 0, to: 1, duration: 300 }),
  Text('ASICS', { fontSize: 42, fontWeight: 700, letterSpacing: 6 })
    .fill('#ffffff')
    .opacity({ from: 0, to: 1, duration: 800, start: 'scene+150' })
    .move({ y: [20, 0], duration: 800, start: 'scene+150', ease: 'easeOut' }),
])`,
  },
  {
    id: 'logo-adidas',
    title: 'Logo: Adidas Stripes',
    description: 'Three black adidas-style stripes (static).',
    category: 'logos-type',
    code: `Scene(() => [
  Rect(120, 79.8)
    .anchor('bottomRight')
    .distort({ tr: { x: -37.21, y: 0 }, tl: { x: -15.78, y: 45.96 } })
    .opacity({ from: 0, to: 1, duration: 700, start: 'scene+0', ease: 'easeOut' })
    .at({ x: -95, y: 80 }),
  Rect(120, 157.32)
    .anchor('bottomRight')
    .distort({ tr: { x: -73.36, y: 0 }, tl: { x: -51.93, y: 45.96 } })
    .opacity({ from: 0, to: 1, duration: 700, start: 'scene+220', ease: 'easeOut' })
    .at({ x: 70, y: 80 }),
  Rect(120, 241.68)
    .anchor('bottomRight')
    .distort({ tr: { x: -112.7, y: 0 }, tl: { x: -91.27, y: 45.96 } })
    .opacity({ from: 0, to: 1, duration: 700, start: 'scene+440', ease: 'easeOut' })
    .at({ x: 235, y: 80 }),
])`,
  },
];
