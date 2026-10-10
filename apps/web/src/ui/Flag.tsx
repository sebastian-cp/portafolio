/** Bandera de Chile. SVG propio, sin dependencias ni imágenes. */
export function ChileFlag({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={`inline-block h-3 w-[1.125rem] rounded-[2px] ring-1 ring-black/10 ${className}`}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
    >
      <rect width="30" height="20" fill="#fff" />
      <rect y="10" width="30" height="10" fill="#d52b1e" />
      <rect width="10" height="10" fill="#0039a6" />
      <polygon
        fill="#fff"
        points="5.00,2.00 5.67,4.07 7.85,4.07 6.09,5.35 6.76,7.43 5.00,6.15 3.24,7.43 3.91,5.35 2.15,4.07 4.33,4.07"
      />
    </svg>
  );
}
