<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">{{ $t('payments.paymentMethods') }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('breadcrumb.home') }}</router-link></li>
              <li class="breadcrumb-item active">{{ $t('payments.title') }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-8">
            <div class="add-method-section">
              <button @click="openAddModal" class="btn-add-method">
                <i class="fas fa-plus"></i> {{ $t('payments.addMethod') }}
              </button>
            </div>

            <div class="methods-grid">
              <div v-for="method in paymentMethods" :key="method.id" class="payment-card">
                <div class="payment-header">
                  <div class="payment-icon" :style="{ background: method.gradient }">
                    <i :class="method.icon"></i>
                  </div>
                  <div class="payment-info">
                    <h3>{{ method.name }}</h3>
                    <p class="payment-description">{{ method.description }}</p>
                  </div>
                  <div class="payment-status">
                    <label class="switch">
                      <input type="checkbox" v-model="method.active">
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>

                <div class="payment-details">
                  <div class="detail-item">
                    <i class="fas fa-percentage"></i>
                    <span>{{ $t('payments.fee') }}: {{ method.fee }}%</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>{{ method.processingTime }}</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>{{ method.security }}</span>
                  </div>
                </div>

                <div class="payment-features">
                  <span class="feature-label">{{ $t('payments.features') }}:</span>
                  <div class="features-list">
                    <span v-for="feature in method.features" :key="feature" class="feature-badge">
                      <i class="fas fa-check"></i> {{ feature }}
                    </span>
                  </div>
                </div>

                <div class="payment-actions">
                  <button @click="editMethod(method)" class="btn-edit">
                    <i class="fas fa-edit"></i> {{ $t('common.edit') }}
                  </button>
                  <button @click="deleteMethod(method.id)" class="btn-delete">
                    <i class="fas fa-trash"></i> {{ $t('common.delete') }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="stats-card">
              <div class="stats-header">
                <h3><i class="fas fa-chart-bar"></i> {{ $t('payments.statistics') }}</h3>
              </div>
              <div class="stats-body">
                <div class="stat-item">
                  <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                    <i class="fas fa-credit-card"></i>
                  </div>
                  <div class="stat-info">
                    <h4>{{ totalMethods }}</h4>
                    <p>{{ $t('payments.totalMethods') }}</p>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon" style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)">
                    <i class="fas fa-check-circle"></i>
                  </div>
                  <div class="stat-info">
                    <h4>{{ activeMethods }}</h4>
                    <p>{{ $t('payments.activeMethods') }}</p>
                  </div>
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

const showModal = ref(false)
const paymentMethods = ref([
  {
    id: 1,
    name: 'Credit/Debit Card',
    description: 'Accept all major credit and debit cards',
    icon: 'fas fa-credit-card',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fee: 2.9,
    processingTime: 'Instant',
    security: 'High',
    features: ['Visa', 'Mastercard', 'American Express'],
    active: true
  },
  {
    id: 2,
    name: 'PayPal',
    description: 'Fast and secure online payments',
    icon: 'fab fa-paypal',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    fee: 3.4,
    processingTime: 'Instant',
    security: 'High',
    features: ['Buyer Protection', 'Easy Refunds'],
    active: true
  },
  {
    id: 3,
    name: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    icon: 'fas fa-money-bill-wave',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    fee: 0,
    processingTime: 'On Delivery',
    security: 'Medium',
    features: ['No Prepayment', 'Inspect Before Pay'],
    active: true
  },
  {
    id: 4,
    name: 'Bank Transfer',
    description: 'Direct bank to bank transfer',
    icon: 'fas fa-university',
    gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    fee: 1.5,
    processingTime: '1-3 days',
    security: 'High',
    features: ['Low Fees', 'Large Amounts'],
    active: true
  }
])

const totalMethods = computed(() => paymentMethods.value.length)
const activeMethods = computed(() => paymentMethods.value.filter(m => m.active).length)

const openAddModal = () => {
  alert('Add payment method')
}

const editMethod = (method) => {
  alert('Edit: ' + method.name)
}

const deleteMethod = (id) => {
  if (confirm(t('payments.deleteConfirm'))) {
    const index = paymentMethods.value.findIndex(m => m.id === id)
    if (index !== -1) {
      paymentMethods.value.splice(index, 1)
      alert(t('payments.methodDeleted'))
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.add-method-section {
  margin-bottom: 25px;
}

.btn-add-method {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 12px 30px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-add-method:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.methods-grid {
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
}

.payment-icon {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
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

.payment-description {
  color: #6c757d;
  font-size: 14px;
  margin: 0;
}

.payment-status {
  flex-shrink: 0;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ccc;
  transition: 0.4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
}

input:checked + .slider:before {
  transform: translateX(30px);
}

.payment-details {
  display: flex;
  gap: 25px;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2c3e50;
  font-weight: 600;
}

.detail-item i {
  color: #667eea;
}

.payment-features {
  margin-bottom: 20px;
}

.feature-label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
  display: block;
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-badge {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.payment-actions {
  display: flex;
  gap: 10px;
}

.btn-edit,
.btn-delete {
  flex: 1;
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

.btn-edit {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  color: white;
}

.btn-delete {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.btn-edit:hover,
.btn-delete:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.stats-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.stats-header h3 {
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
</style>
