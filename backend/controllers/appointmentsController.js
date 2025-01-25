import firebaseConfig from '../../db_config/firebaseConfig.js';
const { db } = firebaseConfig;

import { collection, addDoc, getDocs } from 'firebase/firestore';

const createAppointment = async (req, res) => {
  try {
    const { name, pet, service, date, phone } = req.body;
    const appointmentsCollection = collection(db, 'appointments');
    const newAppointment = { name, pet, service, date, phone };
    const docRef = await addDoc(appointmentsCollection, newAppointment);
    res.status(201).json({ id: docRef.id, ...newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Eroare la crearea programării', error });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointmentsCollection = collection(db, 'appointments');
    const querySnapshot = await getDocs(appointmentsCollection);
    const appointments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Eroare la obținerea programărilor', error });
  }
};

export { createAppointment, getAppointments };