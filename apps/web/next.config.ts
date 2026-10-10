import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // En Vercel con Services las imágenes que pasaban por /_next/image salían rotas.
  // Los logos y las fotos ya vienen livianos (PNG pequeños y webp), así que se sirven tal cual.
  images: { unoptimized: true },
};

export default nextConfig;
