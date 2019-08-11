module.exports = () => (req, res, next) => {
  res.set('Access-Control-Allow-Origin', req.headers.origin || '*'); // TODO: Limit this origin to the specific
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.set('Access-Control-Expose-Headers', 'Server-Message,Authorization');
  res.set('Cache-Control', 'no-cache');
  res.set('Content-Length', '');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  return next();
};
