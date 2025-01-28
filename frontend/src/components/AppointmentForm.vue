<template>
  <div class="form-container">
    <h1>Programare</h1>
    <form @submit.prevent="submitForm">
      <label for="name">Nume:</label>
      <input id="name" v-model="form.name" placeholder="Introduceți numele" required />

      <label for="pet">Animal:</label>
      <input id="pet" v-model="form.pet" placeholder="Ex: Câine, Pisică" required />

      <label for="service">Serviciu:</label>
      <select id="service" v-model="form.serviceId" required>
        <option value="" disabled selected>Selectați un serviciu</option>
        <option v-for="service in services" :key="service.id" :value="service.id">
          {{ service.name }}
        </option>
      </select>

      <label for="date">Data:</label>
      <input id="date" type="date" v-model="form.date" required />

      <label for="timeInterval">Interval orar:</label>
      <select id="timeInterval" v-model="form.timeInterval" required>
        <option value="" disabled selected>Selectați un interval orar</option>
        <option value="09:00-15:00">09:00-15:00</option>
        <option value="15:00-20:00">15:00-20:00</option>
      </select>

      <label for="phone">Telefon:</label>
      <input id="phone" type="tel" v-model="form.phone" placeholder="Introduceți numărul de telefon" required />

      <button type="submit">Trimite</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppointmentForm',
  data() {
    return {
      form: {
        name: "",
        pet: "",
        serviceId: "",
        date: "",
        timeInterval: "",
        phone: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getServices", "getUser"]),
  },
  methods: {
    ...mapActions(["addAppointment", "fetchAppointments", "showNotification"]),

    async submitForm() {
      try {
        const token = this.getUser.token; 
        const appointmentData = {
          ...this.form,
          userId: this.getUser ? this.getUser.uid : null,
        };

        await this.addAppointment({ appointmentData, token });
        await this.fetchAppointments();
        this.showNotification({
          message: "Programarea a fost creată cu succes!",
          type: "success",
        });
      } catch (error) {
        console.error('Eroare la trimiterea programării:', error);
        
        this.showNotification({
          message: `Eroare: ${error.message}`,
          type: "error",
        });
      }
    }
  },
};
</script>

<style scoped>
  .form-container {
    margin-bottom: 100px;
  }
</style>
