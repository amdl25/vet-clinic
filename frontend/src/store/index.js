import axios from 'axios';
import { createStore } from 'vuex';
import { getAuth, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";

import firebaseConfig from '../../../db_config/firebaseConfig.js';

const { firebaseApp } = firebaseConfig;

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
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdToken();
          console.log("Utilizator autentificat:", user);
          commit("setUser", { ...user, token });
        } else {
          console.log("Niciun utilizator autentificat.");
          commit("logout");
        }
      });
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
        const response = await axios.get('http://localhost:3000/api/services');
        commit('setServices', response.data);
      } catch (error) {
        console.error('Eroare la obținerea serviciilor:', error);
      }
    },

    async addAppointment(_, { appointmentData, token }) {
      try {
        const response = await axios.post('http://localhost:3000/api/appointments', appointmentData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Programarea a fost creată:', response.data);
      } catch (error) {
        console.error('Eroare la adăugarea programării:', error);
      }
    },

    async fetchAppointments({ state }) {
      try {
        const auth = getAuth(firebaseApp);
        const user = auth.currentUser;
        if (!user) throw new Error("Utilizator nelogat");

        const token = await user.getIdToken();

        const response = await axios.get("http://localhost:3000/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        console.error("Eroare la obținerea programărilor:", error);
        throw error;
      }
    },

    async saveUserToDatabase(_, user) {
      try {
        const response = await axios.post('http://localhost:3000/api/users', user, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        console.log("Utilizator salvat în baza de date:", response.data);
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
