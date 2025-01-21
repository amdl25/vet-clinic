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
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  name: 'LoginView',
  setup() {
    const store = useStore();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const login = () => {
      if (email.value === 'admin@gmail.com' && password.value === 'password') {
        const user = { email: email.value, id: 1 };
        store.commit('setUser', user);
        errorMessage.value = '';
        alert('Autentificare reușită!');
      } else {
        errorMessage.value = 'Nume de utilizator sau parolă incorectă';
      }
    };

    return {
      email,
      password,
      errorMessage,
      login,
    };
  },
};
</script>

