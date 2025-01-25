import firebaseConfig from '../../db_config/firebaseConfig.js';
const { db } = firebaseConfig;

import { doc, setDoc } from 'firebase/firestore';

const saveUser = async (req, res) => {
  try {
    const { uid, name, email, phone } = req.body;
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { name, email, phone }, { merge: true });
    res.status(201).json({ message: 'Utilizator salvat cu succes' });
  } catch (error) {
    res.status(500).json({ message: 'Eroare la salvarea utilizatorului', error });
  }
};
export { saveUser };