<template>
  <div class="content-wrapper">
    <!-- Content Header -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">{{ product.name }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('breadcrumb.home') }}</router-link></li>
              <li class="breadcrumb-item"><router-link to="/products">{{ $t('products.title') }}</router-link></li>
              <li class="breadcrumb-item active">{{ product.name }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- Product Images -->
          <div class="col-lg-6">
            <div class="product-gallery-card">
              <div class="main-image-wrapper">
                <img :src="selectedImage" :alt="product.name" class="main-product-image">
                <div class="product-badge" :class="product.badgeClass">{{ product.badge }}</div>
              </div>
              <div class="thumbnail-gallery">
                <div 
                  v-for="(image, index) in product.images" 
                  :key="index"
                  class="thumbnail-item"
                  :class="{ active: selectedImage === image }"
                  @click="selectedImage = image"
                >
                  <img :src="image" :alt="`${product.name} ${index + 1}`">
                </div>
              </div>
            </div>
          </div>

          <!-- Product Details -->
          <div class="col-lg-6">
            <div class="product-details-card">
              <div class="product-header">
                <div class="product-category-badge">{{ product.category }}</div>
                <div class="product-rating">
                  <i v-for="star in 5" :key="star" class="fas fa-star" :class="{ filled: star <= product.rating }"></i>
                  <span class="rating-text">({{ product.reviews }} {{ $t('products.reviews') }})</span>
                </div>
              </div>

              <h2 class="product-title">{{ product.name }}</h2>
              
              <div class="product-price-section">
                <div class="price-wrapper">
                  <span class="current-price">${{ product.price }}</span>
                  <span v-if="product.oldPrice" class="old-price">${{ product.oldPrice }}</span>
                  <span v-if="product.oldPrice" class="discount-badge">
                    -{{ Math.round((1 - product.price / product.oldPrice) * 100) }}%
                  </span>
                </div>
                <div class="stock-info" :class="{ 'out-of-stock': product.stock === 0 }">
                  <i class="fas fa-box"></i>
                  <span v-if="product.stock > 0">{{ product.stock }} in stock</span>
                  <span v-else>Out of stock</span>
                </div>
              </div>

              <div class="product-description">
                <h3>{{ $t('products.description') }}</h3>
                <p>{{ product.fullDescription }}</p>
              </div>

              <div class="product-features">
                <h3>{{ $t('products.features') }}</h3>
                <ul>
                  <li v-for="(feature, index) in product.features" :key="index">
                    <i class="fas fa-check-circle"></i>
                    {{ feature }}
                  </li>
                </ul>
              </div>

              <div class="product-actions">
                <div class="quantity-selector">
                  <button @click="decreaseQuantity" class="qty-btn">
                    <i class="fas fa-minus"></i>
                  </button>
                  <input v-model.number="quantity" type="number" min="1" :max="product.stock" class="qty-input">
                  <button @click="increaseQuantity" class="qty-btn">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <button class="btn-add-to-cart" :disabled="product.stock === 0" @click="addToCart">
                  <i class="fas fa-shopping-cart"></i>
                  {{ product.stock > 0 ? $t('products.addToCart') : $t('products.outOfStock') }}
                </button>
                <button class="btn-wishlist" @click="toggleWishlist">
                  <i :class="isInWishlist ? 'fas fa-heart' : 'far fa-heart'"></i>
                </button>
              </div>

              <div class="product-meta">
                <div class="meta-item">
                  <span class="meta-label">SKU:</span>
                  <span class="meta-value">{{ product.sku }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">{{ $t('products.category') }}:</span>
                  <span class="meta-value">{{ product.category }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">{{ $t('products.tags') }}:</span>
                  <span class="meta-value">{{ product.tags.join(', ') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Tabs -->
        <div class="row mt-4">
          <div class="col-12">
            <div class="product-tabs-card">
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" data-toggle="tab" href="#specifications">
                    <i class="fas fa-list"></i> {{ $t('products.specifications') }}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#reviews">
                    <i class="fas fa-comments"></i> {{ $t('products.reviews') }} ({{ product.reviews }})
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#shipping">
                    <i class="fas fa-truck"></i> {{ $t('products.shipping') }}
                  </a>
                </li>
              </ul>

              <div class="tab-content">
                <div id="specifications" class="tab-pane fade show active">
                  <table class="specifications-table">
                    <tr v-for="(spec, index) in product.specifications" :key="index">
                      <td class="spec-label">{{ spec.label }}</td>
                      <td class="spec-value">{{ spec.value }}</td>
                    </tr>
                  </table>
                </div>

                <div id="reviews" class="tab-pane fade">
                  <div class="reviews-section">
                    <div v-for="review in product.customerReviews" :key="review.id" class="review-item">
                      <div class="review-header">
                        <img :src="review.avatar" :alt="review.name" class="review-avatar">
                        <div class="review-info">
                          <h4>{{ review.name }}</h4>
                          <div class="review-rating">
                            <i v-for="star in 5" :key="star" class="fas fa-star" :class="{ filled: star <= review.rating }"></i>
                          </div>
                          <span class="review-date">{{ review.date }}</span>
                        </div>
                      </div>
                      <p class="review-text">{{ review.comment }}</p>
                    </div>
                  </div>
                </div>

                <div id="shipping" class="tab-pane fade">
                  <div class="shipping-info">
                    <div class="shipping-item">
                      <i class="fas fa-shipping-fast"></i>
                      <div>
                        <h4>{{ $t('products.freeShipping') }}</h4>
                        <p>{{ $t('products.freeShippingDesc') }}</p>
                      </div>
                    </div>
                    <div class="shipping-item">
                      <i class="fas fa-undo"></i>
                      <div>
                        <h4>{{ $t('products.returns') }}</h4>
                        <p>{{ $t('products.returnsDesc') }}</p>
                      </div>
                    </div>
                    <div class="shipping-item">
                      <i class="fas fa-shield-alt"></i>
                      <div>
                        <h4>{{ $t('products.warranty') }}</h4>
                        <p>{{ $t('products.warrantyDesc') }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div class="row mt-4">
          <div class="col-12">
            <div class="related-products-card">
              <h3>{{ $t('products.relatedProducts') }}</h3>
              <div class="related-products-grid">
                <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" class="related-product-item">
                  <img :src="relatedProduct.image" :alt="relatedProduct.name">
                  <h4>{{ relatedProduct.name }}</h4>
                  <div class="related-price">${{ relatedProduct.price }}</div>
                  <button class="btn-view-product" @click="viewProduct(relatedProduct.id)">
                    {{ $t('products.view') }}
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const quantity = ref(1)
const isInWishlist = ref(false)

const product = ref({
  id: 1,
  name: 'Wireless Headphones Pro',
  category: 'Electronics',
  price: 299.99,
  oldPrice: 399.99,
  stock: 45,
  rating: 5,
  reviews: 128,
  sku: 'WH-PRO-001',
  badge: 'Sale',
  badgeClass: 'badge-sale',
  tags: ['Electronics', 'Audio', 'Wireless', 'Premium'],
  fullDescription: 'Experience premium sound quality with our Wireless Headphones Pro. Featuring advanced noise-cancellation technology, 40-hour battery life, and premium comfort design. Perfect for music lovers, travelers, and professionals who demand the best audio experience.',
  features: [
    'Active Noise Cancellation (ANC)',
    '40-hour battery life',
    'Premium leather ear cushions',
    'Bluetooth 5.0 connectivity',
    'Built-in microphone for calls',
    'Foldable design with carrying case'
  ],
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=600&fit=crop'
  ],
  specifications: [
    { label: 'Brand', value: 'AudioTech Pro' },
    { label: 'Model', value: 'WH-PRO-001' },
    { label: 'Color', value: 'Black' },
    { label: 'Connectivity', value: 'Bluetooth 5.0, 3.5mm Jack' },
    { label: 'Battery Life', value: '40 hours' },
    { label: 'Charging Time', value: '2 hours' },
    { label: 'Weight', value: '250g' },
    { label: 'Warranty', value: '2 years' },
    { label: 'Driver Size', value: '40mm' },
    { label: 'Frequency Response', value: '20Hz - 20kHz' },
    { label: 'Impedance', value: '32 Ohm' },
    { label: 'Sensitivity', value: '105 dB' },
    { label: 'Microphone', value: 'Built-in with noise reduction' },
    { label: 'Controls', value: 'Touch controls on ear cups' },
    { label: 'Codec Support', value: 'SBC, AAC, aptX, aptX HD' },
    { label: 'Operating Range', value: '10 meters (33 feet)' },
    { label: 'Charging Port', value: 'USB-C' },
    { label: 'Quick Charge', value: '10 min charge = 5 hours playback' },
    { label: 'Materials', value: 'Aluminum frame, Leather cushions' },
    { label: 'Foldable', value: 'Yes, with carrying case included' },
    { label: 'Voice Assistant', value: 'Compatible with Siri, Google Assistant' },
    { label: 'Multi-device Pairing', value: 'Connect up to 2 devices simultaneously' },
    { label: 'Dimensions (Folded)', value: '18 x 16 x 8 cm' },
    { label: 'Dimensions (Unfolded)', value: '20 x 18 x 8 cm' },
    { label: 'Package Contents', value: 'Headphones, USB-C cable, 3.5mm cable, Carrying case, User manual' },
    { label: 'Certifications', value: 'CE, FCC, RoHS' }
  ],
  customerReviews: [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      date: 'January 15, 2024',
      comment: 'Amazing sound quality! The noise cancellation works perfectly. Best headphones I\'ve ever owned.'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      date: 'January 10, 2024',
      comment: 'Very comfortable for long listening sessions. Battery life is incredible!'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      rating: 4,
      date: 'January 5, 2024',
      comment: 'Great product overall. Only minor issue is they\'re a bit heavy, but sound quality makes up for it.'
    }
  ]
})

const selectedImage = ref(product.value.images[0])

const relatedProducts = ref([
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
  },
  {
    id: 9,
    name: 'Laptop Pro 15"',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop'
  },
  {
    id: 10,
    name: 'Wireless Mouse',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop'
  },
  {
    id: 11,
    name: 'Mechanical Keyboard',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop'
  }
])

const increaseQuantity = () => {
  if (quantity.value < product.value.stock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  alert(`Added ${quantity.value} x ${product.value.name} to cart!`)
}

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value
  const message = isInWishlist.value ? 'Added to wishlist!' : 'Removed from wishlist!'
  alert(message)
}

const viewProduct = (productId) => {
  router.push(`/products/${productId}`)
  window.scrollTo(0, 0)
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

/* Product Gallery Card */
.product-gallery-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeInLeft 0.6s ease-out;
}

.main-image-wrapper {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.main-product-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.main-image-wrapper:hover .main-product-image {
  transform: scale(1.05);
}

.product-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.badge-sale {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

/* Thumbnail Gallery */
.thumbnail-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.thumbnail-item {
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.3s ease;
  height: 100px;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-item:hover {
  border-color: #667eea;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.thumbnail-item.active {
  border-color: #667eea;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Product Details Card */
.product-details-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeInRight 0.6s ease-out;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.product-category-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 5px;
}

.product-rating .fa-star {
  color: #ddd;
  font-size: 16px;
}

.product-rating .fa-star.filled {
  color: #ffc107;
}

.rating-text {
  color: #6c757d;
  font-size: 14px;
  margin-left: 5px;
}

.product-title {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
  line-height: 1.3;
}

/* Price Section */
.product-price-section {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.current-price {
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.old-price {
  font-size: 24px;
  color: #999;
  text-decoration: line-through;
}

.discount-badge {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 700;
}

.stock-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #28a745;
  font-weight: 600;
  font-size: 16px;
}

.stock-info.out-of-stock {
  color: #dc3545;
}

/* Product Description */
.product-description {
  margin-bottom: 25px;
}

.product-description h3,
.product-features h3 {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.product-description p {
  color: #6c757d;
  line-height: 1.8;
  font-size: 15px;
}

/* Product Features */
.product-features {
  margin-bottom: 30px;
}

.product-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-features li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  color: #2c3e50;
  font-size: 15px;
}

.product-features li i {
  color: #28a745;
  font-size: 18px;
}

/* Product Actions */
.product-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  align-items: center;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 12px;
  overflow: hidden;
}

.qty-btn {
  background: rgba(102, 126, 234, 0.1);
  border: none;
  width: 45px;
  height: 45px;
  cursor: pointer;
  color: #667eea;
  font-weight: 700;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.qty-input {
  width: 70px;
  height: 45px;
  border: none;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
}

.qty-input:focus {
  outline: none;
}

.btn-add-to-cart {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 14px 30px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.btn-add-to-cart:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
}

.btn-add-to-cart:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-wishlist {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  border: 2px solid rgba(102, 126, 234, 0.3);
  background: white;
  color: #667eea;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-wishlist:hover {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-color: transparent;
}

.btn-wishlist .fas {
  color: #f5576c;
}

/* Product Meta */
.product-meta {
  border-top: 2px solid rgba(102, 126, 234, 0.1);
  padding-top: 20px;
}

.meta-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.meta-label {
  font-weight: 700;
  color: #2c3e50;
  min-width: 100px;
}

.meta-value {
  color: #6c757d;
}

/* Product Tabs Card */
.product-tabs-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.8s ease-out;
}

.nav-tabs {
  border-bottom: 2px solid rgba(102, 126, 234, 0.2);
  margin-bottom: 25px;
}

.nav-tabs .nav-link {
  border: none;
  color: #6c757d;
  font-weight: 600;
  padding: 15px 25px;
  transition: all 0.3s ease;
  border-radius: 10px 10px 0 0;
}

.nav-tabs .nav-link:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.nav-tabs .nav-link.active {
  color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-bottom: 3px solid #667eea;
}

/* Specifications Table */
.specifications-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

.specifications-table tr {
  background: rgba(102, 126, 234, 0.05);
  transition: all 0.3s ease;
}

.specifications-table tr:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateX(5px);
}

.spec-label {
  font-weight: 700;
  color: #2c3e50;
  padding: 15px 20px;
  border-radius: 10px 0 0 10px;
  width: 30%;
}

.spec-value {
  color: #6c757d;
  padding: 15px 20px;
  border-radius: 0 10px 10px 0;
}

/* Reviews Section */
.reviews-section {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.review-item {
  background: rgba(102, 126, 234, 0.05);
  padding: 20px;
  border-radius: 15px;
  transition: all 0.3s ease;
}

.review-item:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateX(5px);
}

.review-header {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.review-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #667eea;
}

.review-info h4 {
  font-size: 16px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 5px;
}

.review-rating {
  display: flex;
  gap: 3px;
  margin-bottom: 5px;
}

.review-rating .fa-star {
  color: #ddd;
  font-size: 14px;
}

.review-rating .fa-star.filled {
  color: #ffc107;
}

.review-date {
  color: #6c757d;
  font-size: 13px;
}

.review-text {
  color: #2c3e50;
  line-height: 1.6;
  margin: 0;
}

/* Shipping Info */
.shipping-info {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.shipping-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 20px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 15px;
  transition: all 0.3s ease;
}

.shipping-item:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateX(5px);
}

.shipping-item i {
  font-size: 32px;
  color: #667eea;
  min-width: 40px;
}

.shipping-item h4 {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
}

.shipping-item p {
  color: #6c757d;
  margin: 0;
  line-height: 1.6;
}

/* Related Products Card */
.related-products-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 1s ease-out;
}

.related-products-card h3 {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.related-products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.related-product-item {
  background: rgba(102, 126, 234, 0.05);
  border-radius: 15px;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;
}

.related-product-item:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.related-product-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 12px;
}

.related-product-item h4 {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.related-price {
  font-size: 20px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
}

.btn-view-product {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-view-product:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

/* Animations */
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

/* Responsive */
@media (max-width: 992px) {
  .related-products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .content-header {
    margin: 10px;
    padding: 15px !important;
  }

  .product-title {
    font-size: 24px;
  }

  .current-price {
    font-size: 28px;
  }

  .main-product-image {
    height: 300px;
  }

  .thumbnail-gallery {
    grid-template-columns: repeat(3, 1fr);
  }

  .product-actions {
    flex-direction: column;
  }

  .btn-add-to-cart {
    width: 100%;
  }

  .related-products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
