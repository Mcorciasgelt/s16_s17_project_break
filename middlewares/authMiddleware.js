
const admin = require("../config/firebase");

const verifyToken = async (req, res, next) => {
  const idToken = req.cookies.token;

  if (!idToken) {
    return res.redirect('/login');
  }

  admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      next();
    })
    .catch(error => {
      console.error('Error verifying token:', error);
      res.redirect('/login');
    });
};

module.exports = verifyToken; 

