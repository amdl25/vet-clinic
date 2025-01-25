<template>
  <div class="services-container">
    <h1>Servicii Veterinare</h1>
    <div class="service-list">
      <ServiceCard 
        v-for="service in services" 
        :key="service.id" 
        :service="service" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ServiceCard from '../components/ServiceCard.vue';

export default {
  components: {
    ServiceCard
  },
  data() {
    return {
      services: [],
    };
  },
  computed: {
    ...mapGetters(["getServices"]),
  },
  created() {
    this.loadServices();
  },
  methods: {
    ...mapActions(["fetchServices"]),
    
    async loadServices() {
      try {
        await this.fetchServices(); 
        this.services = this.getServices;
      } catch (error) {
        console.error('Eroare la obținerea serviciilor:', error);
      }
    }
  },
};
</script>

<style scoped>
.services-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 20px;
}

.service-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
}
</style>
