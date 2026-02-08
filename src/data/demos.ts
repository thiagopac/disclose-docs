import type { Example } from './examples';

export const demos: Example[] = [
  {
    id: 'logo-asics',
    title: 'Logo: Asics',
    description: 'Hidden demo for social posts.',
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
];
