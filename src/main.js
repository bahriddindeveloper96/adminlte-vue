import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// Import AdminLTE CSS
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/plugins/fontawesome-free/css/all.min.css'

// Import custom CSS after AdminLTE CSS
import './assets/css/styles.css'

// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import AdminLTE JS
import 'admin-lte/dist/js/adminlte.min.js'

const app = createApp(App)

app.use(router)
app.mount('#app')
