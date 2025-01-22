import { createStore } from "vuex";
import { firebaseApp } from "../config/firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getServices } from "../config/firestoreServices";
import { createAppointment } from "../config/firestoreServices";
import { saveUser } from "../config/firestoreServices";


export const store = createStore({
  state: {
    user: null,
    services: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
    setServices(state, services) {
      state.services = services;
    },
  },
  actions: {
    initializeAuth({ commit }) {
      try {
        console.log("FirebaseApp:", firebaseApp);
        const auth = getAuth(firebaseApp);
        console.log("Auth:", auth);
        onAuthStateChanged(auth, (user) => {
          console.log("User state changed:", user);
          commit("setUser", user || null);
        });
      } catch (error) {
        console.error("Error in initializeAuth:", error.message);
      }
    },
    async logout({ commit }) {
      const auth = getAuth(firebaseApp);
      try {
        await signOut(auth);
        commit("logout");
      } catch (error) {
        console.error("Eroare la delogare:", error.message);
      }
    },
    async fetchServices({ commit }) {
      try {
        const services = await getServices();
        commit("setServices", services);
      } catch (error) {
        console.error("Eroare la obținerea serviciilor:", error);
      }
    },
    async addAppointment(_, appointment) {
      try {
        await createAppointment(appointment);
        console.log("Programarea a fost creată cu succes:", appointment);
      } catch (error) {
        console.error("Eroare la crearea programării:", error.message);
      }
    },
    async saveUserToDatabase(_, user) {
      try {
        await saveUser(user);
        console.log("Utilizator salvat în baza de date:", user);
      } catch (error) {
        console.error("Eroare la salvarea utilizatorului în baza de date:", error.message);
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    getUser(state) {
      return state.user;
    },
    getServices(state) {
      return state.services;
    },
  },
});

