export type ExampleCategory = {
  id: string;
  title: string;
  description: string;
};

export type Example = {
  id: string;
  title: string;
  description: string;
  category: ExampleCategory['id'];
  code: string;
};

export const exampleCategories: ExampleCategory[] = [
  {
    id: 'motion-primitives',
    title: 'Motion Primitives',
    description: 'Foundations: timing, keyframes, and essential motion building blocks.',
  },
  {
    id: 'timing-choreo',
    title: 'Timing & Choreography',
    description: 'Sequences, parallels, offsets, and event-based timing.',
  },
  {
    id: 'paths-orbits',
    title: 'Paths & Orbits',
    description: 'Motion along curves, orbits, and path-aligned movement.',
  },
  {
    id: 'ui-motion',
    title: 'UI Motion',
    description: 'Interface patterns: loading, toggles, cards, and feedback.',
  },
];

export const examples: Example[] = [
  {
    id: 'keyframe-ribbon-title',
    title: 'Keyframe Ribbon Title',
    description: 'A polished title reveal using keyframes, staggered letters, and layered motion.',
    category: 'motion-primitives',
    code: `Scene(() => [
  Rect(520, 70)
    .gradient({
      type: 'linear',
      from: { x: -260, y: 0 },
      to: { x: 260, y: 0 },
      stops: [
        { pos: 0, color: '#22d3ee' },
        { pos: 1, color: '#a78bfa' },
      ],
    })
    .opacity({
      from: 0,
      to: 0,
      duration: 2200,
      loop: true,
      keyframes: [
        { time: 0, value: 0 },
        { time: 600, value: 0.7 },
        { time: 1400, value: 0.5 },
        { time: 2200, value: 0 },
      ],
    })
    .move({
      x: [-220, 220],
      duration: 2200,
      loop: true,
      ease: 'easeInOut',
    })
    .shadow({ color: '#38bdf8', blur: { from: 18, to: 10, duration: 2200, loop: true } }),
  Text('K E Y F R A M E S', { fontSize: 48, fontWeight: 600, letterSpacing: 4 })
    .fill({
      from: '#0f172a',
      to: '#1e293b',
      duration: 1200,
      stagger: 40,
      split: 'letter',
    })
    .opacity({
      from: 0,
      to: 1,
      duration: 1200,
      stagger: 40,
      split: 'letter',
    })
    .move({
      y: [14, 0],
      duration: 1200,
      ease: 'easeOut',
    }),
  Text('Keyframe timing in motion', { fontSize: 16, fontWeight: 500, letterSpacing: 1 })
    .fill('#475569')
    .opacity({ from: 0, to: 1, duration: 900, start: 'scene+400' })
    .move({ y: [10, 0], duration: 900, ease: 'easeOut', start: 'scene+400' })
    .at({ x: 0, y: 54 }),
  Rect(260, 3)
    .fill('#38bdf8')
    .opacity({
      from: 0,
      to: 1,
      duration: 1600,
      loop: true,
      keyframes: [
        { time: 0, value: 0 },
        { time: 300, value: 1 },
        { time: 1300, value: 1 },
        { time: 1600, value: 0 },
      ],
    })
    .scaleX({
      from: 0.3,
      to: 1,
      duration: 1600,
      loop: true,
      ease: 'easeInOut',
    })
    .at({ x: 0, y: 70 }),
])`,
  },
  {
    id: 'linear-ease-loop',
    title: 'Transit Dots',
    description: 'Linear motion with easing, delay, and clean looping.',
    category: 'motion-primitives',
    code: `Scene(() => [
  Line({ x: -190, y: 0 }, { x: 190, y: 0 })
    .stroke({ color: '#e2e8f0', width: 2 })
    .opacity(1),
  Circle(10)
    .fill('#38bdf8')
    .move({ x: [-180, 180], duration: 1800, loop: true, ease: 'easeInOut' }),
  Circle(10)
    .fill('#22d3ee')
    .move({ x: [-180, 180], duration: 1800, loop: true, ease: 'easeInOut', start: 'scene+250' }),
  Circle(10)
    .fill('#a78bfa')
    .move({ x: [-180, 180], duration: 1800, loop: true, ease: 'easeInOut', start: 'scene+500' }),
])`,
  },
  {
    id: 'stagger-letters',
    title: 'Staggered Letters',
    description: 'Letter-by-letter reveal with color and opacity timing.',
    category: 'motion-primitives',
    code: `Scene(() => [
  Text('MOTION', { fontSize: 64, fontWeight: 700, letterSpacing: 6 })
    .fill({ from: '#0f172a', to: '#334155', duration: 1200, stagger: 40, split: 'letter' })
    .opacity({ from: 0, to: 1, duration: 1200, stagger: 40, split: 'letter' })
    .move({ y: [16, 0], duration: 1200, ease: 'easeOut' }),
])`,
  },
  {
    id: 'stagger-words-lines',
    title: 'Staggered Words + Lines',
    description: 'Word and line staggering for editorial layout motion.',
    category: 'motion-primitives',
    code: `Scene(() => [
  Text('Design systems for motion', { fontSize: 20, fontWeight: 600, letterSpacing: 1 })
    .fill({ from: '#1e293b', to: '#475569', duration: 900, stagger: 120, split: 'word' })
    .opacity({ from: 0, to: 1, duration: 900, stagger: 120, split: 'word' })
    .at({ x: 0, y: -30 }),
  Text('Declarative timing\\nCrisp choreography', { fontSize: 20, fontWeight: 600, letterSpacing: 1 })
    .fill({ from: '#1e293b', to: '#475569', duration: 900, stagger: 200, split: 'line' })
    .opacity({ from: 0, to: 1, duration: 900, stagger: 200, split: 'line' })
    .move({ y: [10, 0], duration: 900, ease: 'easeOut' })
    .at({ x: 0, y: 40 }),
])`,
  },
  {
    id: 'rotate-scale-opacity',
    title: 'Rotate + Scale + Opacity',
    description: 'A composed transform stack used in modern UI motion.',
    category: 'motion-primitives',
    code: `Scene(() => [
  RoundedRect(220, 140, 24)
    .fill('#f8fafc')
    .stroke({ color: '#e2e8f0', width: 2 })
    .shadow({ color: '#0f172a', blur: 24, offsetY: 10 })
    .rotate({ from: -0.5, to: 0.5, duration: 2400, loop: true, ease: 'easeInOut' })
    .scale({ from: 0.8, to: 1.12, duration: 2400, loop: true, ease: 'easeInOut' })
    .opacity({ from: 0.25, to: 1, duration: 2400, loop: true, ease: 'easeInOut' }),
  Circle(6)
    .fill('#38bdf8')
    .at({ x: 70, y: -40 }),
  Rect(150, 8)
    .fill('#0f172a')
    .opacity(0.7)
    .at({ x: 0, y: 15 }),
  Rect(110, 8)
    .fill('#334155')
    .opacity(0.7)
    .at({ x: 0, y: 38 }),
])`,
  },
  {
    id: 'sequence-build',
    title: 'Sequence Build',
    description: 'Shapes enter one after another with crisp timing.',
    category: 'timing-choreo',
    code: `Scene(() => [
  sequence(
    RoundedRect(140, 80, 18)
      .fill('#38bdf8')
      .scale({ from: 0, to: 1, duration: 500, ease: 'easeOut' }),
    RoundedRect(180, 60, 16)
      .fill('#a78bfa')
      .move({ y: [24, 0], duration: 500, ease: 'easeOut' })
      .opacity({ from: 0, to: 1, duration: 500 }),
    Rect(220, 8)
      .fill('#22d3ee')
      .scaleX({ from: 0, to: 1, duration: 400, ease: 'easeOut' })
      .at({ x: 0, y: 56 })
  ),
])`,
  },
  {
    id: 'parallel-ensemble',
    title: 'Parallel Ensemble',
    description: 'Multiple elements animated together in sync.',
    category: 'timing-choreo',
    code: `Scene(() => [
  parallel(
    Circle(60).fill('#0f172a').opacity({ from: 0.4, to: 0.9, duration: 1400, loop: true }),
    RegularPolygon(6, 80)
      .stroke({ color: '#38bdf8', width: 2 })
      .rotate({ from: 0, to: Math.PI, duration: 1400, loop: true, ease: 'easeInOut' }),
    Star(6, 70, 28)
      .fill('#facc15')
      .scale({ from: 0.9, to: 1.1, duration: 1400, loop: true, ease: 'easeInOut' })
      .opacity({ from: 0.6, to: 1, duration: 1400, loop: true })
  ),
])`,
  },
  {
    id: 'scheduled-bursts',
    title: 'Scheduled Bursts',
    description: 'Timed accents layered on top of a base motion.',
    category: 'timing-choreo',
    code: `Scene(() => [
  Circle(54)
    .stroke({ color: '#1f2937', width: 2 })
    .opacity(0.5),
  Circle(10)
    .fill('#38bdf8')
    .move({ x: [-120, 120], duration: 1600, loop: true, ease: 'easeInOut' }),
  on('scene+400',
    Circle(14)
      .fill('#a78bfa')
      .scale({ from: 0, to: 1.4, duration: 500 })
      .opacity({ from: 1, to: 0, duration: 600 })
  ),
  on('scene+1200',
    Circle(10)
      .fill('#22d3ee')
      .scale({ from: 0, to: 1.3, duration: 500 })
      .opacity({ from: 1, to: 0, duration: 600 })
  ),
])`,
  },
  {
    id: 'offset-loops',
    title: 'Offset Loops',
    description: 'Looped elements with staggered start offsets.',
    category: 'timing-choreo',
    code: `Scene(() => [
  Rect(320, 6).fill('#1f2937').opacity(0.8),
  Circle(8)
    .fill('#38bdf8')
    .move({ x: [-150, 150], duration: 1600, loop: true, ease: 'easeInOut' }),
  Circle(8)
    .fill('#22d3ee')
    .move({ x: [-150, 150], duration: 1600, loop: true, ease: 'easeInOut', start: 'scene+200' }),
  Circle(8)
    .fill('#a78bfa')
    .move({ x: [-150, 150], duration: 1600, loop: true, ease: 'easeInOut', start: 'scene+400' }),
  Circle(8)
    .fill('#f97316')
    .move({ x: [-150, 150], duration: 1600, loop: true, ease: 'easeInOut', start: 'scene+600' }),
])`,
  },
  {
    id: 'repeat-delay',
    title: 'Repeat Delay Pulse',
    description: 'A clean pulse using repeat delays for breathing rhythm.',
    category: 'timing-choreo',
    code: `Scene(() => [
  Circle(36)
    .fill('#38bdf8')
    .scale({ from: 0.75, to: 1.05, duration: 600, loop: true, ease: 'easeOut', repeatDelay: 700 })
    .opacity({ from: 0.6, to: 1, duration: 600, loop: true, repeatDelay: 700 }),
  Circle(70)
    .stroke({ color: '#38bdf8', width: 2 })
    .opacity({
      from: 0.6,
      to: 0,
      duration: 600,
      loop: true,
      repeatDelay: 700,
      ease: 'easeOut',
    })
    .scale({ from: 0.9, to: 1.3, duration: 600, loop: true, repeatDelay: 700, ease: 'easeOut' }),
])`,
  },
  {
    id: 'follow-bezier',
    title: 'Follow Bezier',
    description: 'A dot gliding along a smooth bezier path.',
    category: 'paths-orbits',
    code: `Scene(() => [
  BezierPath([
    { cmd: 'moveTo', x: -180, y: 60 },
    { cmd: 'cubicTo', cp1x: -80, cp1y: -120, cp2x: 80, cp2y: 120, x: 180, y: -40 },
  ])
    .stroke({ color: '#cbd5f5', width: 2 })
    .opacity(0.8),
  Circle(10)
    .fill('#38bdf8')
    .pathMotion({
      path: BezierPath([
        { cmd: 'moveTo', x: -180, y: 60 },
        { cmd: 'cubicTo', cp1x: -80, cp1y: -120, cp2x: 80, cp2y: 120, x: 180, y: -40 },
      ]),
      duration: 2600,
      loop: true,
      ease: 'easeInOut',
    }),
])`,
  },
  {
    id: 'orient-to-path',
    title: 'Orient To Path',
    description: 'An arrow aligned to the curve tangent.',
    category: 'paths-orbits',
    code: `Scene(() => [
  BezierPath([
    { cmd: 'moveTo', x: -200, y: -20 },
    { cmd: 'cubicTo', cp1x: -120, cp1y: 120, cp2x: 120, cp2y: -120, x: 200, y: 20 },
  ])
    .stroke({ color: '#e2e8f0', width: 2 })
    .opacity(0.9),
  Triangle(48, 32, { direction: 'right' })
    .fill('#0f172a')
    .pathMotion({
      path: BezierPath([
        { cmd: 'moveTo', x: -200, y: -20 },
        { cmd: 'cubicTo', cp1x: -120, cp1y: 120, cp2x: 120, cp2y: -120, x: 200, y: 20 },
      ]),
      duration: 2400,
      loop: true,
      ease: 'easeInOut',
    })
    .orientToPath({ offset: Math.PI / 2 }),
])`,
  },
  {
    id: 'elliptical-orbit',
    title: 'Elliptical Orbit',
    description: 'A satellite orbiting an elliptical path.',
    category: 'paths-orbits',
    code: `Scene(() => [
  BezierPath([
    { cmd: 'moveTo', x: 200, y: 0 },
    { cmd: 'cubicTo', cp1x: 200, cp1y: 82.84, cp2x: 104.48, cp2y: 150, x: 0, y: 150 },
    { cmd: 'cubicTo', cp1x: -104.48, cp1y: 150, cp2x: -200, cp2y: 82.84, x: -200, y: 0 },
    { cmd: 'cubicTo', cp1x: -200, cp1y: -82.84, cp2x: -104.48, cp2y: -150, x: 0, y: -150 },
    { cmd: 'cubicTo', cp1x: 104.48, cp1y: -150, cp2x: 200, cp2y: -82.84, x: 200, y: 0 },
    { cmd: 'close' },
  ])
    .stroke({ color: '#e2e8f0', width: 2 })
    .opacity(0.9),
  Circle(12)
    .fill('#22d3ee')
    .pathMotion({
      path: BezierPath([
        { cmd: 'moveTo', x: 200, y: 0 },
        { cmd: 'cubicTo', cp1x: 200, cp1y: 82.84, cp2x: 104.48, cp2y: 150, x: 0, y: 150 },
        { cmd: 'cubicTo', cp1x: -104.48, cp1y: 150, cp2x: -200, cp2y: 82.84, x: -200, y: 0 },
        { cmd: 'cubicTo', cp1x: -200, cp1y: -82.84, cp2x: -104.48, cp2y: -150, x: 0, y: -150 },
        { cmd: 'cubicTo', cp1x: 104.48, cp1y: -150, cp2x: 200, cp2y: -82.84, x: 200, y: 0 },
        { cmd: 'close' },
      ]),
      duration: 5200,
      loop: true,
      ease: 'linear',
    }),
  Circle(28).fill('#f8fafc').shadow({ color: '#94a3b8', blur: 10 }),
])`,
  },
  {
    id: 'trail-echo',
    title: 'Trail Echo',
    description: 'Temporal copies forming a trailing motion.',
    category: 'paths-orbits',
    code: `Scene(() => [
  Circle(10)
    .fill('#38bdf8')
    .pathMotion({
      path: BezierPath([
        { cmd: 'moveTo', x: -200, y: 0 },
        { cmd: 'cubicTo', cp1x: -80, cp1y: -120, cp2x: 80, cp2y: 120, x: 200, y: 0 },
      ]),
      duration: 2400,
      loop: true,
      ease: 'easeInOut',
    })
    .every(120, () =>
      Circle(10)
        .fill('#38bdf8')
        .opacity({ from: 0.6, to: 0, duration: 900 })
        .scale({ from: 1, to: 0.2, duration: 900 })
    ),
])`,
  },
  {
    id: 'spinner-arc',
    title: 'Loading Arc',
    description: 'Clean spinner using a rotating arc.',
    category: 'ui-motion',
    code: `Scene(() => [
  Arc(60, 0, Math.PI * 1.4, { thickness: 10 })
    .stroke({ color: '#0ea5e9', width: 10, cap: 'round' })
    .rotate({ from: 0, to: Math.PI * 2, duration: 1400, loop: true, ease: 'linear' }),
  Circle(70)
    .fill('rgba(0, 0, 0, 0)')
    .stroke({ color: '#e2e8f0', width: 2 }),
])`,
  },
  {
    id: 'button-press',
    title: 'Button Press',
    description: 'Press and release feedback with scale and shadow.',
    category: 'ui-motion',
    code: `Scene(() => [
  RoundedRect(220, 70, 20)
    .fill('#0f172a')
    .shadow({ color: '#0f172a', blur: 16, offsetY: 6 })
    .scale({ from: 1, to: 0.94, duration: 240, loop: true, ease: 'easeInOut', repeatDelay: 700 })
    .opacity({ from: 1, to: 0.9, duration: 240, loop: true, repeatDelay: 700 }),
  Text('Save', { fontSize: 20, fontWeight: 600 })
    .fill('#ffffff')
    .scale({ from: 1, to: 0.96, duration: 240, loop: true, ease: 'easeInOut', repeatDelay: 700 }),
])`,
  },
  {
    id: 'toggle-switch',
    title: 'Toggle Switch',
    description: 'A looped toggle motion with a soft bounce.',
    category: 'ui-motion',
    code: `Scene(() => [
  RoundedRect(200, 72, 36)
    .fill('#e2e8f0')
    .stroke({ color: '#cbd5f5', width: 2 }),
  Circle(28)
    .fill('#38bdf8')
    .move({ x: [-60, 60], duration: 1200, loop: true, ease: 'easeInOut', repeatDelay: 400 })
    .scale({ from: 0.9, to: 1, duration: 400, loop: true, ease: 'easeOut' }),
  Text('ON', { fontSize: 16, fontWeight: 600 })
    .fill('#0f172a')
    .opacity({ from: 0.3, to: 1, duration: 1200, loop: true, ease: 'easeInOut' })
    .at({ x: -20, y: 0 }),
])`,
  },
  {
    id: 'card-enter-exit',
    title: 'Card Enter/Exit',
    description: 'A card slides in, settles, and fades out.',
    category: 'ui-motion',
    code: `Scene(() => [
  RoundedRect(260, 140, 22)
    .fill('#ffffff')
    .stroke({ color: '#e2e8f0', width: 2 })
    .shadow({ color: '#94a3b8', blur: 18, offsetY: 8 })
    .move({
      y: [40, 0],
      duration: 700,
      loop: true,
      ease: 'easeOut',
      keyframes: [
        { time: 0, y: 40 },
        { time: 700, y: 0 },
        { time: 1800, y: 0 },
        { time: 2400, y: -20 },
      ],
    })
    .opacity({
      from: 0,
      to: 1,
      duration: 2400,
      loop: true,
      keyframes: [
        { time: 0, value: 0 },
        { time: 400, value: 1 },
        { time: 2000, value: 1 },
        { time: 2400, value: 0 },
      ],
    }),
  Text('New message', { fontSize: 18, fontWeight: 600 })
    .fill('#0f172a')
    .opacity({ from: 0, to: 1, duration: 600, loop: true, start: 'scene+200' })
    .at({ x: 0, y: -18 }),
  Text('You have 3 unread items', { fontSize: 12 })
    .fill('#64748b')
    .opacity({ from: 0, to: 1, duration: 600, loop: true, start: 'scene+300' })
    .at({ x: 0, y: 16 }),
])`,
  },
  {
    id: 'distort-panels',
    title: 'Distort Panels',
    description: 'Perspective-like panels built with the distort modifier.',
    category: 'ui-motion',
    code: `Scene(() => [
  Rect(220, 120)
    .fill('#0f172a')
    .distort({
      tl: { x: -24, y: 0 },
      tr: { x: -54, y: 20 },
      br: { x: -12, y: 0 },
      bl: { x: 8, y: -10 },
    })
    .move({ x: [-30, 30], duration: 1800, loop: true, ease: 'easeInOut' }),
  Rect(160, 88)
    .fill('#38bdf8')
    .opacity(0.9)
    .distort({
      tl: { x: -10, y: 0 },
      tr: { x: -22, y: 8 },
      br: { x: -2, y: 0 },
      bl: { x: 4, y: -6 },
    })
    .move({ x: [-18, 18], duration: 1800, loop: true, ease: 'easeInOut' })
    .at({ x: 0, y: 8 }),
])`,
  },
  {
    id: 'notification-pop',
    title: 'Notification Pop',
    description: 'Compact notification popping with scale and fade.',
    category: 'ui-motion',
    code: `Scene(() => [
  RoundedRect(240, 80, 18)
    .fill('#0f172a')
    .shadow({ color: '#0f172a', blur: 16, offsetY: 8 })
    .scale({ from: 0.7, to: 1, duration: 600, loop: true, ease: 'easeOut', repeatDelay: 1200 })
    .opacity({ from: 0, to: 1, duration: 600, loop: true, repeatDelay: 1200 }),
  Text('Synced', { fontSize: 18, fontWeight: 600 })
    .fill('#ffffff')
    .opacity({ from: 0, to: 1, duration: 500, loop: true, start: 'scene+150', repeatDelay: 1200 }),
])`,
  },
  {
    id: 'skeleton-shimmer',
    title: 'Skeleton Shimmer',
    description: 'A loading placeholder with a moving shimmer band.',
    category: 'ui-motion',
    code: `Scene(() => [
  RoundedRect(320, 160, 18)
    .fill('#f1f5f9')
    .stroke({ color: '#e2e8f0', width: 2 }),
  Rect(260, 16).fill('#e2e8f0').at({ x: 0, y: -40 }),
  Rect(220, 12).fill('#e2e8f0').at({ x: -20, y: -10 }),
  Rect(180, 12).fill('#e2e8f0').at({ x: -40, y: 16 }),
  Rect(320, 160)
    .gradient({
      type: 'linear',
      from: { x: -160, y: 0 },
      to: { x: 160, y: 0 },
      stops: [
        { pos: 0, color: 'rgba(255,255,255,0)' },
        { pos: 0.5, color: 'rgba(255,255,255,0.7)' },
        { pos: 1, color: 'rgba(255,255,255,0)' },
      ],
    })
    .opacity(0.9)
    .move({ x: [-260, 260], duration: 1400, loop: true, ease: 'easeInOut' }),
])`,
  },
];
