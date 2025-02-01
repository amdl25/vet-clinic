<template>
  <div class="contact-container">
    <div class="contact-content">
      <div class="contact-info">
        <h2>Contactează-ne</h2>
        <p>Ne poți contacta pentru întrebări sau programări.</p>
        <p><strong>Telefon:</strong> 0727 452 139</p>
        <p><strong>Email:</strong> contact@vitavet.ro</p>
        <p><strong>Adresă:</strong> Strada Mugurului, Nr. 10, București</p>
        <p><strong>Program:</strong> L-V 08:00 - 20:00 | S-D 09:00 - 15:00</p>
      </div>

      <div class="contact-form">
        <h2>Trimite-ne un mesaj</h2>
        <form @submit.prevent="handleSendMessage">
          <label for="name">Nume:</label>
          <input type="text" id="name" v-model="form.name" required />

          <label for="email">Email:</label>
          <input type="email" id="email" v-model="form.email" required />

          <label for="message">Mesaj:</label>
          <textarea id="message" v-model="form.message" required></textarea>

          <button type="submit">Trimite</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    ...mapActions(["sendMessage"]),

    async handleSendMessage(){
      await this.sendMessage(this.form);

      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    },
  },
};
</script>

<style scoped>
.contact-container {
  background: url('../assets/contact.jpg') no-repeat center center/cover;
  padding: 60px 20px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
}

.contact-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  background: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.contact-info {
  flex: 1;
  text-align: left;
  padding-right: 30px;
}

.contact-form {
  flex: 1;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-top: 10px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  display: block;
}

@media (max-width: 768px) {
  .contact-container {
    padding: 30px 15px;
    text-align: center;
  }

  .contact-content {
    flex-direction: column;
    padding: 20px;
    text-align: center;
  }

  .contact-info {
    text-align: center;
    padding-right: 0;
    margin-bottom: 20px;
  }

  .contact-form {
    text-align: center;
  }

  input,
  textarea {
    font-size: 14px;
    padding: 10px;
  }

  label {
    font-size: 14px;
  }

  button {
    width: 30%;
    height: auto;
    font-size: 14px;
    padding: 10px;
  }
}

</style>
