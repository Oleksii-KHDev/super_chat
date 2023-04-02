import url from 'url';
import path from 'node:path';

/**
 * Returns url to public dir (express static dir)
 */
export function getPublicUrl(): string {
  const dirname = url.fileURLToPath(new URL('.', import.meta.url));
  return path.join(dirname, '../../client');
}

/**
 * Gets dir with messages files
 */
export function getFilesUrl(): string {
  const publicUrl = getPublicUrl();
  return path.join(publicUrl, './files');
}
