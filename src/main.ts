import { createSSRApp } from 'vue';
import App from './App.vue';
import SectionCard from './components/SectionCard.vue';

export function createApp() {
  const app = createSSRApp(App);

  app.component('t-card', SectionCard);

  return {
    app,
  };
}
