import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import axios from "axios";
import router from './router'

const app=createApp(App);
app.config.globalProperties.$axios=axios
app.use(router)
app.use(ArcoVue)
app.mount('#app')