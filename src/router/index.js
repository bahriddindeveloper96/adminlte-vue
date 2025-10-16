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
import ContactUs from '../views/ContactUs.vue'

// Settings
import Settings from '../views/Settings.vue'

// Products
import ProductsList from '../views/products/ProductsList.vue'
import ProductView from '../views/products/ProductView.vue'
import ProductEdit from '../views/products/ProductEdit.vue'
import CategoryList from '../views/products/CategoryList.vue'

// Shipping
import ShippingMethods from '../views/shipping/ShippingMethods.vue'
import ProductTracking from '../views/shipping/ProductTracking.vue'

// Payments
import PaymentMethods from '../views/payments/PaymentMethods.vue'
import PaymentStatus from '../views/payments/PaymentStatus.vue'

// Orders
import OrdersList from '../views/orders/OrdersList.vue'
import OrderView from '../views/orders/OrderView.vue'

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
        meta: { title: 'Contacts' }
      },
      {
        path: '/contact-us',
        name: 'ContactUs',
        component: ContactUs,
        meta: { title: 'Contact Us' }
      },
      // Products
      {
        path: '/products',
        name: 'Products',
        component: ProductsList,
        meta: { title: 'Products' }
      },
      {
        path: '/products/add',
        name: 'ProductAdd',
        component: ProductEdit,
        meta: { title: 'Add Product' }
      },
      {
        path: '/products/edit/:id',
        name: 'ProductEdit',
        component: ProductEdit,
        meta: { title: 'Edit Product' }
      },
      {
        path: '/products/categories',
        name: 'ProductCategories',
        component: CategoryList,
        meta: { title: 'Product Categories' }
      },
      {
        path: '/products/:id',
        name: 'ProductView',
        component: ProductView,
        meta: { title: 'Product Details' }
      },
      // Settings
      {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: { title: 'Settings' }
      },
      // Shipping
      {
        path: '/shipping/methods',
        name: 'ShippingMethods',
        component: ShippingMethods,
        meta: { title: 'Shipping Methods' }
      },
      {
        path: '/shipping/tracking',
        name: 'ProductTracking',
        component: ProductTracking,
        meta: { title: 'Product Tracking' }
      },
      // Payments
      {
        path: '/payments/methods',
        name: 'PaymentMethods',
        component: PaymentMethods,
        meta: { title: 'Payment Methods' }
      },
      {
        path: '/payments/status',
        name: 'PaymentStatus',
        component: PaymentStatus,
        meta: { title: 'Payment Status' }
      },
      // Orders
      {
        path: '/orders',
        name: 'OrdersList',
        component: OrdersList,
        meta: { title: 'Orders' }
      },
      {
        path: '/orders/:id',
        name: 'OrderView',
        component: OrderView,
        meta: { title: 'Order Details' }
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
