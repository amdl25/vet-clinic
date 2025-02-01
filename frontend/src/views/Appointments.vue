<template>
  <div class="appointments-container">
    <p>Completează formularul pentru a face o programare.</p>
    <AppointmentForm/>

    <ul v-if="getAppointments.length !== 0" class="appointments-history">
      <h2 v-if="isAuthenticated">Istoricul programărilor</h2>
      <li
        v-for="appointment in getAppointments"
        :key="appointment.id"
        class="appointment-item"
      >
        <div v-if="editingAppointmentId !== appointment.id">
          <strong>{{ appointment.date }}</strong> {{ appointment.timeInterval }}
          <br />
            {{ appointment.pet }} - {{ getServiceName(appointment.serviceId) }}
          <br />
          <button @click="startEdit(appointment)">Modifică</button>
          <button @click="confirmCancel(appointment.id)">Anulează</button>
        </div>

        <div v-else class="edit-form">
          <label for="date">Dată nouă:</label>
          <input type="date" v-model="editForm.date" />

          <label for="timeInterval">Interval nou:</label>
          <select v-model="editForm.timeInterval">
            <option value="09:00-15:00">09:00-15:00</option>
            <option value="15:00-20:00">15:00-20:00</option>
          </select>

          <button @click="saveEdit(appointment.id)">Salvează</button>
          <button @click="cancelEdit">Anulează</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppointmentForm from '../components/AppointmentForm.vue';


export default {
  name: 'Appointments',
  components: {
    AppointmentForm,
  },
  data() {
    return {
      submittedAppointment: null,
      editingAppointmentId: null,
      editForm: {
        date: "",
        timeInterval: "",
      },
    };
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal) {
        console.log('Utilizator autentificat, încărcăm programările.');
        this.loadAppointments();
      } else {
        console.log('Utilizator neautentificat...');
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getServices', 'getAppointments']),
    getServiceName() {
      return (serviceId) => {
        const service = this.getServices.find((s) => s.id === serviceId);
        return service ? service.name : "Serviciu necunoscut";
      };
    },
  },
  methods: {
    ...mapActions(["fetchAppointments", "cancelAppointment", "updateAppointment"]),

    async loadAppointments() {
      try {
        const appointments = await this.fetchAppointments();
        this.appointments = appointments;
        console.log(`Număr de programări preluate din backend: ${this.appointments.length}`);
      } catch (error) {
        console.error('Eroare la obținerea programărilor:', error);
      }
    },

    startEdit(appointment) {
      this.editingAppointmentId = appointment.id;
      this.editForm = {
        date: appointment.date,
        timeInterval: appointment.timeInterval,
      };
    },

    async saveEdit(appointmentId) {
      if (!this.editForm.date || !this.editForm.timeInterval) {
        alert("Toate câmpurile sunt obligatorii.");
        return;
      }

      await this.$store.dispatch("updateAppointment", {
        appointmentId,
        updatedData: this.editForm,
      });

      this.editingAppointmentId = null;
    },

    confirmCancel(appointmentId) {
      const confirmDelete = window.confirm("Sunteți sigur că doriți să anulați această programare?");
      if (confirmDelete) {
        this.cancelAppointment(appointmentId);
      }
    },

    cancelEdit() {
      this.editingAppointmentId = null;
    },
  },
  mounted() {
    if (this.isAuthenticated) {
      console.log('Utilizator autentificat, încărcăm programările.');
      this.loadAppointments();
    }
  },
};
</script>

<style scoped>

  .appointments-container {
    background: linear-gradient(180deg, #F8F5FF 0%, #FFFFFF 100%);
    position: relative;
    overflow: hidden;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
  .appointments-history {
    padding: 30px;
    border-radius: 10px;
    max-width: 900px;
    margin: 40px auto;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  .appointment-item {
    background: white;
    margin-bottom: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    transition: transform 0.2s ease-in-out;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .appointment-item:hover {
    transform: scale(1.02);
  }

  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input, select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  p {
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #4a4a4a;
    margin-bottom: 20px;
  }

  button {
    padding: 8px 10px;
    width: 100px;
    height: auto;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-right: 10px;
  }

  button:first-of-type {
    background: #9D7AC5;
    color: white;
  }

  button:first-of-type:hover {
    background: #8159A8;
  }

  @media (max-width: 768px) {

    .appointments-container p {
      font-size: 16px;
    }
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

    button {
      padding: 8px 6px;
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
