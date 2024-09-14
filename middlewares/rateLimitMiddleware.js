let requestCounts = {};

const rateLimitMiddleware = (req, res, next) => {
  const userIp = req.ip;

  if (!requestCounts[userIp]) {
    requestCounts[userIp] = 1;
  } else {
    requestCounts[userIp]++;
  }

  if (requestCounts[userIp] > 100) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  // Reset counts after 1 hour
  setTimeout(() => {
    delete requestCounts[userIp];
  }, 60 * 60 * 1000);

  next();
};

module.exports = {rateLimitMiddleware};
