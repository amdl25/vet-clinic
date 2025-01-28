<template>
    <div v-if="isVisible" :class="['notification', type]">
    {{ message }}
    </div>
</template>
  
<script>
import { mapState } from "vuex";
import { computed } from "vue";

export default {
    name: "Notification",
    computed: {
        ...mapState({
        notification: (state) => state.notification,
        }),
        isVisible() {
            return !!this.notification.message;
        },
        message() {
            return this.notification.message || "";
        },
        type() {
            return this.notification.type || "info";
        }
    },
};
</script>
  
<style scoped>
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    font-size: 1rem;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .notification.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  .notification.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
  .notification.info {
    background-color: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
  }
  .notification.warning {
    background-color: #fff3cd;
    color: #856404;
    border: 1px solid #ffeeba;
  }
</style>
  