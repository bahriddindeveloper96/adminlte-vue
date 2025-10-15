<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-card">
        <!-- Logo Section -->
        <div class="register-logo">
          <div class="logo-circle">
            <i class="fas fa-user-plus"></i>
          </div>
          <h2>Create Account</h2>
          <p>Join us today and get started</p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-group">
            <label for="fullname">
              <i class="fas fa-user"></i> Full Name
            </label>
            <input
              type="text"
              id="fullname"
              v-model="formData.fullname"
              class="form-control"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">
              <i class="fas fa-envelope"></i> Email Address
            </label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">
              <i class="fas fa-lock"></i> Password
            </label>
            <div class="password-input">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="formData.password"
                class="form-control"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <div class="password-strength">
              <div class="strength-bar" :class="passwordStrength"></div>
            </div>
          </div>

          <div class="form-group">
            <label for="confirm-password">
              <i class="fas fa-lock"></i> Confirm Password
            </label>
            <div class="password-input">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirm-password"
                v-model="formData.confirmPassword"
                class="form-control"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                class="toggle-password"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <div class="terms-checkbox">
            <input type="checkbox" id="terms" v-model="formData.agreeTerms" required />
            <label for="terms">
              I agree to the <a href="#">Terms & Conditions</a>
            </label>
          </div>

          <button type="submit" class="btn-register" :disabled="loading || !formData.agreeTerms">
            <span v-if="!loading">
              <i class="fas fa-user-plus"></i> Create Account
            </span>
            <span v-else>
              <i class="fas fa-spinner fa-spin"></i> Creating...
            </span>
          </button>
        </form>

        <!-- Social Register -->
        <div class="social-register">
          <div class="divider">
            <span>Or sign up with</span>
          </div>
          <div class="social-buttons">
            <button class="social-btn google">
              <i class="fab fa-google"></i>
            </button>
            <button class="social-btn facebook">
              <i class="fab fa-facebook-f"></i>
            </button>
            <button class="social-btn github">
              <i class="fab fa-github"></i>
            </button>
          </div>
        </div>

        <!-- Login Link -->
        <div class="login-link">
          Already have an account?
          <router-link to="/login">Sign In</router-link>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="decoration decoration-1"></div>
      <div class="decoration decoration-2"></div>
      <div class="decoration decoration-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      formData: {
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      },
      showPassword: false,
      showConfirmPassword: false,
      loading: false
    }
  },
  computed: {
    passwordStrength() {
      const password = this.formData.password
      if (password.length === 0) return ''
      if (password.length < 6) return 'weak'
      if (password.length < 10) return 'medium'
      return 'strong'
    }
  },
  methods: {
    async handleRegister() {
      if (this.formData.password !== this.formData.confirmPassword) {
        alert('Passwords do not match!')
        return
      }

      this.loading = true
      
      // Simulate API call
      setTimeout(() => {
        console.log('Register data:', this.formData)
        // Redirect to login
        this.$router.push('/login')
        this.loading = false
      }, 1500)
    }
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.register-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 500px;
}

.register-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 50px 40px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.6s ease-out;
  max-height: 90vh;
  overflow-y: auto;
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
.register-logo {
  text-align: center;
  margin-bottom: 35px;
}

.logo-circle {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  color: #fff;
  box-shadow: 0 10px 30px rgba(240, 147, 251, 0.4);
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

.register-logo h2 {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.register-logo p {
  color: #6c757d;
  font-size: 14px;
}

/* Form Styling */
.register-form {
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.form-group label i {
  margin-right: 8px;
  color: #f093fb;
}

.form-control {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.form-control:focus {
  outline: none;
  border-color: #f093fb;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(240, 147, 251, 0.1);
}

/* Password Input */
.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  font-size: 18px;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #f093fb;
}

/* Password Strength */
.password-strength {
  margin-top: 8px;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.strength-bar {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-bar.weak {
  width: 33%;
  background: #dc3545;
}

.strength-bar.medium {
  width: 66%;
  background: #ffc107;
}

.strength-bar.strong {
  width: 100%;
  background: #28a745;
}

/* Terms Checkbox */
.terms-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 25px;
  font-size: 14px;
}

.terms-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-top: 2px;
  flex-shrink: 0;
}

.terms-checkbox label {
  cursor: pointer;
  color: #6c757d;
  line-height: 1.5;
}

.terms-checkbox a {
  color: #f093fb;
  text-decoration: none;
  font-weight: 600;
}

.terms-checkbox a:hover {
  color: #f5576c;
}

/* Register Button */
.btn-register {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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

.btn-register::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-register:hover::before {
  left: 100%;
}

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(240, 147, 251, 0.4);
}

.btn-register:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Social Register */
.social-register {
  margin-bottom: 25px;
}

.divider {
  text-align: center;
  margin: 25px 0 20px;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: #e0e0e0;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background: rgba(255, 255, 255, 0.95);
  padding: 0 15px;
  color: #6c757d;
  font-size: 14px;
}

.social-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-btn.google {
  color: #db4437;
}

.social-btn.facebook {
  color: #4267B2;
}

.social-btn.github {
  color: #333;
}

.social-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: currentColor;
}

/* Login Link */
.login-link {
  text-align: center;
  color: #6c757d;
  font-size: 14px;
}

.login-link a {
  color: #f093fb;
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #f5576c;
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
  left: -150px;
}

.decoration-2 {
  width: 200px;
  height: 200px;
  background: #fff;
  bottom: -100px;
  right: -100px;
  animation-delay: 2s;
}

.decoration-3 {
  width: 150px;
  height: 150px;
  background: #fff;
  top: 50%;
  right: -75px;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Scrollbar */
.register-card::-webkit-scrollbar {
  width: 6px;
}

.register-card::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.register-card::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 10px;
}

/* Responsive */
@media (max-width: 576px) {
  .register-card {
    padding: 40px 30px;
    border-radius: 20px;
  }

  .register-logo h2 {
    font-size: 24px;
  }

  .form-control {
    padding: 12px 16px;
  }
}
</style>
