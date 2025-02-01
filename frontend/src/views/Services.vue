<template>
  <div class="services-container">
    <div class="services-banner">
      <h1>Servicii Veterinare</h1>
      <p>Oferim o gamă variată de servicii pentru sănătatea și îngrijirea animalului tău.</p>
    </div>

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
  background: linear-gradient(to bottom, #f4f0ff, white);
  padding: 50px 20px;
  text-align: center;
}

.services-banner {
  position: relative;
  background: url("../assets/banner.jpg") center/cover no-repeat;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.801);
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 30px;
}

.services-banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
}

.services-banner h1,
.services-banner p {
  position: relative;
  z-index: 1;
}

.services-banner p {
  color: #f4f0ff;
  font-weight: 600;
}

.service-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
</style>
