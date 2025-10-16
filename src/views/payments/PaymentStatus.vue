<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">{{ $t('payments.paymentStatus') }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('breadcrumb.home') }}</router-link></li>
              <li class="breadcrumb-item active">{{ $t('payments.paymentStatus') }}</li>
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
              :placeholder="$t('payments.searchPayment')"
              @input="filterPayments"
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
          <div class="col-lg-8">
            <div class="payments-list">
              <div v-for="payment in filteredPayments" :key="payment.id" class="payment-card">
                <div class="payment-header">
                  <div class="product-image">
                    <img :src="payment.productImage" :alt="payment.productName">
                  </div>
                  <div class="payment-info">
                    <h3>{{ payment.productName }}</h3>
                    <p class="order-id">{{ $t('payments.orderId') }}: {{ payment.orderId }}</p>
                    <p class="payment-date">{{ $t('payments.paymentDate') }}: {{ payment.date }}</p>
                  </div>
                  <div class="status-badge" :style="{ background: getStatusGradient(payment.status) }">
                    <i :class="getStatusIcon(payment.status)"></i>
                    {{ getStatusLabel(payment.status) }}
                  </div>
                </div>

                <div class="payment-details">
                  <div class="detail-row">
                    <div class="detail-item">
                      <i class="fas fa-dollar-sign"></i>
                      <div>
                        <strong>{{ $t('payments.amount') }}</strong>
                        <p>${{ payment.amount }}</p>
                      </div>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-credit-card"></i>
                      <div>
                        <strong>{{ $t('payments.method') }}</strong>
                        <p>{{ payment.method }}</p>
                      </div>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-user"></i>
                      <div>
                        <strong>{{ $t('payments.customer') }}</strong>
                        <p>{{ payment.customer }}</p>
                      </div>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-hashtag"></i>
                      <div>
                        <strong>{{ $t('payments.transactionId') }}</strong>
                        <p>{{ payment.transactionId }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="payment-actions">
                  <button @click="viewDetails(payment)" class="btn-details">
                    <i class="fas fa-eye"></i> {{ $t('payments.viewDetails') }}
                  </button>
                  <button v-if="payment.status === 'pending'" @click="approvePayment(payment)" class="btn-approve">
                    <i class="fas fa-check"></i> {{ $t('payments.approve') }}
                  </button>
                  <button v-if="payment.status === 'pending'" @click="rejectPayment(payment)" class="btn-reject">
                    <i class="fas fa-times"></i> {{ $t('payments.reject') }}
                  </button>
                  <button v-if="payment.status === 'completed'" @click="refundPayment(payment)" class="btn-refund">
                    <i class="fas fa-undo"></i> {{ $t('payments.refund') }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="stats-card">
              <div class="stats-header">
                <h3><i class="fas fa-chart-pie"></i> {{ $t('payments.statistics') }}</h3>
              </div>
              <div class="stats-body">
                <div class="stat-item" v-for="stat in paymentStats" :key="stat.status">
                  <div class="stat-icon" :style="{ background: stat.gradient }">
                    <i :class="stat.icon"></i>
                  </div>
                  <div class="stat-info">
                    <h4>{{ stat.count }}</h4>
                    <p>{{ stat.label }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="revenue-card">
              <div class="revenue-header">
                <h3><i class="fas fa-dollar-sign"></i> {{ $t('payments.revenue') }}</h3>
              </div>
              <div class="revenue-body">
                <div class="revenue-item">
                  <span class="revenue-label">{{ $t('payments.totalRevenue') }}</span>
                  <span class="revenue-amount">${{ totalRevenue.toLocaleString() }}</span>
                </div>
                <div class="revenue-item">
                  <span class="revenue-label">{{ $t('payments.pendingAmount') }}</span>
                  <span class="revenue-amount pending">${{ pendingAmount.toLocaleString() }}</span>
                </div>
                <div class="revenue-item">
                  <span class="revenue-label">{{ $t('payments.refundedAmount') }}</span>
                  <span class="revenue-amount refunded">${{ refundedAmount.toLocaleString() }}</span>
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
  { value: 'completed', label: 'Completed', icon: 'fas fa-check-circle', gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
  { value: 'failed', label: 'Failed', icon: 'fas fa-times-circle', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { value: 'refunded', label: 'Refunded', icon: 'fas fa-undo', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }
]

const payments = ref([
  {
    id: 1,
    orderId: 'ORD-2024-001',
    productName: 'Wireless Headphones Pro',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
    amount: 299.99,
    method: 'Credit Card',
    customer: 'John Doe',
    transactionId: 'TXN-20241016-001',
    date: '2024-10-16 10:30',
    status: 'completed'
  },
  {
    id: 2,
    orderId: 'ORD-2024-002',
    productName: 'Smart Watch Series 5',
    productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
    amount: 399.99,
    method: 'PayPal',
    customer: 'Jane Smith',
    transactionId: 'TXN-20241016-002',
    date: '2024-10-16 11:15',
    status: 'pending'
  },
  {
    id: 3,
    orderId: 'ORD-2024-003',
    productName: 'Laptop Gaming Pro',
    productImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop',
    amount: 1299.99,
    method: 'Bank Transfer',
    customer: 'Mike Johnson',
    transactionId: 'TXN-20241016-003',
    date: '2024-10-16 09:45',
    status: 'completed'
  },
  {
    id: 4,
    orderId: 'ORD-2024-004',
    productName: 'Smartphone X Pro',
    productImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop',
    amount: 899.99,
    method: 'Credit Card',
    customer: 'Sarah Williams',
    transactionId: 'TXN-20241016-004',
    date: '2024-10-16 12:00',
    status: 'failed'
  },
  {
    id: 5,
    orderId: 'ORD-2024-005',
    productName: 'Tablet Pro 12',
    productImage: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=100&h=100&fit=crop',
    amount: 599.99,
    method: 'PayPal',
    customer: 'David Brown',
    transactionId: 'TXN-20241016-005',
    date: '2024-10-15 16:30',
    status: 'refunded'
  }
])

const filteredPayments = ref([...payments.value])

const paymentStats = computed(() => {
  return [
    {
      status: 'pending',
      label: 'Pending',
      count: payments.value.filter(p => p.status === 'pending').length,
      icon: 'fas fa-clock',
      gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)'
    },
    {
      status: 'completed',
      label: 'Completed',
      count: payments.value.filter(p => p.status === 'completed').length,
      icon: 'fas fa-check-circle',
      gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
    },
    {
      status: 'failed',
      label: 'Failed',
      count: payments.value.filter(p => p.status === 'failed').length,
      icon: 'fas fa-times-circle',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      status: 'refunded',
      label: 'Refunded',
      count: payments.value.filter(p => p.status === 'refunded').length,
      icon: 'fas fa-undo',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
  ]
})

const totalRevenue = computed(() => {
  return payments.value
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)
})

const pendingAmount = computed(() => {
  return payments.value
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)
})

const refundedAmount = computed(() => {
  return payments.value
    .filter(p => p.status === 'refunded')
    .reduce((sum, p) => sum + p.amount, 0)
})

const filterPayments = () => {
  let filtered = payments.value

  if (searchQuery.value) {
    filtered = filtered.filter(p => 
      p.productName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.orderId.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.customer.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(p => p.status === selectedStatus.value)
  }

  filteredPayments.value = filtered
}

const filterByStatus = (status) => {
  selectedStatus.value = status
  filterPayments()
}

const getStatusGradient = (status) => {
  const statusMap = {
    pending: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    completed: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    failed: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    refunded: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  }
  return statusMap[status] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}

const getStatusIcon = (status) => {
  const iconMap = {
    pending: 'fas fa-clock',
    completed: 'fas fa-check-circle',
    failed: 'fas fa-times-circle',
    refunded: 'fas fa-undo'
  }
  return iconMap[status] || 'fas fa-circle'
}

const getStatusLabel = (status) => {
  const labelMap = {
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed',
    refunded: 'Refunded'
  }
  return labelMap[status] || status
}

const viewDetails = (payment) => {
  alert(`View details for: ${payment.productName}`)
}

const approvePayment = (payment) => {
  if (confirm(t('payments.approveConfirm'))) {
    payment.status = 'completed'
    alert(t('payments.paymentApproved'))
  }
}

const rejectPayment = (payment) => {
  if (confirm(t('payments.rejectConfirm'))) {
    payment.status = 'failed'
    alert(t('payments.paymentRejected'))
  }
}

const refundPayment = (payment) => {
  if (confirm(t('payments.refundConfirm'))) {
    payment.status = 'refunded'
    alert(t('payments.paymentRefunded'))
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

.payments-list {
  display: grid;
  gap: 20px;
}

.payment-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.payment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.payment-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 15px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.payment-info {
  flex: 1;
}

.payment-info h3 {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.order-id,
.payment-date {
  color: #6c757d;
  font-size: 14px;
  margin: 3px 0;
}

.status-badge {
  padding: 10px 20px;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.payment-details {
  margin-bottom: 20px;
}

.detail-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.detail-item {
  display: flex;
  gap: 12px;
  padding: 15px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
}

.detail-item i {
  font-size: 24px;
  color: #667eea;
  margin-top: 5px;
}

.detail-item strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 14px;
}

.detail-item p {
  color: #6c757d;
  margin: 0;
  font-size: 14px;
}

.payment-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-details,
.btn-approve,
.btn-reject,
.btn-refund {
  flex: 1;
  min-width: 150px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-details {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-approve {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  color: white;
}

.btn-reject {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.btn-refund {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
}

.btn-details:hover,
.btn-approve:hover,
.btn-reject:hover,
.btn-refund:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.stats-card,
.revenue-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.stats-header h3,
.revenue-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  margin-bottom: 15px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
}

.stat-info h4 {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 5px 0;
}

.stat-info p {
  color: #6c757d;
  margin: 0;
  font-size: 14px;
}

.revenue-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  margin-bottom: 12px;
}

.revenue-label {
  font-weight: 600;
  color: #2c3e50;
}

.revenue-amount {
  font-size: 24px;
  font-weight: 700;
  color: #84fab0;
}

.revenue-amount.pending {
  color: #fad0c4;
}

.revenue-amount.refunded {
  color: #fa709a;
}
</style>
