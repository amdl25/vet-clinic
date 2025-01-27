import { db } from '../../db_config/firebaseSDK.js';
import { addAppointmentToUser } from './usersController.js';

const createAppointment = async (req, res) => {
    try {
        const { name, pet, serviceId, date, timeInterval, phone } = req.body;
    
        const appointmentRef = await db.collection('appointments').add({
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
          userId: req.user ? req.user.uid : null,
        });
    
        if (req.user) {
          await addAppointmentToUser(req.user.uid, appointmentRef.id);
        }
    
        return res.status(201).json({
          message: 'Programare creată cu succes',
          appointmentId: appointmentRef.id,
        });
      } catch (error) {
        console.error('Eroare la crearea programării:', error);
        return res.status(500).json({ message: 'Eroare la crearea programării', error });
      }
};
  
const getAppointments = async (req, res) => {
    try {
        const snapshot = await db.collection('appointments').where('userId', '==', req.user.uid).get();;
        const appointments = [];
        snapshot.forEach(doc => {
        appointments.push({ id: doc.id, ...doc.data() });
        });
        return res.status(200).json(appointments);
    } catch (error) {
        console.error('Eroare la obținerea programărilor:', error);
        return res.status(500).json({ message: 'Eroare la obținerea programărilor', error });
    }
};

export { createAppointment, getAppointments };