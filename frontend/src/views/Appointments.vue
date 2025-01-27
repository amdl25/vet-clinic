<template>
  <div>
    <p>Completează formularul pentru a face o programare.</p>
    <AppointmentForm @submit-appointment="handleAppointment" />
    <p v-if="submittedAppointment">
      Programare trimisă: {{ submittedAppointment.name }} pentru {{ submittedAppointment.pet }} la {{ submittedAppointment.date }}
    </p>
    <h2>Istoricul programărilor</h2>
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
    ...mapGetters(['isAuthenticated', 'getServices']),
    getServiceName() {
      return (serviceId) => {
        const service = this.getServices.find((s) => s.id === serviceId);
        return service ? service.name : "Serviciu necunoscut";
      };
    },
  },
  methods: {
    ...mapActions(["addAppointment", "fetchAppointments"]),

    async handleAppointment(appointment) {
      try {
        await this.addAppointment(appointment);
        this.submittedAppointment = appointment;
        console.log('Programare primită:', appointment);
      } catch (error) {
        console.error('Eroare la trimiterea programării:', error);
      }
    },

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
}
.appointment-item {
  margin-bottom: 20px;
}
</style>
