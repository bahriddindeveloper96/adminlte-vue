<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">{{ $t('products.title') }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('breadcrumb.home') }}</router-link></li>
              <li class="breadcrumb-item active">{{ $t('products.title') }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Filter and Actions Row -->
        <div class="row mb-3">
          <div class="col-md-8">
            <div class="search-box">
              <i class="fas fa-search search-icon"></i>
              <input 
                v-model="searchQuery" 
                type="text" 
                class="form-control search-input" 
                :placeholder="$t('products.searchPlaceholder')"
              >
            </div>
          </div>
          <div class="col-md-4 text-right">
            <button class="btn btn-gradient-primary" @click="openAddProductModal">
              <i class="fas fa-plus mr-2"></i>{{ $t('products.addProduct') }}
            </button>
          </div>
        </div>

        <!-- Filter Chips -->
        <div class="row mb-3">
          <div class="col-12">
            <div class="filter-chips">
              <button 
                class="filter-chip" 
                :class="{ active: selectedCategory === 'all' }"
                @click="filterByCategory('all')"
              >
                {{ $t('products.allProducts') }}
              </button>
              <button 
                class="filter-chip" 
                :class="{ active: selectedCategory === 'electronics' }"
                @click="filterByCategory('electronics')"
              >
                <i class="fas fa-laptop mr-1"></i>{{ $t('products.electronics') }}
              </button>
              <button 
                class="filter-chip" 
                :class="{ active: selectedCategory === 'clothing' }"
                @click="filterByCategory('clothing')"
              >
                <i class="fas fa-tshirt mr-1"></i>{{ $t('products.clothing') }}
              </button>
              <button 
                class="filter-chip" 
                :class="{ active: selectedCategory === 'books' }"
                @click="filterByCategory('books')"
              >
                <i class="fas fa-book mr-1"></i>{{ $t('products.books') }}
              </button>
              <button 
                class="filter-chip" 
                :class="{ active: selectedCategory === 'food' }"
                @click="filterByCategory('food')"
              >
                <i class="fas fa-utensils mr-1"></i>{{ $t('products.food') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="row">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id" 
            class="col-lg-3 col-md-4 col-sm-6 mb-4"
          >
            <div class="product-card">
              <div class="product-image-wrapper">
                <img :src="product.image" :alt="product.name" class="product-image">
                <div class="product-badge" :class="product.badgeClass">{{ product.badge }}</div>
                <div class="product-actions">
                  <button class="action-btn" @click="viewProduct(product)" :title="$t('products.view')">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="action-btn" @click="editProduct(product)" :title="$t('products.edit')">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-btn delete-btn" @click="deleteProduct(product)" :title="$t('products.delete')">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div class="product-info">
                <div class="product-category">{{ product.category }}</div>
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-description">{{ product.description }}</p>
                <div class="product-rating">
                  <i v-for="star in 5" :key="star" class="fas fa-star" :class="{ filled: star <= product.rating }"></i>
                  <span class="rating-count">({{ product.reviews }})</span>
                </div>
                <div class="product-footer">
                  <div class="product-price">
                    <span class="current-price">${{ product.price }}</span>
                    <span v-if="product.oldPrice" class="old-price">${{ product.oldPrice }}</span>
                  </div>
                  <div class="product-stock" :class="{ 'out-of-stock': product.stock === 0 }">
                    <i class="fas fa-box"></i> {{ product.stock }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="empty-state">
          <i class="fas fa-box-open"></i>
          <h3>{{ $t('products.noProducts') }}</h3>
          <p>{{ $t('products.noProductsDesc') }}</p>
        </div>

        <!-- Pagination -->
        <div v-if="filteredProducts.length > 0" class="row mt-4">
          <div class="col-12">
            <nav class="pagination-wrapper">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
                </li>
              </ul>
            </nav>
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
const selectedCategory = ref('all')

// Sample products data
const products = ref([
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling headphones',
    category: 'Electronics',
    price: 299.99,
    oldPrice: 399.99,
    stock: 45,
    rating: 5,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    badge: 'Sale',
    badgeClass: 'badge-sale',
    categoryKey: 'electronics'
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking smartwatch',
    category: 'Electronics',
    price: 449.99,
    stock: 23,
    rating: 4,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    badge: 'New',
    badgeClass: 'badge-new',
    categoryKey: 'electronics'
  },
  {
    id: 3,
    name: 'Leather Jacket',
    description: 'Premium genuine leather jacket',
    category: 'Clothing',
    price: 199.99,
    stock: 12,
    rating: 5,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
    badge: 'Hot',
    badgeClass: 'badge-hot',
    categoryKey: 'clothing'
  },
  {
    id: 4,
    name: 'Running Shoes',
    description: 'Comfortable athletic running shoes',
    category: 'Clothing',
    price: 129.99,
    oldPrice: 159.99,
    stock: 67,
    rating: 4,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    badge: 'Sale',
    badgeClass: 'badge-sale',
    categoryKey: 'clothing'
  },
  {
    id: 5,
    name: 'JavaScript Guide',
    description: 'Complete JavaScript programming guide',
    category: 'Books',
    price: 39.99,
    stock: 156,
    rating: 5,
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
    badge: 'Best Seller',
    badgeClass: 'badge-bestseller',
    categoryKey: 'books'
  },
  {
    id: 6,
    name: 'Design Thinking',
    description: 'Modern design principles and practices',
    category: 'Books',
    price: 45.99,
    stock: 89,
    rating: 4,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
    badge: 'New',
    badgeClass: 'badge-new',
    categoryKey: 'books'
  },
  {
    id: 7,
    name: 'Organic Coffee Beans',
    description: 'Premium organic arabica coffee',
    category: 'Food',
    price: 24.99,
    stock: 234,
    rating: 5,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
    badge: 'Organic',
    badgeClass: 'badge-organic',
    categoryKey: 'food'
  },
  {
    id: 8,
    name: 'Dark Chocolate',
    description: 'Premium Belgian dark chocolate',
    category: 'Food',
    price: 12.99,
    stock: 0,
    rating: 5,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop',
    badge: 'Out of Stock',
    badgeClass: 'badge-out',
    categoryKey: 'food'
  },
  {
    id: 9,
    name: 'Laptop Pro 15"',
    description: 'High-performance laptop for professionals',
    category: 'Electronics',
    price: 1299.99,
    oldPrice: 1499.99,
    stock: 18,
    rating: 5,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    badge: 'Sale',
    badgeClass: 'badge-sale',
    categoryKey: 'electronics'
  },
  {
    id: 10,
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse',
    category: 'Electronics',
    price: 49.99,
    stock: 156,
    rating: 4,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    badge: 'Best Seller',
    badgeClass: 'badge-bestseller',
    categoryKey: 'electronics'
  },
  {
    id: 11,
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt',
    category: 'Clothing',
    price: 29.99,
    stock: 234,
    rating: 4,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    badge: 'New',
    badgeClass: 'badge-new',
    categoryKey: 'clothing'
  },
  {
    id: 12,
    name: 'Cookbook Collection',
    description: 'International cuisine cookbook set',
    category: 'Books',
    price: 59.99,
    stock: 45,
    rating: 5,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop',
    badge: 'Hot',
    badgeClass: 'badge-hot',
    categoryKey: 'books'
  }
])

// Computed filtered products
const filteredProducts = computed(() => {
  let filtered = products.value

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(p => p.categoryKey === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Methods
const filterByCategory = (category) => {
  selectedCategory.value = category
}

const openAddProductModal = () => {
  window.location.href = '/products/add'
}

const viewProduct = (product) => {
  console.log('View product:', product)
  // Navigate to product view page
  window.location.href = `/products/${product.id}`
}

const editProduct = (product) => {
  console.log('Edit product:', product)
  window.location.href = `/products/edit/${product.id}`
}

const deleteProduct = (product) => {
  if (confirm(`${t('products.deleteConfirm')} "${product.name}"?`)) {
    const index = products.value.findIndex(p => p.id === product.id)
    if (index > -1) {
      products.value.splice(index, 1)
      alert(t('products.deleteSuccess'))
    }
  }
}
</script>

<style scoped>
/* Content Wrapper */
.content-wrapper {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
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

/* Search Box */
.search-box {
  position: relative;
  animation: fadeInLeft 0.6s ease-out;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  font-size: 18px;
  z-index: 1;
}

.search-input {
  padding-left: 50px;
  height: 50px;
  border-radius: 25px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-size: 16px;
}

.search-input:focus {
  border-color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
  outline: none;
}

/* Gradient Button */
.btn-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 12px 30px;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  animation: fadeInRight 0.6s ease-out;
}

.btn-gradient-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
  color: white;
}

/* Filter Chips */
.filter-chips {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  animation: fadeIn 0.8s ease-out;
}

.filter-chip {
  padding: 10px 20px;
  border-radius: 20px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.filter-chip:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
}

.filter-chip.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

/* Product Card */
.product-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Product Image */
.product-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 250px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

/* Product Badge */
.product-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.badge-sale {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.badge-new {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.badge-hot {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
}

.badge-bestseller {
  background: linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%);
  color: #333;
}

.badge-organic {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  color: white;
}

.badge-out {
  background: linear-gradient(135deg, #a8a8a8 0%, #6c6c6c 100%);
  color: white;
}

/* Product Actions */
.product-actions {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 10px;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 3;
}

.product-card:hover .product-actions {
  opacity: 1;
}

.action-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.action-btn:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: scale(1.1);
}

.action-btn.delete-btn:hover {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* Product Info */
.product-info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-category {
  color: #667eea;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.product-name {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
  line-height: 1.3;
  min-height: 48px;
}

.product-description {
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 12px;
  line-height: 1.5;
  flex: 1;
}

/* Product Rating */
.product-rating {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
}

.product-rating .fa-star {
  color: #ddd;
  font-size: 14px;
}

.product-rating .fa-star.filled {
  color: #ffc107;
}

.rating-count {
  color: #6c757d;
  font-size: 13px;
  margin-left: 5px;
}

/* Product Footer */
.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 2px solid rgba(102, 126, 234, 0.1);
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
}

.current-price {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.old-price {
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
}

.product-stock {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #28a745;
  font-weight: 600;
  font-size: 14px;
}

.product-stock.out-of-stock {
  color: #dc3545;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  animation: fadeIn 0.8s ease-out;
}

.empty-state i {
  font-size: 80px;
  color: #667eea;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
}

.empty-state p {
  color: #6c757d;
  font-size: 16px;
}

/* Pagination */
.pagination-wrapper {
  animation: fadeIn 1s ease-out;
}

.pagination .page-link {
  border: 2px solid rgba(102, 126, 234, 0.2);
  color: #667eea;
  margin: 0 5px;
  border-radius: 10px;
  padding: 10px 18px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.pagination .page-link:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
}

.pagination .page-item.active .page-link {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

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

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .content-header {
    margin: 10px;
    padding: 15px !important;
  }

  .search-box {
    margin-bottom: 15px;
  }

  .btn-gradient-primary {
    width: 100%;
    margin-top: 10px;
  }

  .filter-chips {
    gap: 8px;
  }

  .filter-chip {
    padding: 8px 15px;
    font-size: 14px;
  }

  .product-card {
    margin-bottom: 20px;
  }

  .product-image-wrapper {
    height: 200px;
  }

  .current-price {
    font-size: 20px;
  }
}
</style>
