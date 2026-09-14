/**
 * Trois visuels SVG, un par pack, pensés pour que la densité graphique
 * augmente d'un pack à l'autre : un point, puis une grille, puis un réseau
 * étendu qui reprend les deux précédents en fond, atténués.
 */

export function PointVisual() {
  return (
    <svg viewBox="0 0 200 160" role="presentation">
      <circle cx="100" cy="80" r="34" fill="none" stroke="#d4ff00" strokeWidth="0.75" opacity="0.35" />
      <circle cx="100" cy="80" r="7" fill="#d4ff00" className="pack-pulse" />
    </svg>
  );
}

export function GridVisual() {
  const cols = [50, 100, 150];
  const rows = [45, 80, 115];
  const nodes = cols.flatMap((x) => rows.map((y) => ({ x, y })));

  return (
    <svg viewBox="0 0 200 160" role="presentation">
      {rows.map((y) => (
        <line key={`h${y}`} x1="50" y1={y} x2="150" y2={y} stroke="#d4ff00" strokeWidth="0.6" opacity="0.4" />
      ))}
      {cols.map((x) => (
        <line key={`v${x}`} x1={x} y1="45" x2={x} y2="115" stroke="#d4ff00" strokeWidth="0.6" opacity="0.4" />
      ))}
      {nodes.map((n) => (
        <circle key={`${n.x}-${n.y}`} cx={n.x} cy={n.y} r="3.5" fill="#d4ff00" />
      ))}
    </svg>
  );
}

const RESEAU = [
  { x: 100, y: 80 },
  { x: 60, y: 40 },
  { x: 145, y: 35 },
  { x: 165, y: 90 },
  { x: 130, y: 130 },
  { x: 65, y: 125 },
  { x: 35, y: 75 },
  { x: 95, y: 45 },
  { x: 30, y: 40 },
  { x: 175, y: 55 },
];

const LIENS = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 7], [1, 8], [2, 9], [3, 9], [4, 5],
];

export function NetworkVisual() {
  return (
    <svg viewBox="0 0 200 160" role="presentation">
      <g opacity="0.18">
        <circle cx="100" cy="80" r="34" fill="none" stroke="#d4ff00" strokeWidth="0.75" />
        {[50, 100, 150].map((x) =>
          [45, 115].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="#d4ff00" />),
        )}
      </g>
      {LIENS.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={RESEAU[a].x}
          y1={RESEAU[a].y}
          x2={RESEAU[b].x}
          y2={RESEAU[b].y}
          stroke="#d4ff00"
          strokeWidth="0.6"
          opacity="0.5"
        />
      ))}
      {RESEAU.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={i === 0 ? 5.5 : 3.2} fill="#d4ff00" />
      ))}
    </svg>
  );
}
