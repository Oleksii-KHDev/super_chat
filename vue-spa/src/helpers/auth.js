import svgCaptcha from 'svg-captcha-browser';

/**
 * Generate new captcha image and text
 *
 * @returns {Promise<Object>}
 */
export async function getCaptcha() {
  await svgCaptcha.loadFont('assets/Roboto-Black.ttf');
  return svgCaptcha.create({
    size: 5,
    noise: 10,
    color: true,
    ignoreChars: '0o1i',
    // background: '#cc9966',
  });
}

/**
 * Save user data in localStorage
 *
 * @param {object} user User data
 */
export function pushUserToStorage(user) {
  localStorage.setItem('super-chat-user', JSON.stringify(user));
}

/**
 * Gets user from localStorage
 *
 * @returns {string} serialised user data
 */
export function getUserFromStorage() {
  return localStorage.getItem('super-chat-user');
}

/**
 * Removes user from localStorage
 */
export function removeUserFromStorage() {
  localStorage.removeItem('super-chat-user');
}
