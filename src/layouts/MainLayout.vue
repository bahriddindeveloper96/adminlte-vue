<template>
  <div class="wrapper">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-modern">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button">
            <i class="fas fa-bars"></i>
          </a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <a href="#" class="nav-link">Contact</a>
        </li>
      </ul>

      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <!-- Navbar Search -->
        <li class="nav-item">
          <a class="nav-link" data-widget="navbar-search" href="#" role="button">
            <i class="fas fa-search"></i>
          </a>
          <div class="navbar-search-block">
            <form class="form-inline">
              <div class="input-group input-group-sm">
                <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                <div class="input-group-append">
                  <button class="btn btn-navbar" type="submit">
                    <i class="fas fa-search"></i>
                  </button>
                  <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-modern elevation-4">
      <!-- Brand Logo -->
      <a href="/" class="brand-link brand-link-modern">
        <img src="../assets/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">AdminLTE 3</span>
      </a>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img src="../assets/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
          </div>
          <div class="info">
            <a href="#" class="d-block">Admin User</a>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
              <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>{{ $t('nav.dashboard') }}</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/widgets" class="nav-link" :class="{ active: $route.path === '/widgets' }">
                <i class="nav-icon fas fa-th"></i>
                <p>{{ $t('nav.widgets') }}</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/charts" class="nav-link" :class="{ active: $route.path === '/charts' }">
                <i class="nav-icon fas fa-chart-pie"></i>
                <p>{{ $t('nav.charts') }}</p>
              </router-link>
            </li>
            
            <!-- Forms Menu -->
            <li class="nav-item" :class="{ 'menu-open': $route.path.startsWith('/forms') }">
              <a href="#" class="nav-link" :class="{ active: $route.path.startsWith('/forms') }">
                <i class="nav-icon fas fa-edit"></i>
                <p>
                  {{ $t('nav.forms') }}
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/forms/general" class="nav-link" :class="{ active: $route.path === '/forms/general' }">
                    <i class="far fa-circle nav-icon"></i>
                    <p>{{ $t('nav.generalForms') }}</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/forms/advanced" class="nav-link" :class="{ active: $route.path === '/forms/advanced' }">
                    <i class="far fa-circle nav-icon"></i>
                    <p>{{ $t('nav.advancedForms') }}</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/forms/validation" class="nav-link" :class="{ active: $route.path === '/forms/validation' }">
                    <i class="far fa-circle nav-icon"></i>
                    <p>{{ $t('nav.validation') }}</p>
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- Tables Menu -->
            <li class="nav-item" :class="{ 'menu-open': $route.path.startsWith('/tables') }">
              <a href="#" class="nav-link" :class="{ active: $route.path.startsWith('/tables') }">
                <i class="nav-icon fas fa-table"></i>
                <p>
                  {{ $t('nav.tables') }}
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/tables/simple" class="nav-link" :class="{ active: $route.path === '/tables/simple' }">
                    <i class="far fa-circle nav-icon"></i>
                    <p>{{ $t('nav.simpleTables') }}</p>
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- Calendar -->
            <li class="nav-item">
              <router-link to="/calendar" class="nav-link" :class="{ active: $route.path === '/calendar' }">
                <i class="nav-icon far fa-calendar-alt"></i>
                <p>{{ $t('nav.calendar') }}</p>
              </router-link>
            </li>

            <!-- Gallery -->
            <li class="nav-item">
              <router-link to="/gallery" class="nav-link" :class="{ active: $route.path === '/gallery' }">
                <i class="nav-icon far fa-image"></i>
                <p>{{ $t('nav.gallery') }}</p>
              </router-link>
            </li>

            <!-- Contacts Menu -->
            <li class="nav-item" :class="{ 'menu-open': $route.path.startsWith('/contact') }">
              <a href="#" class="nav-link" :class="{ active: $route.path.startsWith('/contact') }">
                <i class="nav-icon fas fa-address-book"></i>
                <p>
                  {{ $t('nav.contacts') }}
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/contacts" class="nav-link" :class="{ active: $route.path === '/contacts' }">
                    <i class="far fa-circle nav-icon"></i>
                    <p>{{ $t('nav.contactsList') }}</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/contact-us" class="nav-link" :class="{ active: $route.path === '/contact-us' }">
                    <i class="far fa-circle nav-icon"></i>
                    <p>{{ $t('nav.contactUs') }}</p>
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- Examples Menu -->
            <li class="nav-item" :class="{ 'menu-open': $route.path.startsWith('/examples') }">
              <a href="#" class="nav-link" :class="{ active: $route.path.startsWith('/examples') }">
                <i class="nav-icon fas fa-book"></i>
                <p>
                  {{ $t('nav.examples') }}
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <router-link to="/examples/profile" class="nav-link" :class="{ active: $route.path === '/examples/profile' }">
                    <i class="far fa-circle nav-icon"></i>
                    <p>{{ $t('nav.profile') }}</p>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/examples/invoice" class="nav-link" :class="{ active: $route.path === '/examples/invoice' }">
                    <i class="far fa-circle nav-icon"></i>
                    <p>{{ $t('nav.invoice') }}</p>
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- Settings -->
            <li class="nav-item">
              <router-link to="/settings" class="nav-link" :class="{ active: $route.path === '/settings' }">
                <i class="nav-icon fas fa-cog"></i>
                <p>{{ $t('nav.settings') }}</p>
              </router-link>
            </li>

            <!-- Logout -->
            <li class="nav-item">
              <a @click="handleLogout" class="nav-link logout-link">
                <i class="nav-icon fas fa-sign-out-alt"></i>
                <p>{{ $t('nav.logout') }}</p>
              </a>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>

    <!-- Router View - Each page has its own content-wrapper -->
    <router-view></router-view>

    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; 2023 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
      All rights reserved.
      <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.2.0
      </div>
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<script>
export default {
  name: 'MainLayout',
  mounted() {
    // Initialize AdminLTE
    if (window.AdminLTE) {
      window.AdminLTE.init()
    }
  },
  watch: {
    // Watch for route changes
    '$route'() {
      // Close sidebar on mobile when route changes (with small delay to ensure navigation completes)
      this.$nextTick(() => {
        setTimeout(() => {
          this.closeSidebarOnMobile()
        }, 100)
      })
    }
  },
  methods: {
    handleLogout() {
      // Confirm logout
      if (confirm('Are you sure you want to logout?')) {
        // Clear any stored data (localStorage, sessionStorage, etc.)
        localStorage.clear()
        sessionStorage.clear()
        
        // Redirect to login page
        this.$router.push('/login')
      }
    },
    closeSidebarOnMobile() {
      // Check if we're on mobile (screen width < 992px)
      if (window.innerWidth < 992) {
        // Remove sidebar-open class from body
        document.body.classList.remove('sidebar-open')
        document.body.classList.add('sidebar-closed', 'sidebar-collapse')
        
        // Remove overlay if exists
        const overlay = document.querySelector('.sidebar-overlay')
        if (overlay) {
          overlay.remove()
        }
      }
    }
  }
}
</script>

<style scoped>
/* Modern Navbar Styling */
.navbar-modern {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  backdrop-filter: blur(10px);
}

.navbar-modern .nav-link {
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.navbar-modern .nav-link:hover {
  color: #fff !important;
  transform: translateY(-2px);
}

.navbar-modern .nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #fff;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.navbar-modern .nav-link:hover::after {
  width: 80%;
}

/* Modern Sidebar Styling */
.sidebar-modern {
  background: linear-gradient(180deg, #1e3c72 0%, #2a5298 50%, #667eea 100%);
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
}

.brand-link-modern {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.brand-link-modern:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(5px);
}

.brand-link-modern .brand-text {
  color: #fff !important;
  font-weight: 600;
  letter-spacing: 1px;
}

/* Sidebar Menu Styling */
.sidebar-modern .nav-sidebar .nav-link {
  color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  margin: 5px 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  pointer-events: auto !important;
  z-index: 1050 !important;
}

.sidebar-modern .nav-sidebar .nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.sidebar-modern .nav-sidebar .nav-link:hover::before {
  left: 100%;
}

.sidebar-modern .nav-sidebar .nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  transform: translateX(8px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.sidebar-modern .nav-sidebar .nav-link.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  font-weight: 600;
}

.sidebar-modern .nav-sidebar .nav-link .nav-icon {
  transition: all 0.3s ease;
}

.sidebar-modern .nav-sidebar .nav-link:hover .nav-icon {
  transform: scale(1.2) rotate(5deg);
}

/* User Panel Styling */
.sidebar-modern .user-panel {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.sidebar-modern .user-panel .info a {
  color: #fff;
  font-weight: 500;
  transition: all 0.3s ease;
}

.sidebar-modern .user-panel .info a:hover {
  color: #ffd700;
  transform: translateX(5px);
}

.sidebar-modern .user-panel .image img {
  border: 3px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.sidebar-modern .user-panel:hover .image img {
  border-color: #667eea;
  transform: scale(1.1);
}

/* Treeview Menu */
.sidebar-modern .nav-treeview .nav-link {
  color: rgba(255, 255, 255, 0.7);
  padding-left: 2.5rem;
}

.sidebar-modern .nav-treeview .nav-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

/* Footer Styling */
.main-footer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: rgba(255, 255, 255, 0.9);
  border-top: none;
  box-shadow: 0 -4px 20px rgba(102, 126, 234, 0.2);
}

.main-footer a {
  color: #fff;
  font-weight: 600;
  transition: all 0.3s ease;
}

.main-footer a:hover {
  color: #ffd700;
  text-decoration: none;
}

/* Wrapper Animation */
.wrapper {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Scrollbar Styling */
.sidebar-modern::-webkit-scrollbar {
  width: 6px;
}

.sidebar-modern::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar-modern::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

.sidebar-modern::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Logout Link Styling */
.logout-link {
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-link:hover {
  background: rgba(220, 53, 69, 0.15) !important;
  color: #dc3545 !important;
}

.logout-link .nav-icon {
  color: #dc3545;
}

/* Mobile Sidebar Fix - Ensure links are clickable */
@media (max-width: 991.98px) {
  .main-sidebar {
    z-index: 1040 !important;
  }
  
  .sidebar .nav-link {
    pointer-events: auto !important;
    cursor: pointer !important;
    z-index: 1050 !important;
  }
  
  .sidebar-overlay {
    z-index: 1039 !important;
  }
}
</style>
