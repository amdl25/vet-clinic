<template>
  <div>
    <p>Completează formularul pentru a face o programare.</p>
    <AppointmentForm @submit-appointment="handleAppointment" />
    <p v-if="submittedAppointment">
      Programare trimisă: {{ submittedAppointment.name }} pentru {{ submittedAppointment.pet }} la {{ submittedAppointment.date }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AppointmentForm from '../components/AppointmentForm.vue';

export default {
  name: 'Appointments',
  components: {
    AppointmentForm,
  },
  data() {
    return {
      submittedAppointment: null,
    };
  },
  methods: {
    ...mapActions(["addAppointment"]),

    async handleAppointment(appointment) {
      try {
        await this.addAppointment(appointment);
        this.submittedAppointment = appointment;
        console.log('Programare primită:', appointment);
      } catch (error) {
        console.error('Eroare la trimiterea programării:', error);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
