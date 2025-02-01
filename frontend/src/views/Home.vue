<template>
  <div class="home-container">
    <section class="hero">
      <div class="hero-text">
        <h1>
          Îngrijire <span class="highlight">profesională</span><br>
          pentru animalul tău
        </h1>
        <p>
          Oferim servicii medicale de top pentru animalele de companie.<br />
          Echipa noastră de veterinari este aici pentru tine.
        </p>
        <button @click="scrollToForm" class="cta-button">Fă o programare</button>
      </div>
      <div class="hero-image">
        <img src="../assets/hero.png" alt="Animale fericite" />
      </div>
    </section>

    <section class="description">
      <h2>De ce să alegi clinica noastră?</h2>
      <p>
        La <strong>VitaVet</strong>, sănătatea și bunăstarea animalului tău sunt prioritatea noastră. 
        Echipa noastră de veterinari dedicați oferă îngrijire personalizată, folosind tehnologii moderne pentru 
        a asigura cele mai bune tratamente.
      </p>
      <ul>
        <li>✔ <strong>Îngrijire completă</strong> pentru câini și pisici</li>
        <li>✔ <strong>Tehnologie de ultimă generație</strong> pentru diagnostic rapid</li>
        <li>✔ <strong>Veterinari cu experiență</strong> și pasiune</li>
        <li>✔ <strong>Planuri de prevenție</strong> pentru o viață lungă și sănătoasă</li>
      </ul>
  </section>

    <section class="appointment-section" ref="appointmentForm">
      <AppointmentForm />
    </section>
  </div>
</template>


<script>
import AppointmentForm from '../components/AppointmentForm.vue';

export default {
  name: 'Home',
  components: {
    AppointmentForm
  },
  methods: {
    scrollToForm() {
      this.$nextTick(() => {
        if (this.$refs.appointmentForm) {
          this.$refs.appointmentForm.scrollIntoView({ behavior: "smooth" });
        } else {
          console.error("Elementul appointmentForm nu este încă disponibil.");
        }
      });
    },
  },
};
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1100px;
  padding: 20px 20px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.hero-text {
  flex: 1;
  max-width: 45%;
  text-align: left;
  padding-left: 60px;
}

.hero-text h1 {
  font-size: 2.8rem;
  font-weight: bold;
  color: black;
}

.hero-text .highlight {
  color: #7D3C98;
}

.hero-text p {
  font-size: 1.2rem;
  color: #5E4B7E;
  margin-top: 10px;
}

.description {
  text-align: center;
  margin: 50px auto;
  max-width: 800px;
}

.description h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.description p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
}

.description ul {
  list-style: none;
  padding: 0;
}

.description li {
  font-size: 1.1rem;
  color: #444;
  margin: 10px 0;
}

.cta-button {
  padding: 14px 24px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(255, 79, 79, 0.2);
  border: none;
  margin-top: 15px;
}

.cta-button:hover {
  background: #E73C1F;
  transform: scale(1.05);
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  transform: translateX(6%);
}

@media (max-width: 768px) {
  .home-container {
    padding: 0 10px;
    text-align: center;
  }

  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }

  .hero-text {
    max-width: 100%;
    padding-left: 0;
    text-align: center;
  }

  .hero-text h1 {
    font-size: 28px;
  }

  .hero-text p {
    font-size: 16px;
  }

  .cta-button {
    font-size: 14px;
    padding: 3px 10px;
    height: 40px;
    width: 100px;
  }

  .hero-image {
    justify-content: center;
    margin-top: 20px;
  }

  .hero-image img {
    max-width: 85%;
    height: auto;
    transform: none;
  }

  .description {
    max-width: 90%;
    margin: 30px auto;
  }

  .description h2 {
    font-size: 24px;
  }

  .description p {
    font-size: 16px;
  }

  .description li {
    font-size: 16px;
  }
}
</style>