<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">{{ $t('orders.title') }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('breadcrumb.home') }}</router-link></li>
              <li class="breadcrumb-item active">{{ $t('orders.title') }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <section class="content">
      <div class="container-fluid">
        <!-- Search and Filter -->
        <div class="search-section">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input 
              v-model="searchQuery" 
              type="text" 
              :placeholder="$t('orders.searchOrder')"
              @input="filterOrders"
            >
          </div>
          <div class="filter-buttons">
            <button 
              v-for="status in statuses" 
              :key="status.value"
              @click="filterByStatus(status.value)"
              :class="['filter-btn', { active: selectedStatus === status.value }]"
              :style="{ background: selectedStatus === status.value ? status.gradient : '' }"
            >
              <i :class="status.icon"></i> {{ status.label }}
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <div class="orders-list">
              <div v-for="order in filteredOrders" :key="order.id" class="order-card">
                <div class="order-header">
                  <div class="order-info">
                    <h3>{{ $t('orders.order') }} #{{ order.orderNumber }}</h3>
                    <p class="order-date">{{ order.date }}</p>
                  </div>
                  <div class="status-badge" :style="{ background: getStatusGradient(order.status) }">
                    <i :class="getStatusIcon(order.status)"></i>
                    {{ getStatusLabel(order.status) }}
                  </div>
                </div>

                <div class="order-body">
                  <div class="order-products">
                    <h4><i class="fas fa-box"></i> {{ $t('orders.products') }}</h4>
                    <div class="products-list">
                      <div v-for="product in order.products" :key="product.id" class="product-item">
                        <img :src="product.image" :alt="product.name">
                        <div class="product-info">
                          <h5>{{ product.name }}</h5>
                          <p>{{ $t('orders.quantity') }}: {{ product.quantity }} × ${{ product.price }}</p>
                        </div>
                        <div class="product-total">
                          ${{ (product.quantity * product.price).toFixed(2) }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="order-details-grid">
                    <div class="detail-section">
                      <h4><i class="fas fa-user"></i> {{ $t('orders.customer') }}</h4>
                      <div class="detail-content">
                        <p><strong>{{ order.customer.name }}</strong></p>
                        <p><i class="fas fa-phone"></i> {{ order.customer.phone }}</p>
                        <p><i class="fas fa-envelope"></i> {{ order.customer.email }}</p>
                        <p><i class="fas fa-map-marker-alt"></i> {{ order.customer.address }}</p>
                      </div>
                    </div>

                    <div class="detail-section">
                      <h4><i class="fas fa-credit-card"></i> {{ $t('orders.payment') }}</h4>
                      <div class="detail-content">
                        <div class="payment-method">
                          <div class="method-icon" :style="{ background: order.payment.gradient }">
                            <i :class="order.payment.icon"></i>
                          </div>
                          <div>
                            <p><strong>{{ order.payment.method }}</strong></p>
                            <p class="payment-status" :class="order.payment.status">
                              {{ order.payment.status === 'paid' ? $t('orders.paid') : $t('orders.unpaid') }}
                            </p>
                          </div>
                        </div>
                        <p class="transaction-id">{{ $t('payments.transactionId') }}: {{ order.payment.transactionId }}</p>
                      </div>
                    </div>

                    <div class="detail-section">
                      <h4><i class="fas fa-truck"></i> {{ $t('orders.shipping') }}</h4>
                      <div class="detail-content">
                        <div class="shipping-method">
                          <div class="method-icon" :style="{ background: order.shipping.gradient }">
                            <i :class="order.shipping.icon"></i>
                          </div>
                          <div>
                            <p><strong>{{ order.shipping.method }}</strong></p>
                            <p>{{ order.shipping.deliveryTime }}</p>
                          </div>
                        </div>
                        <p class="tracking-id">{{ $t('shipping.trackingId') }}: {{ order.shipping.trackingId }}</p>
                      </div>
                    </div>

                    <div class="detail-section">
                      <h4><i class="fas fa-dollar-sign"></i> {{ $t('orders.orderTotal') }}</h4>
                      <div class="detail-content order-summary">
                        <div class="summary-row">
                          <span>{{ $t('orders.subtotal') }}:</span>
                          <span>${{ order.totals.subtotal.toFixed(2) }}</span>
                        </div>
                        <div class="summary-row">
                          <span>{{ $t('orders.shippingCost') }}:</span>
                          <span>${{ order.totals.shipping.toFixed(2) }}</span>
                        </div>
                        <div class="summary-row">
                          <span>{{ $t('orders.tax') }}:</span>
                          <span>${{ order.totals.tax.toFixed(2) }}</span>
                        </div>
                        <div class="summary-row total">
                          <span>{{ $t('orders.total') }}:</span>
                          <span>${{ order.totals.total.toFixed(2) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="order-actions">
                  <button @click="viewOrder(order)" class="btn-view">
                    <i class="fas fa-eye"></i> {{ $t('orders.viewDetails') }}
                  </button>
                  <button v-if="order.status === 'pending'" @click="confirmOrder(order)" class="btn-confirm">
                    <i class="fas fa-check"></i> {{ $t('orders.confirm') }}
                  </button>
                  <button v-if="order.status === 'confirmed'" @click="shipOrder(order)" class="btn-ship">
                    <i class="fas fa-shipping-fast"></i> {{ $t('orders.ship') }}
                  </button>
                  <button @click="printOrder(order)" class="btn-print">
                    <i class="fas fa-print"></i> {{ $t('orders.print') }}
                  </button>
                  <button v-if="order.status === 'pending'" @click="cancelOrder(order)" class="btn-cancel">
                    <i class="fas fa-times"></i> {{ $t('orders.cancel') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const searchQuery = ref('')
const selectedStatus = ref('all')

const statuses = [
  { value: 'all', label: 'All', icon: 'fas fa-list', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { value: 'pending', label: 'Pending', icon: 'fas fa-clock', gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)' },
  { value: 'confirmed', label: 'Confirmed', icon: 'fas fa-check', gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
  { value: 'shipped', label: 'Shipped', icon: 'fas fa-shipping-fast', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { value: 'delivered', label: 'Delivered', icon: 'fas fa-check-circle', gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
  { value: 'cancelled', label: 'Cancelled', icon: 'fas fa-times-circle', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }
]

const orders = ref([
  {
    id: 1,
    orderNumber: '2024-001',
    date: '2024-10-16 10:30',
    status: 'confirmed',
    products: [
      {
        id: 1,
        name: 'Wireless Headphones Pro',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
        quantity: 2,
        price: 299.99
      },
      {
        id: 2,
        name: 'Smart Watch Series 5',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop',
        quantity: 1,
        price: 399.99
      }
    ],
    customer: {
      name: 'John Doe',
      phone: '+998 90 123 45 67',
      email: 'john.doe@example.com',
      address: 'Tashkent, Chilanzar 12, House 5, Apt 12'
    },
    payment: {
      method: 'Credit Card',
      icon: 'fas fa-credit-card',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      status: 'paid',
      transactionId: 'TXN-20241016-001'
    },
    shipping: {
      method: 'Express Delivery',
      icon: 'fas fa-shipping-fast',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      deliveryTime: '1-2 days',
      trackingId: 'TRK-2024-001'
    },
    totals: {
      subtotal: 999.97,
      shipping: 15.99,
      tax: 100.00,
      total: 1115.96
    }
  },
  {
    id: 2,
    orderNumber: '2024-002',
    date: '2024-10-16 11:15',
    status: 'pending',
    products: [
      {
        id: 3,
        name: 'Laptop Gaming Pro',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=80&h=80&fit=crop',
        quantity: 1,
        price: 1299.99
      }
    ],
    customer: {
      name: 'Jane Smith',
      phone: '+998 90 234 56 78',
      email: 'jane.smith@example.com',
      address: 'Samarkand, Registan Street 25'
    },
    payment: {
      method: 'PayPal',
      icon: 'fab fa-paypal',
      gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
      status: 'unpaid',
      transactionId: 'TXN-20241016-002'
    },
    shipping: {
      method: 'Standard Shipping',
      icon: 'fas fa-truck',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      deliveryTime: '3-5 days',
      trackingId: 'TRK-2024-002'
    },
    totals: {
      subtotal: 1299.99,
      shipping: 5.99,
      tax: 130.00,
      total: 1435.98
    }
  },
  {
    id: 3,
    orderNumber: '2024-003',
    date: '2024-10-16 09:45',
    status: 'shipped',
    products: [
      {
        id: 4,
        name: 'Smartphone X Pro',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&h=80&fit=crop',
        quantity: 1,
        price: 899.99
      }
    ],
    customer: {
      name: 'Mike Johnson',
      phone: '+998 90 345 67 89',
      email: 'mike.j@example.com',
      address: 'Bukhara, Old City, Street 10'
    },
    payment: {
      method: 'Bank Transfer',
      icon: 'fas fa-university',
      gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
      status: 'paid',
      transactionId: 'TXN-20241016-003'
    },
    shipping: {
      method: 'Air Cargo',
      icon: 'fas fa-plane',
      gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
      deliveryTime: '5-7 days',
      trackingId: 'TRK-2024-003'
    },
    totals: {
      subtotal: 899.99,
      shipping: 45.99,
      tax: 90.00,
      total: 1035.98
    }
  }
])

const filteredOrders = ref([...orders.value])

const filterOrders = () => {
  let filtered = orders.value

  if (searchQuery.value) {
    filtered = filtered.filter(o => 
      o.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(o => o.status === selectedStatus.value)
  }

  filteredOrders.value = filtered
}

const filterByStatus = (status) => {
  selectedStatus.value = status
  filterOrders()
}

const getStatusGradient = (status) => {
  const statusMap = {
    pending: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    confirmed: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    shipped: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    delivered: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    cancelled: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  }
  return statusMap[status] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}

const getStatusIcon = (status) => {
  const iconMap = {
    pending: 'fas fa-clock',
    confirmed: 'fas fa-check',
    shipped: 'fas fa-shipping-fast',
    delivered: 'fas fa-check-circle',
    cancelled: 'fas fa-times-circle'
  }
  return iconMap[status] || 'fas fa-circle'
}

const getStatusLabel = (status) => {
  const labelMap = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }
  return labelMap[status] || status
}

const viewOrder = (order) => {
  alert(`View order: ${order.orderNumber}`)
}

const confirmOrder = (order) => {
  if (confirm(t('orders.confirmOrderMsg'))) {
    order.status = 'confirmed'
    alert(t('orders.orderConfirmed'))
  }
}

const shipOrder = (order) => {
  if (confirm(t('orders.shipOrderMsg'))) {
    order.status = 'shipped'
    alert(t('orders.orderShipped'))
  }
}

const printOrder = (order) => {
  alert(`Print order: ${order.orderNumber}`)
}

const cancelOrder = (order) => {
  if (confirm(t('orders.cancelOrderMsg'))) {
    order.status = 'cancelled'
    alert(t('orders.orderCancelled'))
  }
}
</script>

<style scoped>
.content-wrapper {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.search-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.search-box {
  position: relative;
  margin-bottom: 20px;
}

.search-box i {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  font-size: 18px;
}

.search-box input {
  width: 100%;
  padding: 15px 20px 15px 55px;
  border: 2px solid #e9ecef;
  border-radius: 15px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  background: white;
  color: #2c3e50;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-btn.active {
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.filter-btn:hover {
  transform: translateY(-2px);
}

.orders-list {
  display: grid;
  gap: 25px;
}

.order-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.order-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.order-info h3 {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.order-date {
  color: #6c757d;
  font-size: 14px;
  margin: 0;
}

.status-badge {
  padding: 10px 20px;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.order-body {
  margin-bottom: 20px;
}

.order-products {
  margin-bottom: 25px;
}

.order-products h4 {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
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
  margin-bottom: 5px;
}

.product-info p {
  color: #6c757d;
  font-size: 14px;
  margin: 0;
}

.product-total {
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
}

.order-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.detail-section {
  background: rgba(102, 126, 234, 0.05);
  border-radius: 15px;
  padding: 20px;
}

.detail-section h4 {
  font-size: 16px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.detail-content p {
  color: #6c757d;
  font-size: 14px;
  margin: 8px 0;
}

.detail-content strong {
  color: #2c3e50;
}

.payment-method,
.shipping-method {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.method-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
}

.payment-status {
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 12px;
  display: inline-block;
  font-size: 13px;
}

.payment-status.paid {
  background: #84fab0;
  color: white;
}

.payment-status.unpaid {
  background: #fad0c4;
  color: white;
}

.transaction-id,
.tracking-id {
  font-size: 13px;
  color: #667eea;
  font-weight: 600;
}

.order-summary {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
}

.summary-row.total {
  border-bottom: none;
  border-top: 2px solid #667eea;
  padding-top: 12px;
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
}

.order-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-view,
.btn-confirm,
.btn-ship,
.btn-print,
.btn-cancel {
  flex: 1;
  min-width: 140px;
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
}

.btn-view {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-confirm {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  color: white;
}

.btn-ship {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-print {
  background: linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%);
  color: white;
}

.btn-cancel {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.btn-view:hover,
.btn-confirm:hover,
.btn-ship:hover,
.btn-print:hover,
.btn-cancel:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
</style>
