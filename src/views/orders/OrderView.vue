<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">{{ $t('orders.order') }} #{{ order.orderNumber }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('breadcrumb.home') }}</router-link></li>
              <li class="breadcrumb-item"><router-link to="/orders">{{ $t('orders.title') }}</router-link></li>
              <li class="breadcrumb-item active">{{ order.orderNumber }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-8">
            <!-- Status Timeline -->
            <div class="card-custom">
              <div class="card-header">
                <h3><i class="fas fa-history"></i> {{ $t('orders.orderStatus') }}</h3>
              </div>
              <div class="timeline">
                <div v-for="(step, index) in statusTimeline" :key="index" :class="['timeline-step', { active: step.completed, current: step.current }]">
                  <div class="timeline-marker">
                    <div class="timeline-dot"><i :class="step.icon"></i></div>
                    <div v-if="index < statusTimeline.length - 1" class="timeline-line"></div>
                  </div>
                  <div class="timeline-content">
                    <h4>{{ step.title }}</h4>
                    <p>{{ step.description }}</p>
                    <span v-if="step.date" class="timeline-date">{{ step.date }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Products -->
            <div class="card-custom">
              <div class="card-header">
                <h3><i class="fas fa-box"></i> {{ $t('orders.products') }}</h3>
              </div>
              <div class="products-list">
                <div v-for="product in order.products" :key="product.id" class="product-item">
                  <img :src="product.image" :alt="product.name">
                  <div class="product-info">
                    <h5>{{ product.name }}</h5>
                    <p>{{ product.sku }}</p>
                  </div>
                  <div class="product-quantity">{{ product.quantity }} × ${{ product.price }}</div>
                  <div class="product-total">${{ (product.price * product.quantity).toFixed(2) }}</div>
                </div>
              </div>
            </div>

            <!-- Address -->
            <div class="card-custom">
              <div class="card-header">
                <h3><i class="fas fa-map-marker-alt"></i> {{ $t('orders.shippingAddress') }}</h3>
              </div>
              <div class="address-content">
                <p><strong>{{ order.customer.name }}</strong></p>
                <p>{{ order.customer.address }}</p>
                <p>{{ order.customer.city }}, {{ order.customer.country }}</p>
                <p><i class="fas fa-phone"></i> {{ order.customer.phone }}</p>
                <p><i class="fas fa-envelope"></i> {{ order.customer.email }}</p>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <!-- Summary -->
            <div class="card-custom">
              <div class="card-header">
                <h3><i class="fas fa-file-invoice-dollar"></i> {{ $t('orders.orderSummary') }}</h3>
              </div>
              <div class="status-badge" :style="{ background: getStatusGradient(order.status) }">
                <i :class="getStatusIcon(order.status)"></i>
                {{ getStatusLabel(order.status) }}
              </div>
              <div class="summary-info">
                <div class="info-row">
                  <span>{{ $t('orders.orderDate') }}:</span>
                  <strong>{{ order.date }}</strong>
                </div>
                <div class="info-row">
                  <span>{{ $t('orders.orderNumber') }}:</span>
                  <strong>#{{ order.orderNumber }}</strong>
                </div>
              </div>
            </div>

            <!-- Payment -->
            <div class="card-custom">
              <div class="card-header">
                <h3><i class="fas fa-credit-card"></i> {{ $t('orders.payment') }}</h3>
              </div>
              <div class="method-display">
                <div class="method-icon" :style="{ background: order.payment.gradient }">
                  <i :class="order.payment.icon"></i>
                </div>
                <div>
                  <h4>{{ order.payment.method }}</h4>
                  <p>{{ order.payment.transactionId }}</p>
                </div>
              </div>
            </div>

            <!-- Shipping -->
            <div class="card-custom">
              <div class="card-header">
                <h3><i class="fas fa-truck"></i> {{ $t('orders.shipping') }}</h3>
              </div>
              <div class="method-display">
                <div class="method-icon" :style="{ background: order.shipping.gradient }">
                  <i :class="order.shipping.icon"></i>
                </div>
                <div>
                  <h4>{{ order.shipping.method }}</h4>
                  <p>{{ order.shipping.trackingId }}</p>
                </div>
              </div>
            </div>

            <!-- Total -->
            <div class="card-custom">
              <div class="card-header">
                <h3><i class="fas fa-calculator"></i> {{ $t('orders.orderTotal') }}</h3>
              </div>
              <div class="total-content">
                <div class="total-row">
                  <span>{{ $t('orders.subtotal') }}:</span>
                  <span>${{ order.totals.subtotal.toFixed(2) }}</span>
                </div>
                <div class="total-row">
                  <span>{{ $t('orders.shippingCost') }}:</span>
                  <span>${{ order.totals.shipping.toFixed(2) }}</span>
                </div>
                <div class="total-row">
                  <span>{{ $t('orders.tax') }}:</span>
                  <span>${{ order.totals.tax.toFixed(2) }}</span>
                </div>
                <div class="total-row grand-total">
                  <span>{{ $t('orders.total') }}:</span>
                  <span>${{ order.totals.total.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="actions-card">
              <button @click="printOrder" class="btn-action print">
                <i class="fas fa-print"></i> {{ $t('orders.print') }}
              </button>
              <button v-if="order.status === 'pending'" @click="confirmOrder" class="btn-action confirm">
                <i class="fas fa-check"></i> {{ $t('orders.confirm') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const order = ref({
  orderNumber: '2024-001',
  date: '2024-10-16 10:30',
  status: 'confirmed',
  products: [
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      sku: 'WHP-PRO-001',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
      quantity: 2,
      price: 299.99
    }
  ],
  customer: {
    name: 'John Doe',
    phone: '+998 90 123 45 67',
    email: 'john.doe@example.com',
    address: '123 Main Street, Apt 12',
    city: 'Tashkent',
    country: 'Uzbekistan'
  },
  payment: {
    method: 'Credit Card',
    icon: 'fas fa-credit-card',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    transactionId: 'TXN-20241016-001'
  },
  shipping: {
    method: 'Express Delivery',
    icon: 'fas fa-shipping-fast',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    trackingId: 'TRK-2024-001'
  },
  totals: {
    subtotal: 999.97,
    shipping: 15.99,
    tax: 100.00,
    total: 1115.96
  }
})

const statusTimeline = ref([
  { title: 'Order Placed', description: 'Order placed successfully', icon: 'fas fa-shopping-cart', date: '2024-10-16 10:30', completed: true, current: false },
  { title: 'Payment Confirmed', description: 'Payment received', icon: 'fas fa-credit-card', date: '2024-10-16 10:40', completed: true, current: false },
  { title: 'Order Confirmed', description: 'Being prepared', icon: 'fas fa-check-circle', date: '2024-10-16 11:00', completed: true, current: true },
  { title: 'Shipped', description: 'Order shipped', icon: 'fas fa-shipping-fast', date: null, completed: false, current: false },
  { title: 'Delivered', description: 'Order delivered', icon: 'fas fa-box-open', date: null, completed: false, current: false }
])

const getStatusGradient = (status) => {
  const map = {
    pending: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    confirmed: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    shipped: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }
  return map[status] || map.confirmed
}

const getStatusIcon = (status) => {
  const map = { pending: 'fas fa-clock', confirmed: 'fas fa-check', shipped: 'fas fa-shipping-fast' }
  return map[status] || 'fas fa-check'
}

const getStatusLabel = (status) => {
  const map = { pending: 'Pending', confirmed: 'Confirmed', shipped: 'Shipped' }
  return map[status] || status
}

const printOrder = () => window.print()
const confirmOrder = () => {
  if (confirm(t('orders.confirmOrderMsg'))) {
    order.value.status = 'confirmed'
    alert(t('orders.orderConfirmed'))
  }
}
</script>

<style scoped>
.content-wrapper {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.card-custom {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
}

.card-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.card-header h3 {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
}

.timeline {
  display: flex;
  flex-direction: column;
}

.timeline-step {
  display: flex;
  gap: 20px;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #6c757d;
}

.timeline-step.active .timeline-dot {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.timeline-step.current .timeline-dot {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  animation: pulse 2s infinite;
}

.timeline-line {
  width: 3px;
  flex: 1;
  background: #e9ecef;
  margin: 5px 0;
  min-height: 40px;
}

.timeline-step.active .timeline-line {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.timeline-content {
  flex: 1;
  padding-bottom: 30px;
}

.timeline-content h4 {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.timeline-content p {
  color: #6c757d;
  margin-bottom: 8px;
}

.timeline-date {
  color: #667eea;
  font-size: 14px;
  font-weight: 600;
}

.products-list {
  display: grid;
  gap: 15px;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
}

.product-item img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
}

.product-info {
  flex: 1;
}

.product-info h5 {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 3px;
}

.product-info p {
  color: #6c757d;
  font-size: 13px;
  margin: 0;
}

.product-quantity {
  color: #6c757d;
}

.product-total {
  font-weight: 700;
  color: #667eea;
  font-size: 18px;
}

.address-content p {
  color: #6c757d;
  margin: 8px 0;
}

.address-content strong {
  color: #2c3e50;
  font-size: 16px;
}

.address-content i {
  color: #667eea;
  margin-right: 8px;
}

.status-badge {
  padding: 12px 20px;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}

.summary-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;
}

.info-row span {
  color: #6c757d;
}

.info-row strong {
  color: #2c3e50;
}

.method-display {
  display: flex;
  align-items: center;
  gap: 15px;
}

.method-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
}

.method-display h4 {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.method-display p {
  color: #6c757d;
  font-size: 14px;
  margin: 0;
}

.total-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e9ecef;
}

.total-row.grand-total {
  border-top: 2px solid #667eea;
  padding-top: 15px;
  font-size: 20px;
  font-weight: 700;
  color: #667eea;
  border-bottom: none;
}

.actions-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-action {
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: white;
}

.btn-action.print {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-action.confirm {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
}

.btn-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 4px 15px rgba(250, 112, 154, 0.3); }
  50% { box-shadow: 0 4px 25px rgba(250, 112, 154, 0.6); }
}
</style>
