<template>
  <div>
    <h1>Acasă</h1>
    <p>Bine ai venit la Clinica Veterinară!</p>
    <p>Rezervați acum o programare rapidă folosind formularul de mai jos.</p>
    <AppointmentForm />
  </div>
</template>

<script>
import AppointmentForm from '../components/AppointmentForm.vue';

export default {
  name: 'Home',
  components: {
    AppointmentForm
  }
};
</script>
