<template>
  <div class="form-container">
    <h1>Creați un cont</h1>
    <form @submit.prevent="register">
      <label for="username">Nume de utilizator:</label>
      <input
        id="username"
        type="text"
        v-model="username"
        placeholder="Introduceți numele de utilizator"
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

      <label for="password">Parolă:</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Introduceți parola"
        required
      />

      <button type="submit">Creați contul</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p>
      Aveți deja un cont? <router-link to="/login">Autentificați-vă aici</router-link>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'RegisterView',
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const register = () => {
      if (username.value && email.value && password.value) {
        alert('Cont creat cu succes!');
        errorMessage.value = '';
      } else {
        errorMessage.value = 'Toate câmpurile sunt obligatorii.';
      }
    };

    return {
      username,
      email,
      password,
      errorMessage,
      register,
    };
  },
};
</script>

<style scoped>
.form-container{
    margin-bottom: 100px;
}
</style>

