import { db } from "./firebaseConfig";
import { collection, doc, getDoc, getDocs, setDoc, addDoc, query, where, deleteDoc } from "firebase/firestore";


export const getServices = async () => {
    const servicesCollection = collection(db, "services");
    const querySnapshot = await getDocs(servicesCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};


export const createAppointment = async (appointment) => {
    const appointmentsCollection = collection(db, "appointments");
    return await addDoc(appointmentsCollection, appointment);
  };

export const saveUser = async (user) => {
    const userRef = doc(db, "users", user.uid);
    return await setDoc(userRef, {
      name: user.name,
      email: user.email,
      phone: user.phone
    }, { merge: true });
};
  


  