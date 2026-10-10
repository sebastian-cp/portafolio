import Image, { type StaticImageData } from "next/image";
import type { Content } from "@/i18n";
import bosque from "@/assets/hobbies/bosque.webp";
import cerezo from "@/assets/hobbies/cerezo.webp";
import flores from "@/assets/hobbies/flores.webp";
import glaciar from "@/assets/hobbies/glaciar.webp";
import lago from "@/assets/hobbies/lago.webp";

const PHOTOS: Record<string, StaticImageData> = { lago, cerezo, bosque, glaciar, flores };
/** Fotos horizontales: ocupan dos columnas y marcan el alto de su fila. */
const WIDE = new Set(["cerezo"]);

/** Galería en grilla: las verticales comparten fila y la horizontal se estira a dos columnas. */
export function Hobbies({ t }: { t: Content["hobbies"] }) {
  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-2xl text-lg leading-relaxed text-muted">{t.intro}</p>
        <ul className="flex shrink-0 flex-wrap gap-1.5">
          {t.tags.map((tag) => <li key={tag} className="chip">{tag}</li>)}
        </ul>
      </div>

      <ul aria-label={t.galleryLabel} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.photos.map((p) => (
          <li key={p.id} className={WIDE.has(p.id) ? "sm:col-span-2" : ""}>
            <figure className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface-2">
              <Image
                src={PHOTOS[p.id]}
                alt={p.alt}
                placeholder="blur"
                sizes={WIDE.has(p.id) ? "(min-width: 1024px) 752px, 100vw" : "(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw"}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-10 font-mono text-xs text-white">
                {p.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
