import svgCaptcha from 'svg-captcha-browser';
/* eslint-disable-next-line import/prefer-default-export */
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

export function pushUserToStorage(user) {
  localStorage.setItem('super-chat-user', JSON.stringify(user));
}

export function getUserFromStorage() {
  return localStorage.getItem('super-chat-user');
}

export function removeUserFromStorage() {
  localStorage.removeItem('super-chat-user');
}
