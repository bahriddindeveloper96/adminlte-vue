<template>
  <div class="content-wrapper">
    <!-- Content Header -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">{{ $t('products.categories') }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('breadcrumb.home') }}</router-link></li>
              <li class="breadcrumb-item"><router-link to="/products">{{ $t('products.title') }}</router-link></li>
              <li class="breadcrumb-item active">{{ $t('products.categories') }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- Categories List -->
          <div class="col-lg-8">
            <div class="categories-card">
              <div class="card-header-custom">
                <h3><i class="fas fa-list"></i> {{ $t('products.categoriesList') }}</h3>
                <button class="btn-add-category" @click="openAddModal">
                  <i class="fas fa-plus"></i> {{ $t('products.addCategory') }}
                </button>
              </div>
              <div class="card-body-custom">
                <div class="categories-grid">
                  <div 
                    v-for="category in categories" 
                    :key="category.id" 
                    class="category-item"
                    :style="{ borderColor: category.color }"
                  >
                    <div class="category-icon" :style="{ background: category.gradient }">
                      <i :class="category.icon"></i>
                    </div>
                    <div class="category-info">
                      <h4>{{ category.name }}</h4>
                      <p>{{ category.description }}</p>
                      <div class="category-stats">
                        <span class="stat-item">
                          <i class="fas fa-box"></i>
                          {{ category.productCount }} {{ $t('products.products') }}
                        </span>
                        <span class="stat-item">
                          <i class="fas fa-dollar-sign"></i>
                          ${{ category.totalValue.toLocaleString() }}
                        </span>
                      </div>
                    </div>
                    <div class="category-actions">
                      <button @click="editCategory(category)" class="action-btn edit-btn" :title="$t('common.edit')">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button @click="deleteCategory(category)" class="action-btn delete-btn" :title="$t('common.delete')">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Statistics -->
          <div class="col-lg-4">
            <!-- Total Stats Card -->
            <div class="stats-card">
              <div class="card-header-custom">
                <h3><i class="fas fa-chart-bar"></i> {{ $t('products.statistics') }}</h3>
              </div>
              <div class="card-body-custom">
                <div class="stat-box">
                  <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <i class="fas fa-layer-group"></i>
                  </div>
                  <div class="stat-details">
                    <h4>{{ totalCategories }}</h4>
                    <p>{{ $t('products.totalCategories') }}</p>
                  </div>
                </div>
                <div class="stat-box">
                  <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                    <i class="fas fa-boxes"></i>
                  </div>
                  <div class="stat-details">
                    <h4>{{ totalProducts }}</h4>
                    <p>{{ $t('products.totalProducts') }}</p>
                  </div>
                </div>
                <div class="stat-box">
                  <div class="stat-icon" style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);">
                    <i class="fas fa-dollar-sign"></i>
                  </div>
                  <div class="stat-details">
                    <h4>${{ totalValue.toLocaleString() }}</h4>
                    <p>{{ $t('products.totalValue') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top Categories Card -->
            <div class="stats-card">
              <div class="card-header-custom">
                <h3><i class="fas fa-trophy"></i> {{ $t('products.topCategories') }}</h3>
              </div>
              <div class="card-body-custom">
                <div class="top-category-list">
                  <div v-for="(category, index) in topCategories" :key="category.id" class="top-category-item">
                    <div class="rank-badge" :class="`rank-${index + 1}`">
                      {{ index + 1 }}
                    </div>
                    <div class="top-category-info">
                      <h5>{{ category.name }}</h5>
                      <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: category.percentage + '%', background: category.gradient }"></div>
                      </div>
                      <span class="percentage-text">{{ category.percentage }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ isEditMode ? $t('products.editCategory') : $t('products.addCategory') }}</h3>
          <button @click="closeModal" class="btn-close-modal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label class="form-label">{{ $t('products.categoryName') }} <span class="required">*</span></label>
              <input 
                v-model="formData.name" 
                type="text" 
                class="form-control-custom" 
                :placeholder="$t('products.enterCategoryName')"
                required
              >
            </div>

            <div class="form-group">
              <label class="form-label">{{ $t('products.description') }}</label>
              <textarea 
                v-model="formData.description" 
                class="form-control-custom" 
                rows="3"
                :placeholder="$t('products.enterDescription')"
              ></textarea>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">{{ $t('products.icon') }}</label>
                  <select v-model="formData.icon" class="form-control-custom">
                    <option value="fas fa-laptop">💻 Laptop</option>
                    <option value="fas fa-tshirt">👕 T-Shirt</option>
                    <option value="fas fa-book">📚 Book</option>
                    <option value="fas fa-utensils">🍴 Food</option>
                    <option value="fas fa-mobile-alt">📱 Mobile</option>
                    <option value="fas fa-headphones">🎧 Headphones</option>
                    <option value="fas fa-camera">📷 Camera</option>
                    <option value="fas fa-gamepad">🎮 Gaming</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">{{ $t('products.color') }}</label>
                  <select v-model="formData.gradient" class="form-control-custom">
                    <option value="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">🟣 Purple</option>
                    <option value="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">🔴 Pink</option>
                    <option value="linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)">🟢 Green</option>
                    <option value="linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)">🟠 Orange</option>
                    <option value="linear-gradient(135deg, #fa709a 0%, #fee140 100%)">🟡 Yellow</option>
                    <option value="linear-gradient(135deg, #30cfd0 0%, #330867 100%)">🔵 Blue</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">{{ $t('products.categoryAttributes') }}</label>
              <p class="help-text">{{ $t('products.categoryAttributesDesc') }}</p>
              <div class="attributes-list">
                <div v-for="(attr, index) in formData.attributes" :key="index" class="attribute-wrapper">
                  <div class="attribute-item">
                    <input 
                      v-model="formData.attributes[index].name" 
                      type="text" 
                      class="form-control-custom" 
                      :placeholder="$t('products.attributeName')"
                    >
                    <select v-model="formData.attributes[index].type" @change="onAttributeTypeChange(index)" class="form-control-custom attribute-type">
                      <option value="text">📝 {{ $t('products.text') }}</option>
                      <option value="number">🔢 {{ $t('products.number') }}</option>
                      <option value="select">📋 {{ $t('products.dropdown') }}</option>
                    </select>
                    <button type="button" @click="toggleOptions(index)" v-if="formData.attributes[index].type === 'select'" class="btn-options" :title="$t('products.manageOptions')">
                      <i class="fas fa-cog"></i>
                    </button>
                    <button type="button" @click="removeAttribute(index)" class="btn-remove">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                  
                  <!-- Options for select type -->
                  <div v-if="formData.attributes[index].type === 'select' && formData.attributes[index].showOptions" class="options-section">
                    <label class="options-label">📋 {{ $t('products.optionValues') }}:</label>
                    <div class="options-list">
                      <div v-for="(option, optIndex) in formData.attributes[index].options" :key="optIndex" class="option-item">
                        <input 
                          v-model="formData.attributes[index].options[optIndex]" 
                          type="text" 
                          class="form-control-custom option-input" 
                          :placeholder="$t('products.optionPlaceholder')"
                        >
                        <button type="button" @click="removeOption(index, optIndex)" class="btn-remove-small">
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <button type="button" @click="addOption(index)" class="btn-add-option">
                      <i class="fas fa-plus"></i> {{ $t('products.addOption') }}
                    </button>
                  </div>
                </div>
              </div>
              <button type="button" @click="addAttribute" class="btn-add-attribute">
                <i class="fas fa-plus"></i> {{ $t('products.addAttribute') }}
              </button>
            </div>

            <div class="modal-actions">
              <button type="submit" class="btn-save">
                <i class="fas fa-save"></i> {{ $t('common.save') }}
              </button>
              <button type="button" @click="closeModal" class="btn-cancel">
                <i class="fas fa-times"></i> {{ $t('common.cancel') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const showModal = ref(false)
const isEditMode = ref(false)
const editingId = ref(null)

const formData = ref({
  name: '',
  description: '',
  icon: 'fas fa-laptop',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  attributes: []
})

const categories = ref([
  {
    id: 1,
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
    icon: 'fas fa-laptop',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#667eea',
    productCount: 156,
    totalValue: 245800,
    attributes: [
      { name: 'Brand', type: 'text', options: [], showOptions: false },
      { name: 'Model', type: 'text', options: [], showOptions: false },
      { name: 'Warranty', type: 'text', options: [], showOptions: false },
      { name: 'Storage', type: 'select', options: ['64GB', '128GB', '256GB', '512GB', '1TB'], showOptions: false }
    ]
  },
  {
    id: 2,
    name: 'Clothing',
    description: 'Fashion and apparel items',
    icon: 'fas fa-tshirt',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#f093fb',
    productCount: 234,
    totalValue: 89500,
    attributes: [
      { name: 'Size', type: 'select', options: ['S', 'M', 'L', 'XL', 'XXL'], showOptions: false },
      { name: 'Color', type: 'text', options: [], showOptions: false },
      { name: 'Material', type: 'select', options: ['Cotton', 'Polyester', 'Silk', 'Wool', 'Leather'], showOptions: false },
      { name: 'Brand', type: 'text', options: [], showOptions: false }
    ]
  },
  {
    id: 3,
    name: 'Books',
    description: 'Books and educational materials',
    icon: 'fas fa-book',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    color: '#84fab0',
    productCount: 189,
    totalValue: 45600,
    attributes: [
      { name: 'Author', type: 'text', options: [], showOptions: false },
      { name: 'Publisher', type: 'text', options: [], showOptions: false },
      { name: 'Pages', type: 'number', options: [], showOptions: false },
      { name: 'Language', type: 'select', options: ['English', 'Russian', 'Uzbek', 'Spanish', 'French'], showOptions: false }
    ]
  },
  {
    id: 4,
    name: 'Food & Beverages',
    description: 'Food items and drinks',
    icon: 'fas fa-utensils',
    gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    color: '#fad0c4',
    productCount: 98,
    totalValue: 23400,
    attributes: [
      { name: 'Weight', type: 'select', options: ['100g', '250g', '500g', '1kg', '2kg'], showOptions: false },
      { name: 'Expiry Date', type: 'text', options: [], showOptions: false },
      { name: 'Ingredients', type: 'text', options: [], showOptions: false },
      { name: 'Package Type', type: 'select', options: ['Bottle', 'Can', 'Box', 'Bag', 'Jar'], showOptions: false }
    ]
  },
  {
    id: 5,
    name: 'Mobile Phones',
    description: 'Smartphones and accessories',
    icon: 'fas fa-mobile-alt',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    color: '#fa709a',
    productCount: 87,
    totalValue: 178900
  },
  {
    id: 6,
    name: 'Audio',
    description: 'Headphones and speakers',
    icon: 'fas fa-headphones',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    color: '#30cfd0',
    productCount: 65,
    totalValue: 56700
  }
])

const totalCategories = computed(() => categories.value.length)
const totalProducts = computed(() => categories.value.reduce((sum, cat) => sum + cat.productCount, 0))
const totalValue = computed(() => categories.value.reduce((sum, cat) => sum + cat.totalValue, 0))

const topCategories = computed(() => {
  const total = totalProducts.value
  return categories.value
    .map(cat => ({
      ...cat,
      percentage: Math.round((cat.productCount / total) * 100)
    }))
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, 5)
})

const addAttribute = () => {
  formData.value.attributes.push({ 
    name: '', 
    type: 'text',
    options: [],
    showOptions: false
  })
}

const removeAttribute = (index) => {
  formData.value.attributes.splice(index, 1)
}

const onAttributeTypeChange = (index) => {
  if (formData.value.attributes[index].type === 'select') {
    if (!formData.value.attributes[index].options) {
      formData.value.attributes[index].options = []
    }
  }
}

const toggleOptions = (index) => {
  formData.value.attributes[index].showOptions = !formData.value.attributes[index].showOptions
}

const addOption = (index) => {
  if (!formData.value.attributes[index].options) {
    formData.value.attributes[index].options = []
  }
  formData.value.attributes[index].options.push('')
}

const removeOption = (attrIndex, optIndex) => {
  formData.value.attributes[attrIndex].options.splice(optIndex, 1)
}

const openAddModal = () => {
  isEditMode.value = false
  formData.value = {
    name: '',
    description: '',
    icon: 'fas fa-laptop',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    attributes: []
  }
  showModal.value = true
}

const editCategory = (category) => {
  isEditMode.value = true
  editingId.value = category.id
  formData.value = {
    name: category.name,
    description: category.description,
    icon: category.icon,
    gradient: category.gradient,
    attributes: JSON.parse(JSON.stringify(category.attributes || []))
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  isEditMode.value = false
  editingId.value = null
}

const handleSubmit = () => {
  if (isEditMode.value) {
    const index = categories.value.findIndex(c => c.id === editingId.value)
    if (index > -1) {
      categories.value[index] = {
        ...categories.value[index],
        ...formData.value,
        color: formData.value.gradient.match(/#[a-fA-F0-9]{6}/)?.[0] || '#667eea'
      }
      alert(t('products.categoryUpdated'))
    }
  } else {
    const newCategory = {
      id: Date.now(),
      ...formData.value,
      color: formData.value.gradient.match(/#[a-fA-F0-9]{6}/)?.[0] || '#667eea',
      productCount: 0,
      totalValue: 0
    }
    categories.value.push(newCategory)
    alert(t('products.categoryAdded'))
  }
  closeModal()
}

const deleteCategory = (category) => {
  if (confirm(`${t('products.deleteCategoryConfirm')} "${category.name}"?`)) {
    const index = categories.value.findIndex(c => c.id === category.id)
    if (index > -1) {
      categories.value.splice(index, 1)
      alert(t('products.categoryDeleted'))
    }
  }
}
</script>

<style scoped>
/* Content Wrapper */
.content-wrapper {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding-bottom: 30px;
}

/* Content Header */
.content-header {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  margin: 15px;
  padding: 20px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-header h1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 28px;
}

/* Breadcrumb */
.breadcrumb {
  background: transparent;
  margin-bottom: 0;
}

.breadcrumb-item a {
  color: #667eea;
  font-weight: 500;
  transition: all 0.3s ease;
}

.breadcrumb-item a:hover {
  color: #764ba2;
  text-decoration: none;
}

/* Cards */
.categories-card,
.stats-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out;
}

.card-header-custom {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 20px 25px;
  border-bottom: 2px solid rgba(102, 126, 234, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header-custom h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-header-custom i {
  color: #667eea;
  font-size: 22px;
}

.card-body-custom {
  padding: 25px;
}

.btn-add-category {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-add-category:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

/* Categories Grid */
.categories-grid {
  display: grid;
  gap: 20px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  border-left: 4px solid;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.category-item:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.category-icon {
  width: 70px;
  height: 70px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
  flex-shrink: 0;
}

.category-info {
  flex: 1;
}

.category-info h4 {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.category-info p {
  color: #6c757d;
  margin-bottom: 10px;
  font-size: 14px;
}

.category-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #667eea;
  font-weight: 600;
  font-size: 14px;
}

.stat-item i {
  font-size: 12px;
}

.category-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.edit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.delete-btn {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.action-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Stats Boxes */
.stat-box {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 15px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.stat-box:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateX(5px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
}

.stat-details h4 {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.stat-details p {
  color: #6c757d;
  font-size: 14px;
  margin: 0;
}

/* Top Categories */
.top-category-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.top-category-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.rank-badge {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  color: white;
}

.rank-1 {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
}

.rank-2 {
  background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%);
}

.rank-3 {
  background: linear-gradient(135deg, #cd7f32 0%, #e8a87c 100%);
}

.rank-4,
.rank-5 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.top-category-info {
  flex: 1;
}

.top-category-info h5 {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.progress-bar {
  height: 8px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease;
}

.percentage-text {
  font-size: 12px;
  color: #6c757d;
  font-weight: 600;
}

/* Modal */
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

.modal-content {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

.modal-header {
  padding: 25px;
  border-bottom: 2px solid rgba(102, 126, 234, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
}

.modal-header h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
}

.btn-close-modal {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  background: rgba(245, 87, 108, 0.1);
  color: #f5576c;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-close-modal:hover {
  background: #f5576c;
  color: white;
  transform: rotate(90deg);
}

.modal-body {
  padding: 25px;
}

/* Form Elements */
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 14px;
}

.required {
  color: #f5576c;
}

.form-control-custom {
  width: 100%;
  padding: 12px 18px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  font-size: 15px;
  color: #2c3e50;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
}

.form-control-custom:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.2);
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 25px;
}

.btn-save {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 14px 25px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.btn-cancel {
  flex: 1;
  background: white;
  border: 2px solid rgba(102, 126, 234, 0.3);
  color: #667eea;
  padding: 14px 25px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-cancel:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
}

/* Attributes List */
.help-text {
  color: #6c757d;
  font-size: 13px;
  margin-bottom: 15px;
  font-style: italic;
}

.attributes-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
}

.attribute-wrapper {
  background: rgba(102, 126, 234, 0.03);
  padding: 15px;
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.attribute-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

.attribute-type {
  width: 180px;
  flex-shrink: 0;
}

.btn-options {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.btn-options:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(132, 250, 176, 0.3);
}

/* Options Section */
.options-section {
  margin-top: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  border: 2px dashed rgba(102, 126, 234, 0.2);
}

.options-label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 14px;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
}

.option-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.option-input {
  flex: 1;
  padding: 8px 12px !important;
  font-size: 14px !important;
}

.btn-remove-small {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-remove-small:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 10px rgba(245, 87, 108, 0.3);
}

.btn-add-option {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-add-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.btn-add-attribute {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-add-attribute:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(132, 250, 176, 0.3);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .content-header {
    margin: 10px;
    padding: 15px !important;
  }

  .category-item {
    flex-direction: column;
    text-align: center;
  }

  .category-actions {
    width: 100%;
    justify-content: center;
  }

  .modal-content {
    width: 95%;
  }
}
</style>
