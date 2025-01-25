import firebaseConfig from '../../db_config/firebaseConfig.js';
const { db } = firebaseConfig;

import { collection, getDocs } from 'firebase/firestore';

const getServices = async (req, res) => {
  try {
    const servicesCollection = collection(db, 'services');
    const querySnapshot = await getDocs(servicesCollection);
    const services = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Eroare la obținerea serviciilor', error });
  }
};

export { getServices };