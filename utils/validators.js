const {ec} = require("elliptic");

export const isValidEmail = (_email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return emailRegex.test(_email);
}

export const isValidPublicAddress = (_publicAddr) => {
    const publicAddrRegex = /^0x[a-fA-F0-9]{40}$/gm;
    return publicAddrRegex.test(_publicAddr);
}

export const isValidAadharCard = (_aadharCard) => {
    const aadharCardRegex = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/

    return aadharCardRegex.test(_aadharCard);
}

export const isvalidatePrivateKey = (_privateKey) => {
    if (!/^[0-9a-fA-F]{64}$/.test(_privateKey)) {
        return false;
    }

    const secp256k1 = new ec('secp256k1');

    try {
        secp256k1.keyFromPrivate(_privateKey, 'hex');
    } catch (error) {
        // Private key is invalid
        return false;
    }

    return true;
}

// * Verifies the user JWToken -> Used for protected Pages
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      req.user = decoded;
      next();
    });
  };
  
  // * Used for verifying the credentials -> Login Page
  const verifyCred = async (req, res, next) => {
    const { username, password } = req.body;
  
    if (!(username && password)) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      const user = await User.findOne({username, password});
      if (!user) user = await Organization.findOne({username, password});
  
      if (user) {
        next();
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  };