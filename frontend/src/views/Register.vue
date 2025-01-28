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
        @blur="validateField('username')"
      />
      <p v-if="errors.username" class="error">{{ errors.username }}</p>

      <label for="email">Email:</label>
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="Introduceți adresa de email"
        @blur="validateField('email')"
      />
      <p v-if="errors.email" class="error">{{ errors.email }}</p>

      <label for="phone">Telefon:</label>
      <input
        id="phone"
        type="tel"
        v-model="phone"
        placeholder="Introduceți numărul de telefon"
        @blur="validateField('phone')"
      />
      <p v-if="errors.phone" class="error">{{ errors.phone }}</p>

      <label for="password">Parolă:</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Introduceți parola"
        @blur="validateField('password')"
      />
      <p v-if="errors.password" class="error">{{ errors.password }}</p>

      <button type="submit">Înregistrare</button>
    </form>
    <p v-if="errors.submit" class="error">{{ errors.submit }}</p>
    <p>
      Aveți deja un cont? <router-link to="/login">Autentificați-vă aici</router-link>
    </p>
  </div>
</template>

<script>
import firebaseConfig from '../../../db_config/firebaseConfig.js';
const { firebaseApp } = firebaseConfig;
import { getAuth, createUserWithEmailAndPassword, updateProfile, getIdToken, signOut } from "firebase/auth";
import { mapActions, useStore } from "vuex";
import Notification from "../components/Notification.vue"

export default {
  name: "Register",
  components: {
    Notification,
  },
  data() {
    return {
      username: "",
      email: "",
      phone: "",
      password: "",
      errors: {},
    };
  },
  methods: {
    ...mapActions(["showNotification"]),
    validateField(field) {
      this.errors[field] = "";

      switch (field) {
        case "username":
          if (!this.username) {
            this.errors.username = "Numele este obligatoriu.";
          } else if (this.username.length < 3) {
            this.errors.username = "Numele trebuie să aibă cel puțin 3 caractere.";
          }
          break;

        case "email":
          if (!this.email) {
            this.errors.email = "Adresa de email este obligatorie.";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
            this.errors.email = "Introduceți o adresă de email validă.";
          }
          break;

        case "phone":
          const phoneRegex = /^[0-9]{10}$/;
          if (!this.phone) {
            this.errors.phone = "Numărul de telefon este obligatoriu.";
          } else if (!phoneRegex.test(this.phone)) {
            this.errors.phone = "Introduceți un număr de telefon valid (10 cifre).";
          }
          break;

        case "password":
          if (!this.password) {
            this.errors.password = "Parola este obligatorie.";
          } else if (this.password.length < 6) {
            this.errors.password = "Parola trebuie să aibă cel puțin 6 caractere.";
          }
          break;

        default:
          break;
      }
    },

    async register() {
      this.errors = {};

      ['username', 'email', 'phone', 'password'].forEach((field) => this.validateField(field));

      if (Object.keys(this.errors).some((key) => this.errors[key])) {
        return;
      }

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

        this.showNotification( {
          message: "Înregistrare reușită! Vă rugăm să vă autentificați.",
          type: "success",
        });

        await signOut(auth);
        console.log("Utilizator delogat după înregistrare");

        this.$router.push("/login");
        } catch (error) {
          console.error("Eroare la înregistrare:", error.message);

          const errorMessages = {
          "auth/email-already-in-use": "Adresa de email introdusă este deja asociată unui cont existent.",
          };
          this.errors.submit = errorMessages[error.code] || "A apărut o eroare. Te rugăm să încerci din nou.";

          this.showNotification( {
          message: "Înregistrarea a eșuat.",
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
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
