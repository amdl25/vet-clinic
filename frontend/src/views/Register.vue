<template>
  <div class="form-container">
    <h1>Creați un cont</h1>
    <form @submit.prevent="register">
      <label for="username">Nume și prenume:</label>
      <input
        id="username"
        type="text"
        v-model="username"
        placeholder="Introduceți numele și prenumele"
        required
      />

      <label for="email">Email:</label>
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="Introduceți adresa de email"
        required
      />

      <label for="phone">Telefon:</label>
      <input
        id="phone"
        type="tel"
        v-model="phone"
        placeholder="Introduceți numărul de telefon"
        required
      />

      <label for="password">Parolă:</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Introduceți parola"
        required
      />

      <button type="submit">Înregistrare</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p>
      Aveți deja un cont? <router-link to="/login">Autentificați-vă aici</router-link>
    </p>
  </div>
</template>

<script>
import firebaseConfig from '../../../db_config/firebaseConfig.js';
const { firebaseApp } = firebaseConfig;
import { getAuth, createUserWithEmailAndPassword, updateProfile, getIdToken, signOut } from "firebase/auth";
import { mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      phone: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async register() {
      const auth = getAuth(firebaseApp);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: this.username });
        console.log("Utilizator înregistrat:", user);

        const token = await getIdToken(user);
        console.log("Token de autentificare:", token);

        await this.$store.dispatch("saveUserToDatabase", {
          uid: user.uid,
          name: this.username,
          email: this.email,
          phone: this.phone,
          appointments: [],
          token: token,
        });

        await signOut(auth);
        console.log("Utilizator delogat după înregistrare");

        alert("Înregistrare reușită! Vă rugăm să vă autentificați pentru a continua.");
        this.$router.push("/login");
        } catch (error) {
          console.error("Eroare la înregistrare:", error.message);
          this.errorMessage = "Eroare: " + error.message;
        }
      },
    },
  };
</script>


<style scoped>
.form-container {
  margin-bottom: 100px;
}
</style>
