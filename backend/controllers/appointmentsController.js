import firebaseConfig from '../../db_config/firebaseConfig.js';
const { db } = firebaseConfig;

import { collection, addDoc, getDocs } from 'firebase/firestore';

const createAppointment = async (req, res) => {
    const { userId, name, pet, serviceId, date, timeInterval, phone } = req.body;
    try {
      const appointmentRef = await addDoc(collection(db, 'appointments'), {
        userId,
        name,
        pet,
        serviceId,
        date,
        timeInterval,
        phone,
        status: 'pending',
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
      res.status(201).json({ message: 'Programare adăugată', appointmentId: appointmentRef.id });
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