const attachCookieToResponse = (res, cookieName, cookieValue) => {
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie(cookieName, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });
};

export { attachCookieToResponse };
