

const deleteCookies = (res, ...cookies) => {
    cookies.forEach((cookie) => {
      res.cookie(cookie, 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
      });
    });
  };

module.exports = deleteCookies