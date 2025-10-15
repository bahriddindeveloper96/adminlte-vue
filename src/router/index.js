import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import MainLayout from '../layouts/MainLayout.vue'

// Views
import Dashboard from '../views/Dashboard.vue'
import Widgets from '../views/Widgets.vue'
import Charts from '../views/Charts.vue'
import Calendar from '../views/Calendar.vue'
import Gallery from '../views/Gallery.vue'

// Forms
import GeneralForms from '../views/forms/GeneralForms.vue'
import AdvancedForms from '../views/forms/AdvancedForms.vue'
import ValidationForms from '../views/forms/ValidationForms.vue'

// Tables
import SimpleTables from '../views/tables/SimpleTables.vue'

// Examples
import Profile from '../views/examples/Profile.vue'
import Invoice from '../views/examples/Invoice.vue'

// Auth
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'

// Contacts
import Contacts from '../views/Contacts.vue'

const routes = [
  // Auth Routes (without layout)
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: 'Register' }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: { title: 'Forgot Password' }
  },
  // Main Routes (with layout)
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard' }
      },
      {
        path: '/widgets',
        name: 'Widgets',
        component: Widgets,
        meta: { title: 'Widgets' }
      },
      {
        path: '/charts',
        name: 'Charts',
        component: Charts,
        meta: { title: 'Charts' }
      },
      {
        path: '/calendar',
        name: 'Calendar',
        component: Calendar,
        meta: { title: 'Calendar' }
      },
      {
        path: '/gallery',
        name: 'Gallery',
        component: Gallery,
        meta: { title: 'Gallery' }
      },
      // Forms
      {
        path: '/forms/general',
        name: 'GeneralForms',
        component: GeneralForms,
        meta: { title: 'General Forms' }
      },
      {
        path: '/forms/advanced',
        name: 'AdvancedForms',
        component: AdvancedForms,
        meta: { title: 'Advanced Forms' }
      },
      {
        path: '/forms/validation',
        name: 'ValidationForms',
        component: ValidationForms,
        meta: { title: 'Form Validation' }
      },
      // Tables
      {
        path: '/tables/simple',
        name: 'SimpleTables',
        component: SimpleTables,
        meta: { title: 'Simple Tables' }
      },
      // Examples
      {
        path: '/examples/profile',
        name: 'Profile',
        component: Profile,
        meta: { title: 'User Profile' }
      },
      {
        path: '/examples/invoice',
        name: 'Invoice',
        component: Invoice,
        meta: { title: 'Invoice' }
      },
      // Contacts
      {
        path: '/contacts',
        name: 'Contacts',
        component: Contacts,
        meta: { title: 'Contacts & Chat' }
      }
    ]
  },
  // 404 page
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update page title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | AdminLTE Vue` : 'AdminLTE Vue'
  next()
})

export default router
