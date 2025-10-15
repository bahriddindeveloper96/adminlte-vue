<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Validation Forms</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item active">Validation</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Quick Example <small>Bootstrap Validation</small></h3>
              </div>
              <form @submit.prevent="handleSubmit">
                <div class="card-body">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      :class="{'is-invalid': errors.email, 'is-valid': validated && !errors.email}"
                      id="exampleInputEmail1" 
                      v-model="formData.email"
                      placeholder="Enter email"
                      required
                    >
                    <span class="error invalid-feedback" v-if="errors.email">{{ errors.email }}</span>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input 
                      type="password" 
                      class="form-control" 
                      :class="{'is-invalid': errors.password, 'is-valid': validated && !errors.password}"
                      id="exampleInputPassword1" 
                      v-model="formData.password"
                      placeholder="Password"
                      required
                      minlength="6"
                    >
                    <span class="error invalid-feedback" v-if="errors.password">{{ errors.password }}</span>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputName">Name</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      :class="{'is-invalid': errors.name, 'is-valid': validated && !errors.name}"
                      id="exampleInputName" 
                      v-model="formData.name"
                      placeholder="Enter name"
                      required
                    >
                    <span class="error invalid-feedback" v-if="errors.name">{{ errors.name }}</span>
                  </div>
                  <div class="form-group mb-0">
                    <div class="custom-control custom-checkbox">
                      <input 
                        type="checkbox" 
                        class="custom-control-input" 
                        :class="{'is-invalid': errors.terms}"
                        id="exampleCheck1"
                        v-model="formData.terms"
                        required
                      >
                      <label class="custom-control-label" for="exampleCheck1">I agree to the <a href="#">terms of service</a>.</label>
                      <span class="error invalid-feedback d-block" v-if="errors.terms">{{ errors.terms }}</span>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>

          <div class="col-md-12">
            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">Different Height</h3>
              </div>
              <div class="card-body">
                <input class="form-control form-control-lg" type="text" placeholder=".form-control-lg">
                <br>
                <input class="form-control" type="text" placeholder="Default input">
                <br>
                <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formData = reactive({
  email: '',
  password: '',
  name: '',
  terms: false
})

const errors = reactive({
  email: '',
  password: '',
  name: '',
  terms: ''
})

const validated = ref(false)

const handleSubmit = () => {
  validated.value = true
  
  // Reset errors
  Object.keys(errors).forEach(key => errors[key] = '')
  
  // Validate email
  if (!formData.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid'
  }
  
  // Validate password
  if (!formData.password) {
    errors.password = 'Password is required'
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }
  
  // Validate name
  if (!formData.name) {
    errors.name = 'Name is required'
  }
  
  // Validate terms
  if (!formData.terms) {
    errors.terms = 'You must agree to the terms'
  }
  
  // Check if form is valid
  const isValid = !Object.values(errors).some(error => error !== '')
  
  if (isValid) {
    alert('Form submitted successfully!')
    console.log('Form data:', formData)
  }
}
</script>
