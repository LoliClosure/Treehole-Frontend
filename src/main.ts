import { createSSRApp } from 'vue';
import App from './App.vue';
import SectionCard from './components/SectionCard.vue';
import MessageItem from './components/MessageItem.vue';

export function createApp() {
  const app = createSSRApp(App);

  app.component('t-card', SectionCard);
  app.component('t-message', MessageItem);

  return {
    app,
  };
}
