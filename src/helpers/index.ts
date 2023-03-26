import url from 'url';
import path from 'node:path';

export function getPublicUrl(): string {
  const dirname = url.fileURLToPath(new URL('.', import.meta.url));
  return path.join(dirname, '../../client');
}
