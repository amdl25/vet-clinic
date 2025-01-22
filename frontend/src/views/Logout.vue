<script>
import { mapActions } from "vuex";

export default {
  name: "Logout",
  methods: {
    ...mapActions(["logout"]),
    async handleLogout() {
      try {
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

<template>
  <div>
    <button @click="handleLogout">Delogare</button>
  </div>
</template>
