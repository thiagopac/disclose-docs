export type Example = {
  id: string;
  title: string;
  description: string;
  code: string;
};

export const examples: Example[] = [
  {
    id: 'logo-pulse',
    title: 'Logo Pulse',
    description: 'A minimal logo pulse with stroke and scale.',
    code: `const scene = Scene(() => [
  Circle(64)
    .fill('#111827')
    .stroke({ color: '#ffffff', width: 4 })
    .scale({ from: 0.9, to: 1.05, duration: 800, loop: true, ease: 'easeInOut' })
    .opacity({ from: 0.7, to: 1, duration: 800, loop: true }),
]);`,
  },
  {
    id: 'orbiting-dots',
    title: 'Orbiting Dots',
    description: 'Small dots echoing along a path with fade-out.',
    code: `const scene = Scene(() => [
  Circle(6)
    .fill('#22d3ee')
    .move({ x: [-120, 120], duration: 2000, loop: true, ease: 'easeInOut' })
    .every(200, () =>
      Circle(6)
        .fill('#22d3ee')
        .opacity({ from: 1, to: 0, duration: 800, ease: 'easeOut' })
    ),
]);`,
  },
  {
    id: 'staggered-text',
    title: 'Staggered Text',
    description: 'Letter-by-letter reveal with color and opacity.',
    code: `const scene = Scene(() => [
  Text('Disclose', { fontSize: 64, fontWeight: 600 })
    .fill({ from: '#94a3b8', to: '#ffffff', duration: 900, stagger: 30, split: 'letter' })
    .opacity({ from: 0, to: 1, duration: 900, stagger: 30, split: 'letter' }),
]);`,
  },
  {
    id: 'composed-timing',
    title: 'Composed Timing',
    description: 'Sequence, then schedule a secondary element.',
    code: `const scene = Scene(() => [
  sequence(
    Circle(48).fill('#f97316').scale({ from: 0, to: 1, duration: 600, ease: 'easeOut' }),
    Rect(140, 80).fill('#0ea5e9').rotate({ from: 0, to: Math.PI / 8, duration: 600 })
  ),
  on('scene+1200', Circle(10).fill('#22c55e').move({ y: [-80, 80], duration: 900, loop: true })),
]);`,
  },
];
