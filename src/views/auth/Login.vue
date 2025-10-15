<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <!-- Logo Section -->
        <div class="login-logo">
          <div class="logo-circle">
            <i class="fas fa-user-shield"></i>
          </div>
          <h2>Welcome Back!</h2>
          <p>Sign in to continue to AdminLTE</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form">
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
                placeholder="Enter your password"
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
          </div>

          <div class="form-options">
            <div class="remember-me">
              <input type="checkbox" id="remember" v-model="formData.remember" />
              <label for="remember">Remember me</label>
            </div>
            <router-link to="/forgot-password" class="forgot-link">
              Forgot Password?
            </router-link>
          </div>

          <button type="submit" class="btn-login" :disabled="loading">
            <span v-if="!loading">
              <i class="fas fa-sign-in-alt"></i> Sign In
            </span>
            <span v-else>
              <i class="fas fa-spinner fa-spin"></i> Signing in...
            </span>
          </button>
        </form>

        <!-- Social Login -->
        <div class="social-login">
          <div class="divider">
            <span>Or continue with</span>
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

        <!-- Register Link -->
        <div class="register-link">
          Don't have an account?
          <router-link to="/register">Sign Up</router-link>
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
  name: 'Login',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        remember: false
      },
      showPassword: false,
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      
      // Simulate API call
      setTimeout(() => {
        console.log('Login data:', this.formData)
        // Redirect to dashboard
        this.$router.push('/')
        this.loading = false
      }, 1500)
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.login-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 450px;
}

.login-card {
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
.login-logo {
  text-align: center;
  margin-bottom: 40px;
}

.logo-circle {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35px;
  color: #fff;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
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

.login-logo h2 {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.login-logo p {
  color: #6c757d;
  font-size: 14px;
}

/* Form Styling */
.login-form {
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
  color: #667eea;
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
  border-color: #667eea;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
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
  color: #667eea;
}

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
}

.remember-me input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.remember-me label {
  cursor: pointer;
  color: #6c757d;
}

.forgot-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: #764ba2;
}

/* Login Button */
.btn-login {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

.btn-login::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.btn-login:hover::before {
  left: 100%;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Social Login */
.social-login {
  margin-bottom: 25px;
}

.divider {
  text-align: center;
  margin: 30px 0 20px;
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

/* Register Link */
.register-link {
  text-align: center;
  color: #6c757d;
  font-size: 14px;
}

.register-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #764ba2;
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

/* Responsive */
@media (max-width: 576px) {
  .login-card {
    padding: 40px 30px;
    border-radius: 20px;
  }

  .login-logo h2 {
    font-size: 24px;
  }

  .form-control {
    padding: 12px 16px;
  }
}
</style>
