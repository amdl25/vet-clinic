import { db } from '../../db_config/firebaseSDK.js';

const getServices = async (req, res) => {
    try {
      const snapshot = await db.collection('services').get();
      const services = [];
      snapshot.forEach(doc => {
        services.push({ id: doc.id, ...doc.data() });
      });
      return res.json(services);
    } catch (error) {
      console.error('Eroare la obținerea serviciilor:', error);
      return res.status(500).json({ message: 'Eroare la obținerea serviciilor', error });
    }
};

export {getServices};