import { createApp } from 'vue'
import App from './App.vue'
import 'chota/dist/chota.min.css' //simple css framework
import '@/assets/css/main.css'
import { VueShowdownPlugin } from 'vue-showdown'; //markdown resolver
const app = createApp(App)

// Glogal variable for Strapi server address
app.config.globalProperties.apiUrl = 'http://localhost:1337'

app.use(VueShowdownPlugin).mount('#app')
