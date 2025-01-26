import { admin } from '../../db_config/firebaseSDK.js';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "Acces interzis. Nu există token de autentificare." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token invalid sau expirat:", error);
    return res.status(401).json({ message: "Token invalid sau expirat", error });
  }
};

export { authMiddleware };
