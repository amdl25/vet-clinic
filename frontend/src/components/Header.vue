<template>
  <header>
    <h1>Clinica Veterinară</h1>
    <nav>
      <router-link to="/">Acasă</router-link>
      <router-link to="/about">Despre noi</router-link>
      <router-link to="/services">Servicii</router-link>
      <router-link to="/appointments">Programări</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link v-if="!isAuthenticated" to="/login">Autentificare</router-link>
      <button v-if="isAuthenticated" @click="logout">Delogare</button>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Logout from "../views/Logout.vue";

export default {
  components: { Logout },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

