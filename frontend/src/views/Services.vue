<template>
  <div>
    <h1>Servicii</h1>
    <ul>
      <li v-for="service in services" :key="service.id">{{ service.name }}</li>
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

export default {
  name: 'Services',
  setup() {
    const store = useStore();

    const services = computed(() => store.getters.getServices);

    onMounted(() => {
      if (!services.value.length) {
        store.dispatch('fetchServices');
      }
    });

    return { services };
  },
};
</script>
