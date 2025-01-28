<template>
  <div>
    <p>Completează formularul pentru a face o programare.</p>
    <AppointmentForm/>

    <h2 v-if="isAuthenticated">Istoricul programărilor</h2>
    <div v-if="appointments.length === 0">
      <p>Nu aveți programări înregistrate.</p>
    </div>
    <ul v-else class="appointments-history">
      <li
        v-for="appointment in appointments"
        :key="appointment.id"
        class="appointment-item"
      >
        <strong>{{ appointment.date }}</strong> - {{ appointment.timeInterval }}
        <br />
        Animal: {{ appointment.pet }} - Serviciu: {{ getServiceName(appointment.serviceId) }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { watch } from 'vue';
import AppointmentForm from '../components/AppointmentForm.vue';


export default {
  name: 'Appointments',
  components: {
    AppointmentForm,
  },
  data() {
    return {
      submittedAppointment: null,
      appointments: []
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getServices', "appointments"]),
    getServiceName() {
      return (serviceId) => {
        const service = this.getServices.find((s) => s.id === serviceId);
        return service ? service.name : "Serviciu necunoscut";
      };
    },
  },
  methods: {
    ...mapActions(["fetchAppointments"]),

    async loadAppointments() {
      try {
        const appointments = await this.fetchAppointments();
        this.appointments = appointments;
        console.log(`Număr de programări preluate din backend: ${this.appointments.length}`);
      } catch (error) {
        console.error('Eroare la obținerea programărilor:', error);
      }
    },
  },
  mounted() {
    watch(
      () => this.isAuthenticated,
      (val) => {
        if (val) {
          console.log('Utilizator autentificat, încărcăm programările.');
          this.loadAppointments();
        } else {
          console.log('Utilizator neautentificat, nu putem încărca programările.');
        }
      },
      { immediate: true }
    );
  },
};
</script>

<style scoped>
.appointments-history {
  margin-bottom: 80px;
  padding: 10px;
  list-style-type: none;
}

.appointment-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .appointments-history {
    padding: 5px;
  }

  .appointment-item {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 14px;
  }

  strong {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
  }
}


@media (min-width: 1024px) {
  .appointments-history {
    max-width: 800px;
    margin: 0 auto 80px auto;
  }

  .appointment-item {
    margin-bottom: 25px;
    padding: 20px;
    font-size: 18px;
  }

  strong {
    display: block;
    font-size: 20px;
    margin-bottom: 8px;
  }
}
</style>
