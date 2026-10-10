export interface Chunk {
  id: string;
  source: string;
  text: string;
}

const STOP = new Set(
  "de la el en y a los las un una por con para que se del al es lo su sus como mas pero mi me tu te cual cuales tienes tiene has hecho sobre hay son fue ha he o u e le les usas usaste haces hiciste experiencia trabajado trabajaste trabajo experience worked work used the of and to in is are was with for on at by an be it as do does did you your have has had how what which can could about that this from or".split(" "),
);

/** Normaliza, quita tildes y stopwords, y reduce cada palabra a un prefijo (stem tosco). */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
    .map((t) => (t.length > 6 ? t.slice(0, 6) : t.length > 3 ? t.replace(/s$/, "") : t));
}

export interface Hit {
  chunk: Chunk;
  score: number;
}

/** TF-IDF + similitud coseno. Ilustra el paso de recuperación de un RAG, sin llamadas a APIs. */
export function retrieve(query: string, chunks: Chunk[], k = 3): Hit[] {
  const docs = chunks.map((c) => tokenize(`${c.source} ${c.text}`));
  const df = new Map<string, number>();
  for (const d of docs) for (const t of new Set(d)) df.set(t, (df.get(t) ?? 0) + 1);
  const idf = (t: string) => Math.log(1 + chunks.length / (df.get(t) ?? chunks.length));

  const vector = (tokens: string[]) => {
    const v = new Map<string, number>();
    for (const t of tokens) v.set(t, (v.get(t) ?? 0) + 1);
    for (const [t, tf] of v) v.set(t, tf * idf(t));
    return v;
  };
  const norm = (v: Map<string, number>) => Math.sqrt([...v.values()].reduce((s, x) => s + x * x, 0));

  const q = vector(tokenize(query));
  const qn = norm(q);
  if (!qn) return [];

  return chunks
    .map((chunk, i) => {
      const d = vector(docs[i]);
      let dot = 0;
      for (const [t, w] of q) dot += w * (d.get(t) ?? 0);
      const score = dot / (qn * (norm(d) || 1));
      return { chunk, score };
    })
    .filter((h) => h.score > 0.04)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
