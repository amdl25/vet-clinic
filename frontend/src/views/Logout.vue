<template>
  <div>
    <button @click="handleLogout">Delogare</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getAuth, signOut } from "firebase/auth";
import firebaseConfig from '../../../db_config/firebaseConfig.js';

const { firebaseApp } = firebaseConfig;

export default {
  name: "Logout",
  methods: {
    ...mapActions(["logout"]),

    async handleLogout() {
      const auth = getAuth(firebaseApp);
      try {
        await signOut(auth);

        await this.logout();
        
        alert("Delogare reușită!");
        this.$router.push("/");
      } catch (error) {
        console.error("Eroare la delogare:", error.message);
      }
    },
  },
};
</script>
