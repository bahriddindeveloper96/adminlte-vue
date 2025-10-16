<template>
  <div class="content-wrapper">
    <!-- Content Header -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">{{ isEditMode ? $t('products.editProduct') : $t('products.addProduct') }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('breadcrumb.home') }}</router-link></li>
              <li class="breadcrumb-item"><router-link to="/products">{{ $t('products.title') }}</router-link></li>
              <li class="breadcrumb-item active">{{ isEditMode ? $t('products.edit') : $t('products.add') }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <!-- Left Column - Basic Info -->
            <div class="col-lg-8">
              <!-- Basic Information Card -->
              <div class="info-card">
                <div class="card-header-custom">
                  <h3><i class="fas fa-info-circle"></i> {{ $t('products.basicInfo') }}</h3>
                </div>
                <div class="card-body-custom">
                  <div class="form-group">
                    <label class="form-label">{{ $t('products.productName') }} <span class="required">*</span></label>
                    <input 
                      v-model="formData.name" 
                      type="text" 
                      class="form-control-custom" 
                      :placeholder="$t('products.enterProductName')"
                      required
                    >
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">{{ $t('products.category') }} <span class="required">*</span></label>
                        <select v-model="formData.category" @change="onCategoryChange" class="form-control-custom" required>
                          <option value="">{{ $t('products.selectCategory') }}</option>
                          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">SKU <span class="required">*</span></label>
                        <input 
                          v-model="formData.sku" 
                          type="text" 
                          class="form-control-custom" 
                          placeholder="WH-PRO-001"
                          required
                        >
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">{{ $t('products.description') }} <span class="required">*</span></label>
                    <textarea 
                      v-model="formData.description" 
                      class="form-control-custom" 
                      rows="4"
                      :placeholder="$t('products.enterDescription')"
                      required
                    ></textarea>
                  </div>

                  <div class="form-group">
                    <label class="form-label">{{ $t('products.features') }}</label>
                    <div class="features-list">
                      <div v-for="(feature, index) in formData.features" :key="index" class="feature-item">
                        <input 
                          v-model="formData.features[index]" 
                          type="text" 
                          class="form-control-custom" 
                          :placeholder="$t('products.featurePlaceholder')"
                        >
                        <button type="button" @click="removeFeature(index)" class="btn-remove">
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <button type="button" @click="addFeature" class="btn-add-feature">
                      <i class="fas fa-plus"></i> {{ $t('products.addFeature') }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Category Attributes Card -->
              <div v-if="categoryAttributes.length > 0" class="info-card">
                <div class="card-header-custom">
                  <h3><i class="fas fa-sliders-h"></i> {{ $t('products.productAttributes') }}</h3>
                </div>
                <div class="card-body-custom">
                  <div class="row">
                    <div v-for="attr in categoryAttributes" :key="attr.name" class="col-md-6">
                      <div class="form-group">
                        <label class="form-label">{{ attr.name }}</label>
                        <input 
                          v-if="attr.type === 'text'"
                          v-model="formData.specifications[attr.name]" 
                          type="text" 
                          class="form-control-custom" 
                          :placeholder="'Enter ' + attr.name"
                        >
                        <input 
                          v-else-if="attr.type === 'number'"
                          v-model="formData.specifications[attr.name]" 
                          type="number" 
                          class="form-control-custom" 
                          :placeholder="'Enter ' + attr.name"
                        >
                        <select 
                          v-else-if="attr.type === 'select'"
                          v-model="formData.specifications[attr.name]" 
                          class="form-control-custom"
                        >
                          <option value="">Select {{ attr.name }}</option>
                          <option v-for="option in attr.options" :key="option" :value="option">{{ option }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Pricing Card -->
              <div class="info-card">
                <div class="card-header-custom">
                  <h3><i class="fas fa-dollar-sign"></i> {{ $t('products.pricing') }}</h3>
                </div>
                <div class="card-body-custom">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">{{ $t('products.price') }} <span class="required">*</span></label>
                        <div class="input-with-icon">
                          <span class="input-icon">$</span>
                          <input 
                            v-model.number="formData.price" 
                            type="number" 
                            step="0.01"
                            class="form-control-custom with-icon" 
                            placeholder="299.99"
                            required
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">{{ $t('products.oldPrice') }}</label>
                        <div class="input-with-icon">
                          <span class="input-icon">$</span>
                          <input 
                            v-model.number="formData.oldPrice" 
                            type="number" 
                            step="0.01"
                            class="form-control-custom with-icon" 
                            placeholder="399.99"
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label class="form-label">{{ $t('products.stock') }} <span class="required">*</span></label>
                        <input 
                          v-model.number="formData.stock" 
                          type="number" 
                          class="form-control-custom" 
                          placeholder="45"
                          required
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Images Card -->
              <div class="info-card">
                <div class="card-header-custom">
                  <h3><i class="fas fa-images"></i> {{ $t('products.productImages') }}</h3>
                </div>
                <div class="card-body-custom">
                  <div class="images-grid">
                    <div v-for="(image, index) in formData.images" :key="index" class="image-upload-item">
                      <div v-if="image" class="image-preview">
                        <img :src="image" :alt="`Image ${index + 1}`">
                        <button type="button" @click="removeImage(index)" class="btn-remove-image">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                      <div v-else class="image-placeholder">
                        <i class="fas fa-image"></i>
                        <input 
                          type="text" 
                          v-model="formData.images[index]" 
                          class="form-control-custom mt-2" 
                          :placeholder="$t('products.imageUrl')"
                        >
                      </div>
                    </div>
                  </div>
                  <button type="button" @click="addImageSlot" class="btn-add-feature mt-3">
                    <i class="fas fa-plus"></i> {{ $t('products.addImage') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Right Column - Additional Info -->
            <div class="col-lg-4">
              <!-- Status Card -->
              <div class="info-card">
                <div class="card-header-custom">
                  <h3><i class="fas fa-toggle-on"></i> {{ $t('products.status') }}</h3>
                </div>
                <div class="card-body-custom">
                  <div class="form-group">
                    <label class="form-label">{{ $t('products.badge') }}</label>
                    <select v-model="formData.badge" class="form-control-custom">
                      <option value="">{{ $t('products.noBadge') }}</option>
                      <option value="Sale">Sale</option>
                      <option value="New">New</option>
                      <option value="Hot">Hot</option>
                      <option value="Best Seller">Best Seller</option>
                      <option value="Organic">Organic</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">{{ $t('products.rating') }}</label>
                    <select v-model.number="formData.rating" class="form-control-custom">
                      <option :value="5">⭐⭐⭐⭐⭐ (5)</option>
                      <option :value="4">⭐⭐⭐⭐ (4)</option>
                      <option :value="3">⭐⭐⭐ (3)</option>
                      <option :value="2">⭐⭐ (2)</option>
                      <option :value="1">⭐ (1)</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Tags Card -->
              <div class="info-card">
                <div class="card-header-custom">
                  <h3><i class="fas fa-tags"></i> {{ $t('products.tags') }}</h3>
                </div>
                <div class="card-body-custom">
                  <div class="tags-input-wrapper">
                    <div class="tags-display">
                      <span v-for="(tag, index) in formData.tags" :key="index" class="tag-item">
                        {{ tag }}
                        <button type="button" @click="removeTag(index)" class="tag-remove">
                          <i class="fas fa-times"></i>
                        </button>
                      </span>
                    </div>
                    <div class="tag-input-group">
                      <input 
                        v-model="newTag" 
                        type="text" 
                        class="form-control-custom" 
                        :placeholder="$t('products.addTag')"
                        @keyup.enter="addTag"
                      >
                      <button type="button" @click="addTag" class="btn-add-tag">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="action-buttons">
                <button type="submit" class="btn-save">
                  <i class="fas fa-save"></i> {{ $t('products.saveProduct') }}
                </button>
                <button type="button" @click="handleCancel" class="btn-cancel">
                  <i class="fas fa-times"></i> {{ $t('common.cancel') }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const isEditMode = ref(false)
const newTag = ref('')
const selectedCategoryId = ref(null)

const formData = ref({
  name: '',
  category: '',
  sku: '',
  description: '',
  features: [''],
  price: 0,
  oldPrice: 0,
  stock: 0,
  images: ['', '', '', ''],
  badge: '',
  rating: 5,
  tags: [],
  specifications: {}
})

// Categories with attributes (same as CategoryList)
const categories = ref([
  {
    id: 1,
    name: 'Electronics',
    attributes: [
      { name: 'Brand', type: 'text', options: [] },
      { name: 'Model', type: 'text', options: [] },
      { name: 'Warranty', type: 'text', options: [] },
      { name: 'Storage', type: 'select', options: ['64GB', '128GB', '256GB', '512GB', '1TB'] }
    ]
  },
  {
    id: 2,
    name: 'Clothing',
    attributes: [
      { name: 'Size', type: 'select', options: ['S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Color', type: 'text', options: [] },
      { name: 'Material', type: 'select', options: ['Cotton', 'Polyester', 'Silk', 'Wool', 'Leather'] },
      { name: 'Brand', type: 'text', options: [] }
    ]
  },
  {
    id: 3,
    name: 'Books',
    attributes: [
      { name: 'Author', type: 'text', options: [] },
      { name: 'Publisher', type: 'text', options: [] },
      { name: 'Pages', type: 'number', options: [] },
      { name: 'Language', type: 'select', options: ['English', 'Russian', 'Uzbek', 'Spanish', 'French'] }
    ]
  },
  {
    id: 4,
    name: 'Food & Beverages',
    attributes: [
      { name: 'Weight', type: 'select', options: ['100g', '250g', '500g', '1kg', '2kg'] },
      { name: 'Expiry Date', type: 'text', options: [] },
      { name: 'Ingredients', type: 'text', options: [] },
      { name: 'Package Type', type: 'select', options: ['Bottle', 'Can', 'Box', 'Bag', 'Jar'] }
    ]
  }
])

// Get attributes for selected category
const categoryAttributes = computed(() => {
  if (!formData.value.category) return []
  const category = categories.value.find(c => c.id === formData.value.category)
  return category ? category.attributes : []
})

// Category change handler
const onCategoryChange = () => {
  // Reset specifications when category changes
  formData.value.specifications = {}
}

onMounted(() => {
  // Check if editing existing product
  if (route.params.id) {
    isEditMode.value = true
    loadProduct(route.params.id)
  }
})

const loadProduct = (id) => {
  // Simulate loading product data
  formData.value = {
    name: 'Wireless Headphones Pro',
    category: 1, // Electronics category ID
    sku: 'WH-PRO-001',
    description: 'Experience premium sound quality with our Wireless Headphones Pro. Featuring advanced noise-cancellation technology, 40-hour battery life, and premium comfort design.',
    features: [
      'Active Noise Cancellation (ANC)',
      '40-hour battery life',
      'Premium leather ear cushions',
      'Bluetooth 5.0 connectivity'
    ],
    price: 299.99,
    oldPrice: 399.99,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=600&fit=crop'
    ],
    badge: 'Sale',
    rating: 5,
    tags: ['Electronics', 'Audio', 'Wireless', 'Premium'],
    specifications: {
      'Brand': 'AudioTech Pro',
      'Model': 'WH-PRO-001',
      'Warranty': '2 years',
      'Power': '40W'
    }
  }
}

const addFeature = () => {
  formData.value.features.push('')
}

const removeFeature = (index) => {
  formData.value.features.splice(index, 1)
}

const addImageSlot = () => {
  formData.value.images.push('')
}

const removeImage = (index) => {
  formData.value.images[index] = ''
}

const addTag = () => {
  if (newTag.value.trim() && !formData.value.tags.includes(newTag.value.trim())) {
    formData.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index) => {
  formData.value.tags.splice(index, 1)
}

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  alert(t('products.productSaved'))
  router.push('/products')
}

const handleCancel = () => {
  if (confirm(t('products.cancelConfirm'))) {
    router.push('/products')
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

/* Info Card */
.info-card {
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
  margin-left: 3px;
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

.form-control-custom.with-icon {
  padding-left: 45px;
}

.input-with-icon {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  font-weight: 700;
  font-size: 16px;
}

/* Features List */
.features-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 15px;
}

.feature-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-remove {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.btn-remove:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(245, 87, 108, 0.3);
}

.btn-add-feature {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

.btn-add-feature:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

/* Images Grid */
.images-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 15px;
}

.image-upload-item {
  aspect-ratio: 1;
  border-radius: 15px;
  overflow: hidden;
  border: 2px dashed rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.image-upload-item:hover {
  border-color: #667eea;
}

.image-preview {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-remove-image {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  background: rgba(245, 87, 108, 0.9);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-remove-image:hover {
  background: #f5576c;
  transform: scale(1.1);
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 15px;
  background: rgba(102, 126, 234, 0.05);
}

.image-placeholder i {
  font-size: 40px;
  color: #667eea;
  opacity: 0.5;
  margin-bottom: 10px;
}

/* Tags */
.tags-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 40px;
}

.tag-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  animation: fadeIn 0.3s ease;
}

.tag-remove {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.tag-remove:hover {
  background: rgba(255, 255, 255, 0.2);
}

.tag-input-group {
  display: flex;
  gap: 10px;
}

.btn-add-tag {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.btn-add-tag:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: sticky;
  top: 20px;
}

.btn-save {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 15px 25px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-save:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
}

.btn-cancel {
  background: white;
  border: 2px solid rgba(102, 126, 234, 0.3);
  color: #667eea;
  padding: 15px 25px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-cancel:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
  transform: translateY(-2px);
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

/* Responsive */
@media (max-width: 768px) {
  .content-header {
    margin: 10px;
    padding: 15px !important;
  }

  .images-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    position: static;
  }
}
</style>
