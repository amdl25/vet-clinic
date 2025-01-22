<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.initializeAuth();
  },
  methods: {
    ...mapActions(["initializeAuth"]),
  },
};
</script>
