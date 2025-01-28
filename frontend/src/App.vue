<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
    <Notification />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Notification from "./components/Notification.vue";

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Notification
  },
  mounted() {
    this.initializeAuth();
  },
  methods: {
    ...mapActions(["initializeAuth"]),
  },
};
</script>
