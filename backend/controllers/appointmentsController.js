import { db, admin } from '../../db_config/firebaseSDK.js';
import { addAppointmentToUser } from './usersController.js';

const createAppointment = async (req, res) => {
    try {
        const { name, pet, serviceId, date, timeInterval, phone } = req.body;

        if (!name || name.length < 3) {
          return res.status(400).json({ message: "Numele trebuie să aibă cel puțin 3 caractere." });
        }
    
        const allowedPets = ["câine", "pisică", "caine", "pisica"];
        if (!pet || !allowedPets.includes(pet.trim().toLowerCase())) {
          return res.status(400).json({ message: "Animalul trebuie să fie 'Câine' sau 'Pisică'." });
        }
    
        if (!serviceId) {
          return res.status(400).json({ message: "Serviciul este obligatoriu." });
        }
    
        const serviceDoc = await db.collection('services').doc(serviceId).get();
        if (!serviceDoc.exists) {
          return res.status(400).json({ message: "Serviciul selectat nu există." });
        }
    
        if (!date || isNaN(Date.parse(date)) || new Date(date) < new Date()) {
          return res.status(400).json({ message: "Introduceți o dată validă în viitor." });
        }
    
        if (!timeInterval) {
          return res.status(400).json({ message: "Intervalul orar este obligatoriu." });
        }
    
        const phoneRegex = /^[0-9]{10}$/;
        if (!phone || !phoneRegex.test(phone)) {
          return res.status(400).json({ message: "Introduceți un număr de telefon valid (10 cifre)." });
        }
    
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

const updateAppointment = async (req, res) => {
  try {
    const { date, timeInterval } = req.body;

    if (!date || !timeInterval) {
      return res.status(400).json({ message: "Toate câmpurile sunt obligatorii." });
    }

    const appointmentRef = db.collection("appointments").doc(req.params.id);

    const updatedData = {};
    updatedData.date = date;
    updatedData.timeInterval = timeInterval;
    updatedData["metadata.updatedAt"] = new Date().toISOString();

    await appointmentRef.update(updatedData);

    return res.status(200).json({ message: "Programarea a fost actualizată cu succes." });
  } catch (error) {
    console.error("Eroare la actualizarea programării:", error);
    return res.status(500).json({ message: "Eroare la actualizarea programării", error });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    
    const appointmentRef = db.collection("appointments").doc(appointmentId);
    const appointmentDoc = await appointmentRef.get();

    if (!appointmentDoc.exists) {
      return res.status(404).json({ message: "Programarea nu a fost găsită." });
    }

    const appointmentData = appointmentDoc.data();

    if (appointmentData.userId !== req.user.uid) {
      return res.status(403).json({ message: "Nu ai permisiunea de a anula această programare." });
    }

    await appointmentRef.delete();

    const userRef = db.collection("users").doc(req.user.uid);
    await userRef.update({
      appointments: admin.firestore.FieldValue.arrayRemove(appointmentId),
    });

    console.log(` Programare ${appointmentId} eliminată pentru user: ${req.user.uid}`);

    return res.status(200).json({ message: "Programarea a fost anulată cu succes." });
  } catch (error) {
    console.error("Eroare la anularea programării:", error);
    return res.status(500).json({ message: "Eroare la anularea programării", error });
  }
};

export { createAppointment, getAppointments, updateAppointment, deleteAppointment };