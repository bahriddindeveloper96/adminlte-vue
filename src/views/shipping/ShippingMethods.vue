<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">{{ $t('shipping.shippingMethods') }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('breadcrumb.home') }}</router-link></li>
              <li class="breadcrumb-item active">{{ $t('shipping.title') }}</li>
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
                <i class="fas fa-plus"></i> {{ $t('shipping.addMethod') }}
              </button>
            </div>

            <div class="methods-grid">
              <div v-for="method in shippingMethods" :key="method.id" class="method-card">
                <div class="method-header">
                  <div class="method-icon" :style="{ background: method.gradient }">
                    <i :class="method.icon"></i>
                  </div>
                  <div class="method-info">
                    <h3>{{ method.name }}</h3>
                    <p class="method-description">{{ method.description }}</p>
                  </div>
                  <div class="method-status">
                    <label class="switch">
                      <input type="checkbox" v-model="method.active">
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>

                <div class="method-details">
                  <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>{{ method.deliveryTime }}</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span>${{ method.cost }}</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-weight"></i>
                    <span>{{ $t('shipping.maxWeight') }}: {{ method.maxWeight }}kg</span>
                  </div>
                </div>

                <div class="method-regions">
                  <span class="region-label">{{ $t('shipping.availableRegions') }}:</span>
                  <div class="regions-list">
                    <span v-for="region in method.regions" :key="region" class="region-badge">
                      {{ region }}
                    </span>
                  </div>
                </div>

                <div class="method-actions">
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
                <h3><i class="fas fa-chart-line"></i> {{ $t('shipping.statistics') }}</h3>
              </div>
              <div class="stats-body">
                <div class="stat-item">
                  <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                    <i class="fas fa-shipping-fast"></i>
                  </div>
                  <div class="stat-info">
                    <h4>{{ totalMethods }}</h4>
                    <p>{{ $t('shipping.totalMethods') }}</p>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-icon" style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)">
                    <i class="fas fa-check-circle"></i>
                  </div>
                  <div class="stat-info">
                    <h4>{{ activeMethods }}</h4>
                    <p>{{ $t('shipping.activeMethods') }}</p>
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

const shippingMethods = ref([
  {
    id: 1,
    name: 'Standard Shipping',
    description: 'Regular delivery service',
    icon: 'fas fa-truck',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cost: 5.99,
    deliveryTime: '3-5 days',
    maxWeight: 50,
    regions: ['Tashkent', 'Samarkand', 'Bukhara'],
    active: true
  },
  {
    id: 2,
    name: 'Express Delivery',
    description: 'Fast delivery within 24 hours',
    icon: 'fas fa-shipping-fast',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cost: 15.99,
    deliveryTime: '1 day',
    maxWeight: 30,
    regions: ['Tashkent', 'Samarkand'],
    active: true
  },
  {
    id: 3,
    name: 'Air Cargo',
    description: 'International air shipping',
    icon: 'fas fa-plane',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    cost: 45.99,
    deliveryTime: '5-7 days',
    maxWeight: 100,
    regions: ['International'],
    active: true
  },
  {
    id: 4,
    name: 'Bicycle Courier',
    description: 'Eco-friendly local delivery',
    icon: 'fas fa-bicycle',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    cost: 3.99,
    deliveryTime: '2-4 hours',
    maxWeight: 10,
    regions: ['Tashkent'],
    active: true
  }
])

const totalMethods = computed(() => shippingMethods.value.length)
const activeMethods = computed(() => shippingMethods.value.filter(m => m.active).length)

const openAddModal = () => {
  alert('Add shipping method')
}

const editMethod = (method) => {
  alert('Edit: ' + method.name)
}

const deleteMethod = (id) => {
  alert('Delete method')
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

.method-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.method-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.method-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.method-icon {
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

.method-info {
  flex: 1;
}

.method-info h3 {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.method-description {
  color: #6c757d;
  font-size: 14px;
  margin: 0;
}

.method-status {
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

.method-details {
  display: flex;
  gap: 25px;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
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

.method-regions {
  margin-bottom: 20px;
}

.region-label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
  display: block;
}

.regions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.region-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.method-actions {
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
