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
        @blur="validateField('email')"
      />
      <p v-if="errors.email" class="error">{{ errors.email }}</p>

      <label for="password">Parolă:</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Introduceți parola"
        @blur="validateField('password')"
      />
      <p v-if="errors.password" class="error">{{ errors.password }}</p>

      <button type="submit">Autentificare</button>
    </form>
    <p v-if="errors.submit" class="error">{{ errors.submit }}</p>
    <p>
      Nu aveți un cont? <router-link to="/register">Creați unul aici</router-link>
    </p>
  </div>
</template>

<script>
import firebaseConfig from '../../../db_config/firebaseConfig.js';
const { firebaseApp } = firebaseConfig;

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { mapMutations, mapActions } from "vuex";
import Notification from "../components/Notification.vue";


export default {
  name: "Login",
  components: {
    Notification,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      errors: {},
    };
  },
  methods: {
    ...mapActions(["showNotification"]),
    ...mapMutations(["setUser"]),

    validateField(field) {
      this.errors[field] = "";

      if (field === "email") {
        if (!this.email) {
          this.errors.email = "Adresa de email este obligatorie.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
          this.errors.email = "Introduceți o adresă de email validă.";
        }
      }

      if (field === "password") {
        if (!this.password) {
          this.errors.password = "Parola este obligatorie.";
        } else if (this.password.length < 6) {
          this.errors.password = "Parola trebuie să aibă cel puțin 6 caractere.";
        }
      }
    },

    async login() {

      this.validateField("email");
      this.validateField("password");

      if (Object.keys(this.errors).some((key) => this.errors[key])) {
        return;
      }

      const auth = getAuth(firebaseApp);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        const token = await user.getIdToken();
        console.log("Token obținut după autentificare:", token);

        this.setUser({ ...user, token });

        this.showNotification({
          message: "Autentificare reușită!",
          type: "success",
        });

        this.$router.push("/");
      } catch (error) {
        console.error("Eroare la autentificare:", error.message);

        const errorMessages = {
        "auth/invalid-credential": "Credențialele sunt invalide. Verificați email-ul și parola.",
        };

        this.errors.submit = errorMessages[error.code] || "A apărut o eroare. Te rugăm să încerci din nou.";

        this.showNotification({
          message: this.error.submit,
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  margin-bottom: 100px;
}

.error {
  color: rgb(255, 99, 71);
  font-size: 10px;
  font-style: italic;
  text-align: left;
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>
