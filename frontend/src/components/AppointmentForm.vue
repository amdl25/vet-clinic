<template>
  <div class="form-container">
    <h1>Programare</h1>
    <form @submit.prevent="submitForm">
      <label for="name">Nume:</label>
      <input id="name" v-model="form.name" placeholder="Introduceți numele" required />

      <label for="pet">Animal:</label>
      <input id="pet" v-model="form.pet" placeholder="Ex: Câine, Pisică" required />

      <label for="service">Serviciu:</label>
      <select id="service" v-model="form.service" required>
        <option value="" disabled selected>Selectați un serviciu</option>
        <option v-for="service in services" :key="service.id" :value="service.name">
          {{ service.name }}
        </option>
      </select>

      <label for="date">Data:</label>
      <input id="date" type="date" v-model="form.date" required />

      <label for="timeInterval">Interval orar:</label>
      <input id="timeInterval" v-model="form.timeInterval" placeholder="Ex: 10:00-12:00" required />

      <label for="phone">Telefon:</label>
      <input id="phone" type="tel" v-model="form.phone" placeholder="Introduceți numărul de telefon" required />

      <button type="submit">Trimite</button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { reactive, computed } from 'vue';

export default {
  name: 'AppointmentForm',
  setup() {
    const store = useStore();

    const services = computed(() => store.getters.getServices);

    const form = reactive({
      name: '',
      pet: '',
      service: '',
      date: '',
      timeInterval: '',
      phone: ''
    });

    const submitForm = async () => {
      try {
        await store.dispatch('addAppointment', { ...form });
        alert('Programarea a fost trimisă cu succes!');
      } catch (error) {
        console.error('Eroare la trimiterea programării:', error);
        alert('A apărut o eroare la trimiterea programării.');
      }
    };

    return { form, services, submitForm };
  },
};
</script>

<style scoped>
.form-container {
  margin-bottom: 100px;
}
</style>
