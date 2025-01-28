<template>
  <div class="form-container">
    <h1>Programare</h1>
    <form @submit.prevent="submitForm">
      <label for="name">Nume:</label>
      <input id="name" v-model="form.name" placeholder="Introduceți numele" @blur="validateField('name')" />
      <p v-if="errors.name" class="error">{{ errors.name }}</p>

      <label for="pet">Animal:</label>
      <input id="pet" v-model="form.pet" placeholder="Ex: Câine, Pisică" @blur="validateField('pet')"/>
      <p v-if="errors.pet" class="error">{{ errors.pet }}</p>

      <label for="service">Serviciu:</label>
      <select id="service" v-model="form.serviceId" @blur="validateField('serviceId')">
        <option value="" disabled selected>Selectați un serviciu</option>
        <option v-for="service in getServices" :key="service.id" :value="service.id">
          {{ service.name }}
        </option>
      </select>
      <p v-if="errors.serviceId" class="error">{{ errors.serviceId }}</p>

      <label for="date">Data:</label>
      <input id="date" type="date" v-model="form.date" @blur="validateField('date')">
      <p v-if="errors.date" class="error">{{ errors.date }}</p>

      <label for="timeInterval">Interval orar:</label>
      <select id="timeInterval" v-model="form.timeInterval" @blur="validateField('timeInterval')">
        <option value="" disabled selected>Selectați un interval orar</option>
        <option value="09:00-15:00">09:00-15:00</option>
        <option value="15:00-20:00">15:00-20:00</option>
      </select>
      <p v-if="errors.timeInterval" class="error">{{ errors.timeInterval }}</p>

      <label for="phone">Telefon:</label>
      <input id="phone" type="tel" v-model="form.phone" placeholder="Introduceți numărul de telefon" @blur="validateField('phone')" />
      <p v-if="errors.phone" class="error">{{ errors.phone }}</p>

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
      errors: {},
    };
  },
  computed: {
    ...mapGetters(["getServices", "getUser"]),
  },
  methods: {
    ...mapActions(["addAppointment", "fetchAppointments", "showNotification"]),


    validateField(field) {
      this.errors[field] = "";

      switch (field) {
        case "name":
          if (!this.form.name) {
            this.errors.name = "*Câmp obligatoriu.";
          } else if (this.form.name.length < 3) {
            this.errors.name = "Numele trebuie să aibă cel puțin 3 caractere.";
          }
          break;

        case "pet":
          const allowedPets = ["caine", "pisica", "câine", "pisică"];
          if (!this.form.pet) {
            this.errors.pet = "*Câmp obligatoriu.";
          } else if (
            !allowedPets.includes(this.form.pet.trim().toLowerCase())
          ) {
            this.errors.pet = "Animalul trebuie să fie 'Câine' sau 'Pisică'.";
          }
          break;

        case "serviceId":
          if (!this.form.serviceId) {
            this.errors.serviceId = "*Câmp obligatoriu.";
          }
          break;

        case "date":
          if (!this.form.date) {
            this.errors.date = "*Câmp obligatoriu.";
          } else if (new Date(this.form.date) < new Date()) {
            this.errors.date = "Selectați o dată validă din viitor.";
          }
          break;

        case "timeInterval":
          if (!this.form.timeInterval) {
            this.errors.timeInterval = "*Câmp obligatoriu.";
          }
          break;

        case "phone":
          const phoneRegex = /^[0-9]{10}$/;
          if (!this.form.phone) {
            this.errors.phone = "*Câmp obligatoriu.";
          } else if (!phoneRegex.test(this.form.phone)) {
            this.errors.phone = "Introduceți un număr de telefon valid (10 cifre).";
          }
          break;

        default:
          break;
      }
    },

    async submitForm() {
      this.errors = {};

      Object.keys(this.form).forEach((field) => this.validateField(field))

      if (Object.keys(this.errors).length === 0) {

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
        }catch (error) {
          console.error('Eroare la trimiterea programării:', error);
          
          this.showNotification({
            message: `Eroare: ${error.message}`,
            type: "error",
          });
        }
      }
    }
  },
};
</script>

<style scoped>
  .form-container {
    margin-bottom: 100px;
  }

  .error {
  color: rgb(255, 99, 71);
  font-size: 10px;
  font-style: italic;
  text-align: left;
  margin-top: -10px;
  margin-bottom: 10px;
  }
</style>
