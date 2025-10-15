<template>
  <div class="forgot-password-page">
    <div class="forgot-container">
      <div class="forgot-card">
        <!-- Logo Section -->
        <div class="forgot-logo">
          <div class="logo-circle">
            <i class="fas fa-key"></i>
          </div>
          <h2>Forgot Password?</h2>
          <p>No worries, we'll send you reset instructions</p>
        </div>

        <!-- Success Message -->
        <div v-if="emailSent" class="success-message">
          <i class="fas fa-check-circle"></i>
          <h3>Email Sent!</h3>
          <p>Check your email for password reset instructions.</p>
          <router-link to="/login" class="btn-back">
            <i class="fas fa-arrow-left"></i> Back to Login
          </router-link>
        </div>

        <!-- Forgot Password Form -->
        <form v-else @submit.prevent="handleForgotPassword" class="forgot-form">
          <div class="form-group">
            <label for="email">
              <i class="fas fa-envelope"></i> Email Address
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              placeholder="Enter your registered email"
              required
            />
          </div>

          <button type="submit" class="btn-reset" :disabled="loading">
            <span v-if="!loading">
              <i class="fas fa-paper-plane"></i> Send Reset Link
            </span>
            <span v-else>
              <i class="fas fa-spinner fa-spin"></i> Sending...
            </span>
          </button>
        </form>

        <!-- Back to Login -->
        <div v-if="!emailSent" class="login-link">
          <router-link to="/login">
            <i class="fas fa-arrow-left"></i> Back to Login
          </router-link>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="decoration decoration-1"></div>
      <div class="decoration decoration-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      loading: false,
      emailSent: false
    }
  },
  methods: {
    async handleForgotPassword() {
      this.loading = true
      
      // Simulate API call
      setTimeout(() => {
        console.log('Reset email sent to:', this.email)
        this.emailSent = true
        this.loading = false
      }, 1500)
    }
  }
}
</script>

<style scoped>
.forgot-password-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.forgot-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 450px;
}

.forgot-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 50px 40px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.6s ease-out;
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

/* Logo Section */
.forgot-logo {
  text-align: center;
  margin-bottom: 40px;
}

.logo-circle {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  color: #fff;
  box-shadow: 0 10px 30px rgba(79, 172, 254, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.forgot-logo h2 {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.forgot-logo p {
  color: #6c757d;
  font-size: 14px;
  line-height: 1.6;
}

/* Success Message */
.success-message {
  text-align: center;
  animation: fadeIn 0.5s ease-out;
}

.success-message i {
  font-size: 60px;
  color: #28a745;
  margin-bottom: 20px;
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.success-message h3 {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.success-message p {
  color: #6c757d;
  margin-bottom: 30px;
  line-height: 1.6;
}

.btn-back {
  display: inline-block;
  padding: 14px 30px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: #fff;
  text-decoration: none;
  border-radius: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-back:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(79, 172, 254, 0.4);
}

/* Form Styling */
.forgot-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.form-group label i {
  margin-right: 8px;
  color: #4facfe;
}

.form-control {
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.form-control:focus {
  outline: none;
  border-color: #4facfe;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(79, 172, 254, 0.1);
}

/* Reset Button */
.btn-reset {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: #fff;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-reset::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-reset:hover::before {
  left: 100%;
}

.btn-reset:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(79, 172, 254, 0.4);
}

.btn-reset:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Login Link */
.login-link {
  text-align: center;
}

.login-link a {
  color: #4facfe;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.login-link a:hover {
  color: #00f2fe;
}

/* Decorative Elements */
.decoration {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.decoration-1 {
  width: 300px;
  height: 300px;
  background: #fff;
  top: -150px;
  right: -150px;
}

.decoration-2 {
  width: 200px;
  height: 200px;
  background: #fff;
  bottom: -100px;
  left: -100px;
  animation-delay: 3s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
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
@media (max-width: 576px) {
  .forgot-card {
    padding: 40px 30px;
    border-radius: 20px;
  }

  .forgot-logo h2 {
    font-size: 24px;
  }

  .form-control {
    padding: 12px 16px;
  }
}
</style>
