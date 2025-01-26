import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';

async function init() {
  try {
    await store.dispatch('fetchServices');
    console.log('Serviciile au fost încărcate!');
  } catch (error) {
    console.error('Eroare la încărcarea serviciilor:', error);
  }

  const app = createApp(App);

  app.use(router);
  app.use(store);
  app.mount('#app');
}

init();
