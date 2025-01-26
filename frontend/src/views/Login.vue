<template>
  <div class="form-container">
    <h1>Autentificare</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input
        id="email"
        type="text"
        v-model="email"
        placeholder="Introduceți adresa de email"
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

      <button type="submit">Autentificare</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p>
      Nu aveți un cont? <router-link to="/register">Creați unul aici</router-link>
    </p>
  </div>
</template>

<script>
import firebaseConfig from '../../../db_config/firebaseConfig.js';

const { firebaseApp } = firebaseConfig;
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { mapMutations } from "vuex";


export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
     ...mapMutations(["setUser"]),

    async login() {
      const auth = getAuth(firebaseApp);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        const token = await user.getIdToken();
        console.log("Token obținut după autentificare:", token);

        this.setUser({ ...user, token });

        alert("Autentificare reușită! Redirecționare către pagina principală.");
        this.$router.push("/");
      } catch (error) {
        console.error("Eroare la autentificare:", error.message);
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
