<template>
  <div class="top-bar">
    <div class="contact-info">
      <span> Telefon: <a href="tel:0727452139">0727 452 139</a></span>
      <span> Email: <a href="mailto:contact@vitavet.ro">contact@vitavet.ro</a></span>
    </div>
  </div>

  <header>
    <h1>VitaVet</h1>
    <nav>
      <router-link to="/">Acasă</router-link>
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

<style scoped>
.top-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  background: #f5f5f5;
  font-size: 14px;
}

.top-bar .contact-info {
  display: flex;
  gap: 20px;
}

.top-bar a {
  text-decoration: none;
  color: #6A0DAD;
  font-weight: bold;
}

@media (max-width: 768px) {
  .top-bar {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 8px 10px;
    font-size: 12px;
  }

  .top-bar .contact-info {
    flex-direction: column;
    gap: 5px;
  }

  .top-bar a {
    font-size: 12px;
  }
}


</style>

