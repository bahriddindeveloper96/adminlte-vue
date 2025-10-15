<template>
  <div class="content-wrapper">
    <!-- Content Header -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{ $t('contactUs.title') }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('breadcrumb.home') }}</router-link></li>
              <li class="breadcrumb-item active">{{ $t('breadcrumb.contactUs') }}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Default box -->
      <div class="card">
        <div class="card-body row">
          <div class="col-5 text-center d-flex align-items-center justify-content-center">
            <div class="company-info">
              <h2>Admin<strong>LTE</strong></h2>
              <p class="lead mb-5">
                123 Testing Ave, Testtown, 9876 NA<br>
                Phone: +1 234 56789012
              </p>
              <div class="social-links">
                <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div class="col-7">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="inputName">{{ $t('contactUs.name') }}</label>
                <input 
                  type="text" 
                  id="inputName" 
                  class="form-control" 
                  v-model="formData.name"
                  :placeholder="$t('contactUs.enterName')"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputEmail">{{ $t('contactUs.email') }}</label>
                <input 
                  type="email" 
                  id="inputEmail" 
                  class="form-control" 
                  v-model="formData.email"
                  :placeholder="$t('contactUs.enterEmail')"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputSubject">{{ $t('contactUs.subject') }}</label>
                <input 
                  type="text" 
                  id="inputSubject" 
                  class="form-control" 
                  v-model="formData.subject"
                  :placeholder="$t('contactUs.enterSubject')"
                  required
                />
              </div>
              <div class="form-group">
                <label for="inputMessage">{{ $t('contactUs.message') }}</label>
                <textarea 
                  id="inputMessage" 
                  class="form-control" 
                  rows="4"
                  v-model="formData.message"
                  :placeholder="$t('contactUs.enterMessage')"
                  required
                ></textarea>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary">
                  <i class="fas fa-paper-plane mr-2"></i>{{ $t('contactUs.sendMessage') }}
                </button>
              </div>
            </form>
            
            <!-- Success Message -->
            <div v-if="showSuccess" class="alert alert-success alert-dismissible fade show" role="alert">
              <i class="fas fa-check-circle mr-2"></i>
              <strong>{{ $t('contactUs.success') }}</strong> {{ $t('contactUs.messageSent') }}
              <button type="button" class="close" @click="showSuccess = false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      showSuccess: false
    }
  },
  methods: {
    submitForm() {
      // Simulate form submission
      console.log('Form submitted:', this.formData)
      
      // Show success message
      this.showSuccess = true
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        this.showSuccess = false
      }, 5000)
    }
  }
}
</script>

<style scoped>
/* Content Header */
.content-header h1 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
}

/* Card */
.card {
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Company Info */
.company-info {
  padding: 30px;
}

.company-info h2 {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 20px;
}

.company-info h2 strong {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.company-info .lead {
  font-size: 1.1rem;
  color: #6c757d;
  line-height: 1.8;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
}

.social-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 18px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  color: #fff;
}

/* Form Styles */
.form-group label {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.form-control {
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 12px 18px;
  transition: all 0.3s ease;
  font-size: 15px;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  outline: none;
}

.form-control::placeholder {
  color: #adb5bd;
}

textarea.form-control {
  resize: vertical;
  min-height: 120px;
}

/* Button */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 12px 35px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
}

.btn-primary:active {
  transform: translateY(-1px);
}

/* Alert */
.alert {
  border-radius: 10px;
  border: none;
  animation: slideDown 0.4s ease-out;
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

.alert-success {
  background: linear-gradient(135deg, rgba(40, 167, 69, 0.1) 0%, rgba(32, 201, 151, 0.1) 100%);
  color: #28a745;
  border-left: 4px solid #28a745;
}

/* Responsive */
@media (max-width: 768px) {
  .card-body.row {
    flex-direction: column;
  }
  
  .col-5, .col-7 {
    max-width: 100%;
    flex: 0 0 100%;
  }
  
  .company-info {
    margin-bottom: 30px;
  }
}
</style>
