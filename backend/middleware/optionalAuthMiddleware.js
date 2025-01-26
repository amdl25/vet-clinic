import { admin } from '../../db_config/firebaseSDK.js';

const optionalAuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("[optionalAuthMiddleware] No Authorization header");
      return next();
    }
  
    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log("[optionalAuthMiddleware] No token in Authorization header");
      return next();
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      console.log("[optionalAuthMiddleware] Token valid, user:", req.user.uid);
    } catch (error) {
      console.warn("[optionalAuthMiddleware] Token invalid sau expirat:", error);
    }
  
    next();
};

export { optionalAuthMiddleware };

