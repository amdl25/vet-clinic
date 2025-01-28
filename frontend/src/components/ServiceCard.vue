<template>
  <div class="card">
    <h2>{{ service.name }}</h2>
    <p>{{ service.description }}</p>
    <p>Preț: {{ service.price }} RON</p>
  </div>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;
}

.card h2 {
  margin-bottom: 10px;
}


@media (max-width: 768px) {
  .card {
    width: 100%;
    margin: 10px 0;
  }

  .card h2 {
    font-size: 18px;
  }
}


@media (min-width: 1024px) {
  .card {
    width: 400px;
    margin: 20px;
  }

  .card h2 {
    font-size: 20px;
  }
}
</style>
