import { admin, db } from '../../db_config/firebaseSDK.js';

const saveUser = async (req, res) => {
  try {
    const { uid, name, email, phone, appointments } = req.body;
  
    const userRef = db.collection('users').doc(uid);
    await userRef.set({
      name,
      email,
      phone,
      appointments: appointments || [],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }, { merge: true });

    res.status(201).json({ message: 'Utilizator salvat cu succes' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Eroare la salvarea utilizatorului', error });
  }
};


async function addAppointmentToUser(userId, appointmentId) {
    console.log("[addAppointmentToUser]", "userId =", userId, "appointmentId =", appointmentId);
  
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
  
    if (!userDoc.exists) {
      await userRef.set({
        appointments: [appointmentId],
      });
      console.log("[addAppointmentToUser] Document creat pentru user:", userId);
    } else {
      await userRef.update({
        appointments: admin.firestore.FieldValue.arrayUnion(appointmentId),
      });
      console.log("[addAppointmentToUser] Appointment adăugat pentru user:", userId);
    }
  }
  

export { saveUser, addAppointmentToUser };
