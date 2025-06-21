import { createApp } from 'vue';
import App from './App.vue';
import toMore from '@/component/toMore.vue'; // 引入

const app = createApp(App);
app.component('toMore', toMore); // 注册

app.mount('#app');
