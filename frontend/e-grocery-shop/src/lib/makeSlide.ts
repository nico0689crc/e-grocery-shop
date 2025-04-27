'use server';

import type { CarouselSlide } from '@/types';
import { getCldImageUrl } from 'next-cloudinary';

async function makeSlide(id: string): Promise<CarouselSlide> {
  const tinyUrl = getCldImageUrl({ src: id, width: 20 });
  const resp = await fetch(tinyUrl);
  const buf = Buffer.from(await resp.arrayBuffer());
  const blurDataURL = `data:${resp.headers.get('content-type')};base64,${buf.toString('base64')}`;

  return { src: id, blurDataURL };
}

export default makeSlide;
