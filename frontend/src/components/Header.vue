<template>
  <header>
    <h1>Clinica Veterinară</h1>
    <nav>
      <router-link to="/">Acasă</router-link>
      <router-link to="/about">Despre noi</router-link>
      <router-link to="/services">Servicii</router-link>
      <router-link to="/appointments">Programări</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/login">Autentificare</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

