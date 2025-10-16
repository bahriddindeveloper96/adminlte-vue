<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">{{ $t('shipping.productTracking') }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('breadcrumb.home') }}</router-link></li>
              <li class="breadcrumb-item active">{{ $t('shipping.tracking') }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <section class="content">
      <div class="container-fluid">
        <!-- Search Section -->
        <div class="search-section">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input 
              v-model="searchQuery" 
              type="text" 
              :placeholder="$t('shipping.searchTracking')"
              @input="filterProducts"
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
          <!-- Products List -->
          <div class="col-lg-8">
            <div class="products-tracking-list">
              <div v-for="product in filteredProducts" :key="product.id" class="tracking-card">
                <div class="tracking-header">
                  <div class="product-image">
                    <img :src="product.image" :alt="product.name">
                  </div>
                  <div class="product-info">
                    <h3>{{ product.name }}</h3>
                    <p class="tracking-id">{{ $t('shipping.trackingId') }}: {{ product.trackingId }}</p>
                    <p class="order-date">{{ $t('shipping.orderDate') }}: {{ product.orderDate }}</p>
                  </div>
                  <div class="status-badge" :style="{ background: getStatusGradient(product.status) }">
                    <i :class="getStatusIcon(product.status)"></i>
                    {{ getStatusLabel(product.status) }}
                  </div>
                </div>

                <div class="tracking-timeline">
                  <div 
                    v-for="(step, index) in product.timeline" 
                    :key="index"
                    :class="['timeline-step', { active: step.completed, current: step.current }]"
                  >
                    <div class="timeline-icon">
                      <i :class="step.icon"></i>
                    </div>
                    <div class="timeline-content">
                      <h4>{{ step.title }}</h4>
                      <p>{{ step.description }}</p>
                      <span v-if="step.date" class="timeline-date">{{ step.date }}</span>
                    </div>
                  </div>
                </div>

                <div class="tracking-location">
                  <div class="location-info">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                      <strong>{{ $t('shipping.currentLocation') }}:</strong>
                      <p>{{ product.currentLocation }}</p>
                    </div>
                  </div>
                  <div class="delivery-info">
                    <i class="fas fa-truck"></i>
                    <div>
                      <strong>{{ $t('shipping.estimatedDelivery') }}:</strong>
                      <p>{{ product.estimatedDelivery }}</p>
                    </div>
                  </div>
                </div>

                <div class="tracking-actions">
                  <button @click="viewDetails(product)" class="btn-details">
                    <i class="fas fa-eye"></i> {{ $t('shipping.viewDetails') }}
                  </button>
                  <button @click="updateLocation(product)" class="btn-update">
                    <i class="fas fa-map-marked-alt"></i> {{ $t('shipping.updateLocation') }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Statistics -->
          <div class="col-lg-4">
            <div class="stats-card">
              <div class="stats-header">
                <h3><i class="fas fa-chart-pie"></i> {{ $t('shipping.deliveryStats') }}</h3>
              </div>
              <div class="stats-body">
                <div class="stat-item" v-for="stat in deliveryStats" :key="stat.status">
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

            <!-- Map Card -->
            <div class="map-card">
              <div class="map-header">
                <h3><i class="fas fa-globe"></i> {{ $t('shipping.deliveryMap') }}</h3>
              </div>
              <div class="map-placeholder">
                <i class="fas fa-map"></i>
                <p>{{ $t('shipping.mapPlaceholder') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="modal-overlay" @click.self="closeDetailsModal">
      <div class="modal-container-large">
        <div class="modal-header">
          <h2>{{ $t('shipping.trackingDetails') }}</h2>
          <button @click="closeDetailsModal" class="btn-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body" v-if="selectedProduct">
          <!-- Product Info Section -->
          <div class="details-section">
            <div class="section-header">
              <i class="fas fa-box"></i>
              <h3>{{ $t('shipping.productInfo') }}</h3>
            </div>
            <div class="product-details-grid">
              <div class="detail-row">
                <div class="product-image-large">
                  <img :src="selectedProduct.image" :alt="selectedProduct.name">
                </div>
                <div class="product-main-info">
                  <h2>{{ selectedProduct.name }}</h2>
                  <div class="info-badges">
                    <span class="info-badge">
                      <i class="fas fa-barcode"></i> {{ selectedProduct.trackingId }}
                    </span>
                    <span class="info-badge" :style="{ background: getStatusGradient(selectedProduct.status) }">
                      <i :class="getStatusIcon(selectedProduct.status)"></i> {{ getStatusLabel(selectedProduct.status) }}
                    </span>
                  </div>
                  <div class="info-grid">
                    <div class="info-item">
                      <i class="fas fa-calendar"></i>
                      <div>
                        <strong>{{ $t('shipping.orderDate') }}</strong>
                        <p>{{ selectedProduct.orderDate }}</p>
                      </div>
                    </div>
                    <div class="info-item">
                      <i class="fas fa-truck"></i>
                      <div>
                        <strong>{{ $t('shipping.estimatedDelivery') }}</strong>
                        <p>{{ selectedProduct.estimatedDelivery }}</p>
                      </div>
                    </div>
                    <div class="info-item">
                      <i class="fas fa-map-marker-alt"></i>
                      <div>
                        <strong>{{ $t('shipping.currentLocation') }}</strong>
                        <p>{{ selectedProduct.currentLocation }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Timeline Section -->
          <div class="details-section">
            <div class="section-header">
              <i class="fas fa-route"></i>
              <h3>{{ $t('shipping.deliveryTimeline') }}</h3>
            </div>
            <div class="timeline-detailed">
              <div 
                v-for="(step, index) in selectedProduct.timeline" 
                :key="index"
                :class="['timeline-step-detailed', { active: step.completed, current: step.current }]"
              >
                <div class="timeline-marker">
                  <div class="timeline-dot">
                    <i :class="step.icon"></i>
                  </div>
                  <div v-if="index < selectedProduct.timeline.length - 1" class="timeline-line"></div>
                </div>
                <div class="timeline-card">
                  <div class="timeline-card-header">
                    <h4>{{ step.title }}</h4>
                    <span v-if="step.date" class="timeline-time">{{ step.date }}</span>
                  </div>
                  <p>{{ step.description }}</p>
                  <div v-if="step.current" class="current-badge">
                    <i class="fas fa-circle"></i> {{ $t('shipping.currentStep') }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Shipping Details -->
          <div class="details-section">
            <div class="section-header">
              <i class="fas fa-shipping-fast"></i>
              <h3>{{ $t('shipping.shippingDetails') }}</h3>
            </div>
            <div class="shipping-details-grid">
              <div class="detail-card">
                <div class="detail-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                  <i class="fas fa-truck"></i>
                </div>
                <div class="detail-content">
                  <strong>{{ $t('shipping.shippingMethod') }}</strong>
                  <p>{{ selectedProduct.shippingMethod || 'Express Delivery' }}</p>
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-icon" style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)">
                  <i class="fas fa-weight"></i>
                </div>
                <div class="detail-content">
                  <strong>{{ $t('shipping.weight') }}</strong>
                  <p>{{ selectedProduct.weight || '2.5 kg' }}</p>
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%)">
                  <i class="fas fa-box"></i>
                </div>
                <div class="detail-content">
                  <strong>{{ $t('shipping.packageSize') }}</strong>
                  <p>{{ selectedProduct.packageSize || '30x20x15 cm' }}</p>
                </div>
              </div>
              <div class="detail-card">
                <div class="detail-icon" style="background: linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)">
                  <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="detail-content">
                  <strong>{{ $t('shipping.shippingCost') }}</strong>
                  <p>${{ selectedProduct.shippingCost || '15.99' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Customer Info -->
          <div class="details-section">
            <div class="section-header">
              <i class="fas fa-user"></i>
              <h3>{{ $t('shipping.customerInfo') }}</h3>
            </div>
            <div class="customer-info-grid">
              <div class="customer-detail">
                <i class="fas fa-user-circle"></i>
                <div>
                  <strong>{{ $t('shipping.customerName') }}</strong>
                  <p>{{ selectedProduct.customerName || 'John Doe' }}</p>
                </div>
              </div>
              <div class="customer-detail">
                <i class="fas fa-phone"></i>
                <div>
                  <strong>{{ $t('shipping.phone') }}</strong>
                  <p>{{ selectedProduct.phone || '+998 90 123 45 67' }}</p>
                </div>
              </div>
              <div class="customer-detail">
                <i class="fas fa-envelope"></i>
                <div>
                  <strong>{{ $t('shipping.email') }}</strong>
                  <p>{{ selectedProduct.email || 'john.doe@example.com' }}</p>
                </div>
              </div>
              <div class="customer-detail">
                <i class="fas fa-map-marked-alt"></i>
                <div>
                  <strong>{{ $t('shipping.deliveryAddress') }}</strong>
                  <p>{{ selectedProduct.address || 'Tashkent, Chilanzar 12, House 5, Apt 12' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="modal-actions">
            <button @click="printTracking" class="btn-action btn-print">
              <i class="fas fa-print"></i> {{ $t('shipping.printTracking') }}
            </button>
            <button @click="shareTracking" class="btn-action btn-share">
              <i class="fas fa-share-alt"></i> {{ $t('shipping.shareTracking') }}
            </button>
            <button @click="closeDetailsModal" class="btn-action btn-close-modal">
              <i class="fas fa-times"></i> {{ $t('common.close') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const searchQuery = ref('')
const selectedStatus = ref('all')
const showDetailsModal = ref(false)
const selectedProduct = ref(null)

const statuses = [
  { value: 'all', label: 'All', icon: 'fas fa-list', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { value: 'processing', label: 'Processing', icon: 'fas fa-cog', gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)' },
  { value: 'shipped', label: 'Shipped', icon: 'fas fa-shipping-fast', gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
  { value: 'in_transit', label: 'In Transit', icon: 'fas fa-truck', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { value: 'delivered', label: 'Delivered', icon: 'fas fa-check-circle', gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' }
]

const products = ref([
  {
    id: 1,
    name: 'Wireless Headphones Pro',
    trackingId: 'TRK-2024-001',
    orderDate: '2024-10-10',
    status: 'in_transit',
    currentLocation: 'Tashkent Distribution Center',
    estimatedDelivery: '2024-10-18',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
    timeline: [
      { title: 'Order Placed', description: 'Your order has been received', date: '2024-10-10 10:30', icon: 'fas fa-shopping-cart', completed: true },
      { title: 'Processing', description: 'Order is being prepared', date: '2024-10-11 14:20', icon: 'fas fa-cog', completed: true },
      { title: 'Shipped', description: 'Package has been shipped', date: '2024-10-12 09:15', icon: 'fas fa-box', completed: true },
      { title: 'In Transit', description: 'Package is on the way', date: '2024-10-15 16:45', icon: 'fas fa-truck', completed: true, current: true },
      { title: 'Out for Delivery', description: 'Package is out for delivery', icon: 'fas fa-shipping-fast', completed: false },
      { title: 'Delivered', description: 'Package has been delivered', icon: 'fas fa-check-circle', completed: false }
    ]
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    trackingId: 'TRK-2024-002',
    orderDate: '2024-10-12',
    status: 'shipped',
    currentLocation: 'Samarkand Warehouse',
    estimatedDelivery: '2024-10-20',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
    timeline: [
      { title: 'Order Placed', description: 'Your order has been received', date: '2024-10-12 11:00', icon: 'fas fa-shopping-cart', completed: true },
      { title: 'Processing', description: 'Order is being prepared', date: '2024-10-13 15:30', icon: 'fas fa-cog', completed: true },
      { title: 'Shipped', description: 'Package has been shipped', date: '2024-10-14 10:00', icon: 'fas fa-box', completed: true, current: true },
      { title: 'In Transit', description: 'Package is on the way', icon: 'fas fa-truck', completed: false },
      { title: 'Out for Delivery', description: 'Package is out for delivery', icon: 'fas fa-shipping-fast', completed: false },
      { title: 'Delivered', description: 'Package has been delivered', icon: 'fas fa-check-circle', completed: false }
    ]
  },
  {
    id: 3,
    name: 'Laptop Gaming Pro',
    trackingId: 'TRK-2024-003',
    orderDate: '2024-10-08',
    status: 'delivered',
    currentLocation: 'Delivered to Customer',
    estimatedDelivery: '2024-10-16',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop',
    timeline: [
      { title: 'Order Placed', description: 'Your order has been received', date: '2024-10-08 09:00', icon: 'fas fa-shopping-cart', completed: true },
      { title: 'Processing', description: 'Order is being prepared', date: '2024-10-09 13:00', icon: 'fas fa-cog', completed: true },
      { title: 'Shipped', description: 'Package has been shipped', date: '2024-10-10 08:30', icon: 'fas fa-box', completed: true },
      { title: 'In Transit', description: 'Package is on the way', date: '2024-10-13 14:00', icon: 'fas fa-truck', completed: true },
      { title: 'Out for Delivery', description: 'Package is out for delivery', date: '2024-10-16 07:00', icon: 'fas fa-shipping-fast', completed: true },
      { title: 'Delivered', description: 'Package has been delivered', date: '2024-10-16 15:30', icon: 'fas fa-check-circle', completed: true, current: true }
    ]
  }
])

const filteredProducts = ref([...products.value])

const deliveryStats = computed(() => {
  return [
    {
      status: 'processing',
      label: 'Processing',
      count: products.value.filter(p => p.status === 'processing').length,
      icon: 'fas fa-cog',
      gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)'
    },
    {
      status: 'shipped',
      label: 'Shipped',
      count: products.value.filter(p => p.status === 'shipped').length,
      icon: 'fas fa-box',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      status: 'in_transit',
      label: 'In Transit',
      count: products.value.filter(p => p.status === 'in_transit').length,
      icon: 'fas fa-truck',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      status: 'delivered',
      label: 'Delivered',
      count: products.value.filter(p => p.status === 'delivered').length,
      icon: 'fas fa-check-circle',
      gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
    }
  ]
})

const filterProducts = () => {
  let filtered = products.value

  if (searchQuery.value) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.trackingId.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(p => p.status === selectedStatus.value)
  }

  filteredProducts.value = filtered
}

const filterByStatus = (status) => {
  selectedStatus.value = status
  filterProducts()
}

const getStatusGradient = (status) => {
  const statusMap = {
    processing: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    shipped: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    in_transit: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    delivered: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
  }
  return statusMap[status] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}

const getStatusIcon = (status) => {
  const iconMap = {
    processing: 'fas fa-cog',
    shipped: 'fas fa-box',
    in_transit: 'fas fa-truck',
    delivered: 'fas fa-check-circle'
  }
  return iconMap[status] || 'fas fa-box'
}

const getStatusLabel = (status) => {
  const labelMap = {
    processing: 'Processing',
    shipped: 'Shipped',
    in_transit: 'In Transit',
    delivered: 'Delivered'
  }
  return labelMap[status] || status
}

const viewDetails = (product) => {
  selectedProduct.value = product
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedProduct.value = null
}

const printTracking = () => {
  alert(t('shipping.printingTracking'))
}

const shareTracking = () => {
  alert(t('shipping.sharingTracking'))
}

const updateLocation = (product) => {
  alert(`Update location for: ${product.name}`)
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

.products-tracking-list {
  display: grid;
  gap: 20px;
}

.tracking-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.tracking-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.tracking-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
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

.product-info {
  flex: 1;
}

.product-info h3 {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.tracking-id,
.order-date {
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

.tracking-timeline {
  margin-bottom: 25px;
}

.timeline-step {
  display: flex;
  gap: 20px;
  position: relative;
  padding-bottom: 25px;
}

.timeline-step:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 22px;
  top: 45px;
  width: 2px;
  height: calc(100% - 20px);
  background: #e9ecef;
}

.timeline-step.active:not(:last-child)::before {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.timeline-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #6c757d;
  flex-shrink: 0;
  z-index: 1;
}

.timeline-step.active .timeline-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.timeline-step.current .timeline-icon {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  animation: pulse 2s infinite;
}

.timeline-content {
  flex: 1;
}

.timeline-content h4 {
  font-size: 16px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.timeline-content p {
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 5px;
}

.timeline-date {
  color: #667eea;
  font-size: 13px;
  font-weight: 600;
}

.tracking-location {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
}

.location-info,
.delivery-info {
  flex: 1;
  display: flex;
  gap: 12px;
}

.location-info i,
.delivery-info i {
  font-size: 24px;
  color: #667eea;
}

.location-info strong,
.delivery-info strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
}

.location-info p,
.delivery-info p {
  color: #6c757d;
  margin: 0;
  font-size: 14px;
}

.tracking-actions {
  display: flex;
  gap: 10px;
}

.btn-details,
.btn-update {
  flex: 1;
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

.btn-details {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-update {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  color: white;
}

.btn-details:hover,
.btn-update:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.stats-card,
.map-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.stats-header h3,
.map-header h3 {
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

.map-placeholder {
  height: 300px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.map-placeholder i {
  font-size: 60px;
  margin-bottom: 15px;
  opacity: 0.5;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(250, 112, 154, 0.3);
  }
  50% {
    box-shadow: 0 4px 25px rgba(250, 112, 154, 0.6);
  }
}

/* Details Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.modal-container-large {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  border-bottom: 2px solid #f0f0f0;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.modal-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.btn-close {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: rotate(90deg);
}

.modal-body {
  padding: 25px;
}

.details-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  border: 2px solid #f0f0f0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.section-header i {
  font-size: 24px;
  color: #667eea;
}

.section-header h3 {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.product-details-grid {
  display: grid;
  gap: 20px;
}

.detail-row {
  display: flex;
  gap: 25px;
}

.product-image-large {
  width: 200px;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-image-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-main-info {
  flex: 1;
}

.product-main-info h2 {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
}

.info-badges {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.info-badge {
  padding: 8px 16px;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.info-item {
  display: flex;
  gap: 12px;
  padding: 15px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
}

.info-item i {
  font-size: 24px;
  color: #667eea;
}

.info-item strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 14px;
}

.info-item p {
  color: #6c757d;
  margin: 0;
  font-size: 14px;
}

/* Timeline Detailed */
.timeline-detailed {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-step-detailed {
  display: flex;
  gap: 20px;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.timeline-dot {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #6c757d;
  z-index: 1;
}

.timeline-step-detailed.active .timeline-dot {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.timeline-step-detailed.current .timeline-dot {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  animation: pulse 2s infinite;
}

.timeline-line {
  width: 3px;
  flex: 1;
  background: #e9ecef;
  margin: 5px 0;
}

.timeline-step-detailed.active .timeline-line {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.timeline-card {
  flex: 1;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
}

.timeline-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.timeline-card-header h4 {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.timeline-time {
  color: #667eea;
  font-weight: 600;
  font-size: 14px;
}

.timeline-card p {
  color: #6c757d;
  margin: 0 0 10px 0;
}

.current-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
  border-radius: 20px;
  font-weight: 600;
  font-size: 13px;
}

.current-badge i {
  animation: blink 1.5s infinite;
}

/* Shipping Details Grid */
.shipping-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.detail-card {
  display: flex;
  gap: 15px;
  padding: 20px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  align-items: center;
}

.detail-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
}

.detail-content strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 14px;
}

.detail-content p {
  color: #6c757d;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

/* Customer Info Grid */
.customer-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.customer-detail {
  display: flex;
  gap: 15px;
  padding: 20px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  align-items: flex-start;
}

.customer-detail i {
  font-size: 24px;
  color: #667eea;
  margin-top: 5px;
}

.customer-detail strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 5px;
  font-size: 14px;
}

.customer-detail p {
  color: #6c757d;
  margin: 0;
  font-size: 14px;
}

/* Modal Actions */
.modal-actions {
  display: flex;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 15px;
  margin-top: 20px;
}

.btn-action {
  flex: 1;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-print {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-share {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  color: white;
}

.btn-close-modal {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.btn-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
</style>
