/**
 * Insignia de la certificación. Es un diseño propio, no el arte oficial de
 * Microsoft: para usar el oficial, descarga el PNG desde Credly a
 * `public/badges/<código>.png` y pásalo en `image`.
 */
export function CertBadge({ code, title, issuer, image }: { code: string; title: string; issuer: string; image?: string }) {
  const [prefix, number] = code.split("-");
  const gradient = `cert-g-${code}`;
  return (
    <span className="inline-flex items-center gap-3">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={`${issuer} ${code}`} width={44} height={44} className="h-11 w-11 object-contain" />
      ) : (
        <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true" focusable="false" className="shrink-0">
          <defs>
            <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>
          </defs>
          <path
            d="M24 2.5 42 12v14.5c0 9-7.4 16.3-18 19.5-10.6-3.2-18-10.5-18-19.5V12Z"
            fill={`url(#${gradient})`}
            opacity="0.14"
          />
          <path
            d="M24 2.5 42 12v14.5c0 9-7.4 16.3-18 19.5-10.6-3.2-18-10.5-18-19.5V12Z"
            fill="none"
            stroke={`url(#${gradient})`}
            strokeWidth="1.5"
          />
          <text
            x="24"
            y="22"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--foreground)"
            fontFamily="var(--font-mono)"
          >
            {prefix}
          </text>
          <text
            x="24"
            y="33"
            textAnchor="middle"
            fontSize="9"
            fill="var(--accent)"
            fontFamily="var(--font-mono)"
          >
            {number}
          </text>
        </svg>
      )}
      <span className="leading-tight">
        <span className="block text-base font-semibold tracking-tight">{title.replace(/-/g, "‑")}</span>
        <span className="mt-0.5 block text-sm text-muted">{issuer}</span>
      </span>
    </span>
  );
}
