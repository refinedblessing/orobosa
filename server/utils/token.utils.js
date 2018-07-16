import jwt from 'jsonwebtoken';

const createToken = auth => jwt.sign(
  {
    id: auth.id,
  },
  'youraisemeup',
  {
    expiresIn: 60 * 120,
  },
);

module.exports = {
  generateToken: (req, res, next) => {
    req.token = createToken(req.auth);
    return next();
  },
  sendToken: (req, res) => {
    req.session.ssid = req.token;
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
  },
  verifyToken: (req, res, next) => {
    if (req.session.ssid) {
      jwt.verify(req.session.ssid, 'youraisemeup', (err, decoded) => {
        if (decoded.id) {
          res.locals.user = decoded.id;
          console.log("verify token",res.locals.user);
        }
      });
    }
    return next();
  },
};
