const jwt=require('jsonwebtoken')

const secret="elo_morelo"

// const token = jwt.sign({id:2},secret)

// console.log(token)

// console.log(jwt.verify(token,secret))

const authenticate = (req, res, next) => {
    // const token = req.body.token//.split('.')[1];
    const authHeader = req.headers['authorization']; // Get the Authorization header
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is missing' });
    }
  
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(403).json({ message: 'Nie podano tokena' });
    }
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Zly token', error: error.message });
    }
  };
  
  module.exports = authenticate;