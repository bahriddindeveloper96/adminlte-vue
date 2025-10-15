<template>
  <div class="content-wrapper">
    <!-- Content Header -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{ $t('settings.title') }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('breadcrumb.home') }}</router-link></li>
              <li class="breadcrumb-item active">{{ $t('breadcrumb.settings') }}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- Left Column - Profile Settings -->
          <div class="col-md-3">
            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img 
                    class="profile-user-img img-fluid img-circle"
                    :src="userProfile.avatar"
                    alt="User profile picture"
                  >
                </div>
                <h3 class="profile-username text-center">{{ userProfile.name }}</h3>
                <p class="text-muted text-center">{{ userProfile.role }}</p>
                
                <button class="btn btn-primary btn-block" @click="showUploadModal = true">
                  <i class="fas fa-camera mr-2"></i>{{ $t('settings.changePhoto') }}
                </button>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">{{ $t('settings.quickLinks') }}</h3>
              </div>
              <div class="card-body p-0">
                <ul class="nav nav-pills flex-column">
                  <li class="nav-item">
                    <a href="#" class="nav-link" @click.prevent="activeTab = 'profile'">
                      <i class="fas fa-user mr-2"></i> {{ $t('settings.profileSettings') }}
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link" @click.prevent="activeTab = 'security'">
                      <i class="fas fa-lock mr-2"></i> {{ $t('settings.security') }}
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link" @click.prevent="activeTab = 'notifications'">
                      <i class="fas fa-bell mr-2"></i> {{ $t('settings.notifications') }}
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link" @click.prevent="activeTab = 'privacy'">
                      <i class="fas fa-shield-alt mr-2"></i> {{ $t('settings.privacy') }}
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link" @click.prevent="activeTab = 'appearance'">
                      <i class="fas fa-palette mr-2"></i> {{ $t('settings.appearance') }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Right Column - Settings Tabs -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a 
                      class="nav-link" 
                      :class="{ active: activeTab === 'profile' }"
                      @click="activeTab = 'profile'"
                      href="#"
                    >
                      <i class="fas fa-user mr-2"></i>{{ $t('settings.profile.title') }}
                    </a>
                  </li>
                  <li class="nav-item">
                    <a 
                      class="nav-link" 
                      :class="{ active: activeTab === 'security' }"
                      @click="activeTab = 'security'"
                      href="#"
                    >
                      <i class="fas fa-lock mr-2"></i>{{ $t('settings.security.title') }}
                    </a>
                  </li>
                  <li class="nav-item">
                    <a 
                      class="nav-link" 
                      :class="{ active: activeTab === 'notifications' }"
                      @click="activeTab = 'notifications'"
                      href="#"
                    >
                      <i class="fas fa-bell mr-2"></i>{{ $t('settings.notifications.title') }}
                    </a>
                  </li>
                  <li class="nav-item">
                    <a 
                      class="nav-link" 
                      :class="{ active: activeTab === 'privacy' }"
                      @click="activeTab = 'privacy'"
                      href="#"
                    >
                      <i class="fas fa-shield-alt mr-2"></i>{{ $t('settings.privacy.title') }}
                    </a>
                  </li>
                  <li class="nav-item">
                    <a 
                      class="nav-link" 
                      :class="{ active: activeTab === 'appearance' }"
                      @click="activeTab = 'appearance'"
                      href="#"
                    >
                      <i class="fas fa-palette mr-2"></i>{{ $t('settings.appearance.title') }}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="card-body">
                <!-- Profile Settings Tab -->
                <div v-show="activeTab === 'profile'" class="tab-pane">
                  <form @submit.prevent="saveProfile">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="firstName">First Name</label>
                          <input 
                            type="text" 
                            class="form-control" 
                            id="firstName"
                            v-model="userProfile.firstName"
                            placeholder="Enter first name"
                          >
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="lastName">Last Name</label>
                          <input 
                            type="text" 
                            class="form-control" 
                            id="lastName"
                            v-model="userProfile.lastName"
                            placeholder="Enter last name"
                          >
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="email">Email</label>
                      <input 
                        type="email" 
                        class="form-control" 
                        id="email"
                        v-model="userProfile.email"
                        placeholder="Enter email"
                      >
                    </div>

                    <div class="form-group">
                      <label for="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        class="form-control" 
                        id="phone"
                        v-model="userProfile.phone"
                        placeholder="Enter phone number"
                      >
                    </div>

                    <div class="form-group">
                      <label for="bio">Bio</label>
                      <textarea 
                        class="form-control" 
                        id="bio"
                        rows="4"
                        v-model="userProfile.bio"
                        placeholder="Tell us about yourself"
                      ></textarea>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="country">Country</label>
                          <select class="form-control" id="country" v-model="userProfile.country">
                            <option value="">Select Country</option>
                            <option value="USA">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="UZ">Uzbekistan</option>
                            <option value="RU">Russia</option>
                            <option value="DE">Germany</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="timezone">Timezone</label>
                          <select class="form-control" id="timezone" v-model="userProfile.timezone">
                            <option value="">Select Timezone</option>
                            <option value="UTC">UTC</option>
                            <option value="EST">Eastern Time</option>
                            <option value="PST">Pacific Time</option>
                            <option value="GMT">GMT</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save mr-2"></i>Save Changes
                      </button>
                      <button type="button" class="btn btn-default ml-2" @click="resetProfile">
                        <i class="fas fa-undo mr-2"></i>Reset
                      </button>
                    </div>
                  </form>
                </div>

                <!-- Security Tab -->
                <div v-show="activeTab === 'security'" class="tab-pane">
                  <h5 class="mb-3">Change Password</h5>
                  <form @submit.prevent="changePassword">
                    <div class="form-group">
                      <label for="currentPassword">Current Password</label>
                      <input 
                        type="password" 
                        class="form-control" 
                        id="currentPassword"
                        v-model="security.currentPassword"
                        placeholder="Enter current password"
                      >
                    </div>

                    <div class="form-group">
                      <label for="newPassword">New Password</label>
                      <input 
                        type="password" 
                        class="form-control" 
                        id="newPassword"
                        v-model="security.newPassword"
                        placeholder="Enter new password"
                      >
                      <small class="form-text text-muted">
                        Password must be at least 8 characters long
                      </small>
                    </div>

                    <div class="form-group">
                      <label for="confirmPassword">Confirm New Password</label>
                      <input 
                        type="password" 
                        class="form-control" 
                        id="confirmPassword"
                        v-model="security.confirmPassword"
                        placeholder="Confirm new password"
                      >
                    </div>

                    <div class="form-group">
                      <button type="submit" class="btn btn-primary">
                        <i class="fas fa-key mr-2"></i>Update Password
                      </button>
                    </div>
                  </form>

                  <hr>

                  <h5 class="mb-3">Two-Factor Authentication</h5>
                  <div class="custom-control custom-switch mb-3">
                    <input 
                      type="checkbox" 
                      class="custom-control-input" 
                      id="twoFactorAuth"
                      v-model="security.twoFactorEnabled"
                    >
                    <label class="custom-control-label" for="twoFactorAuth">
                      Enable Two-Factor Authentication
                    </label>
                  </div>
                  <p class="text-muted">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>

                  <hr>

                  <h5 class="mb-3">Active Sessions</h5>
                  <div class="session-list">
                    <div v-for="session in security.sessions" :key="session.id" class="session-item">
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <i :class="session.icon" class="mr-2"></i>
                          <strong>{{ session.device }}</strong>
                          <p class="text-muted mb-0">{{ session.location }} • {{ session.lastActive }}</p>
                        </div>
                        <button class="btn btn-sm btn-danger" @click="revokeSession(session.id)">
                          <i class="fas fa-times"></i> Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Notifications Tab -->
                <div v-show="activeTab === 'notifications'" class="tab-pane">
                  <h5 class="mb-3">Email Notifications</h5>
                  <div class="notification-group">
                    <div class="custom-control custom-switch mb-3">
                      <input 
                        type="checkbox" 
                        class="custom-control-input" 
                        id="emailComments"
                        v-model="notifications.email.comments"
                      >
                      <label class="custom-control-label" for="emailComments">
                        Comments on your posts
                      </label>
                    </div>
                    <div class="custom-control custom-switch mb-3">
                      <input 
                        type="checkbox" 
                        class="custom-control-input" 
                        id="emailMessages"
                        v-model="notifications.email.messages"
                      >
                      <label class="custom-control-label" for="emailMessages">
                        New messages
                      </label>
                    </div>
                    <div class="custom-control custom-switch mb-3">
                      <input 
                        type="checkbox" 
                        class="custom-control-input" 
                        id="emailUpdates"
                        v-model="notifications.email.updates"
                      >
                      <label class="custom-control-label" for="emailUpdates">
                        Product updates
                      </label>
                    </div>
                    <div class="custom-control custom-switch mb-3">
                      <input 
                        type="checkbox" 
                        class="custom-control-input" 
                        id="emailNewsletter"
                        v-model="notifications.email.newsletter"
                      >
                      <label class="custom-control-label" for="emailNewsletter">
                        Weekly newsletter
                      </label>
                    </div>
                  </div>

                  <hr>

                  <h5 class="mb-3">Push Notifications</h5>
                  <div class="notification-group">
                    <div class="custom-control custom-switch mb-3">
                      <input 
                        type="checkbox" 
                        class="custom-control-input" 
                        id="pushMessages"
                        v-model="notifications.push.messages"
                      >
                      <label class="custom-control-label" for="pushMessages">
                        New messages
                      </label>
                    </div>
                    <div class="custom-control custom-switch mb-3">
                      <input 
                        type="checkbox" 
                        class="custom-control-input" 
                        id="pushAlerts"
                        v-model="notifications.push.alerts"
                      >
                      <label class="custom-control-label" for="pushAlerts">
                        System alerts
                      </label>
                    </div>
                  </div>

                  <div class="form-group mt-4">
                    <button class="btn btn-primary" @click="saveNotifications">
                      <i class="fas fa-save mr-2"></i>Save Preferences
                    </button>
                  </div>
                </div>

                <!-- Privacy Tab -->
                <div v-show="activeTab === 'privacy'" class="tab-pane">
                  <h5 class="mb-3">Profile Visibility</h5>
                  <div class="form-group">
                    <label>Who can see your profile?</label>
                    <div class="custom-control custom-radio">
                      <input 
                        type="radio" 
                        id="visibilityPublic" 
                        name="visibility" 
                        class="custom-control-input"
                        value="public"
                        v-model="privacy.profileVisibility"
                      >
                      <label class="custom-control-label" for="visibilityPublic">
                        Everyone
                      </label>
                    </div>
                    <div class="custom-control custom-radio">
                      <input 
                        type="radio" 
                        id="visibilityFriends" 
                        name="visibility" 
                        class="custom-control-input"
                        value="friends"
                        v-model="privacy.profileVisibility"
                      >
                      <label class="custom-control-label" for="visibilityFriends">
                        Friends only
                      </label>
                    </div>
                    <div class="custom-control custom-radio">
                      <input 
                        type="radio" 
                        id="visibilityPrivate" 
                        name="visibility" 
                        class="custom-control-input"
                        value="private"
                        v-model="privacy.profileVisibility"
                      >
                      <label class="custom-control-label" for="visibilityPrivate">
                        Only me
                      </label>
                    </div>
                  </div>

                  <hr>

                  <h5 class="mb-3">Data & Privacy</h5>
                  <div class="custom-control custom-switch mb-3">
                    <input 
                      type="checkbox" 
                      class="custom-control-input" 
                      id="showOnline"
                      v-model="privacy.showOnlineStatus"
                    >
                    <label class="custom-control-label" for="showOnline">
                      Show online status
                    </label>
                  </div>
                  <div class="custom-control custom-switch mb-3">
                    <input 
                      type="checkbox" 
                      class="custom-control-input" 
                      id="showActivity"
                      v-model="privacy.showActivity"
                    >
                    <label class="custom-control-label" for="showActivity">
                      Show activity status
                    </label>
                  </div>
                  <div class="custom-control custom-switch mb-3">
                    <input 
                      type="checkbox" 
                      class="custom-control-input" 
                      id="allowTagging"
                      v-model="privacy.allowTagging"
                    >
                    <label class="custom-control-label" for="allowTagging">
                      Allow others to tag you
                    </label>
                  </div>

                  <hr>

                  <h5 class="mb-3">Data Management</h5>
                  <div class="data-management">
                    <button class="btn btn-info mb-2">
                      <i class="fas fa-download mr-2"></i>Download Your Data
                    </button>
                    <p class="text-muted">Download a copy of your data</p>
                    
                    <button class="btn btn-danger">
                      <i class="fas fa-trash mr-2"></i>Delete Account
                    </button>
                    <p class="text-muted">Permanently delete your account and all data</p>
                  </div>

                  <div class="form-group mt-4">
                    <button class="btn btn-primary" @click="savePrivacy">
                      <i class="fas fa-save mr-2"></i>Save Settings
                    </button>
                  </div>
                </div>

                <!-- Appearance Tab -->
                <div v-show="activeTab === 'appearance'" class="tab-pane">
                  <h5 class="mb-3">Theme Settings</h5>
                  <div class="theme-selector">
                    <div class="row">
                      <div class="col-md-4 mb-3">
                        <div 
                          class="theme-card" 
                          :class="{ active: appearance.theme === 'light' }"
                          @click="selectTheme('light')"
                        >
                          <div class="theme-preview light-theme">
                            <div class="preview-header"></div>
                            <div class="preview-body">
                              <div class="preview-sidebar"></div>
                              <div class="preview-content"></div>
                            </div>
                          </div>
                          <div class="theme-info">
                            <i class="fas fa-sun mr-2"></i>
                            <strong>Light Theme</strong>
                            <p class="text-muted mb-0">Clean and bright interface</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 mb-3">
                        <div 
                          class="theme-card" 
                          :class="{ active: appearance.theme === 'dark' }"
                          @click="selectTheme('dark')"
                        >
                          <div class="theme-preview dark-theme">
                            <div class="preview-header"></div>
                            <div class="preview-body">
                              <div class="preview-sidebar"></div>
                              <div class="preview-content"></div>
                            </div>
                          </div>
                          <div class="theme-info">
                            <i class="fas fa-moon mr-2"></i>
                            <strong>Dark Theme</strong>
                            <p class="text-muted mb-0">Easy on the eyes</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4 mb-3">
                        <div 
                          class="theme-card" 
                          :class="{ active: appearance.theme === 'auto' }"
                          @click="selectTheme('auto')"
                        >
                          <div class="theme-preview auto-theme">
                            <div class="preview-header"></div>
                            <div class="preview-body">
                              <div class="preview-sidebar"></div>
                              <div class="preview-content"></div>
                            </div>
                          </div>
                          <div class="theme-info">
                            <i class="fas fa-adjust mr-2"></i>
                            <strong>Auto Theme</strong>
                            <p class="text-muted mb-0">Matches system settings</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr>

                  <h5 class="mb-3">Color Scheme</h5>
                  <div class="color-schemes">
                    <div class="row">
                      <div 
                        v-for="color in colorSchemes" 
                        :key="color.name"
                        class="col-md-3 col-6 mb-3"
                      >
                        <div 
                          class="color-scheme-card"
                          :class="{ active: appearance.colorScheme === color.name }"
                          @click="selectColorScheme(color.name)"
                        >
                          <div class="color-preview" :style="{ background: color.gradient }"></div>
                          <p class="mb-0 mt-2 text-center">{{ color.label }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr>

                  <h5 class="mb-3">Language Settings</h5>
                  <div class="form-group">
                    <label for="language">Select Language</label>
                    <select 
                      class="form-control" 
                      id="language" 
                      v-model="appearance.language"
                      @change="changeLanguage"
                    >
                      <option value="en">🇺🇸 English</option>
                      <option value="uz">🇺🇿 O'zbekcha</option>
                      <option value="ru">🇷🇺 Русский</option>
                      <option value="es">🇪🇸 Español</option>
                      <option value="fr">🇫🇷 Français</option>
                      <option value="de">🇩🇪 Deutsch</option>
                      <option value="zh">🇨🇳 中文</option>
                      <option value="ar">🇸🇦 العربية</option>
                    </select>
                    <small class="form-text text-muted">
                      Choose your preferred language for the interface
                    </small>
                  </div>

                  <hr>

                  <h5 class="mb-3">Display Settings</h5>
                  <div class="form-group">
                    <label for="fontSize">Font Size</label>
                    <select class="form-control" id="fontSize" v-model="appearance.fontSize">
                      <option value="small">Small</option>
                      <option value="medium">Medium (Default)</option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                    </select>
                  </div>

                  <div class="custom-control custom-switch mb-3">
                    <input 
                      type="checkbox" 
                      class="custom-control-input" 
                      id="compactMode"
                      v-model="appearance.compactMode"
                    >
                    <label class="custom-control-label" for="compactMode">
                      Compact Mode
                    </label>
                    <small class="form-text text-muted">
                      Reduce spacing for a more compact interface
                    </small>
                  </div>

                  <div class="custom-control custom-switch mb-3">
                    <input 
                      type="checkbox" 
                      class="custom-control-input" 
                      id="animations"
                      v-model="appearance.animations"
                    >
                    <label class="custom-control-label" for="animations">
                      Enable Animations
                    </label>
                    <small class="form-text text-muted">
                      Show smooth transitions and animations
                    </small>
                  </div>

                  <div class="form-group mt-4">
                    <button class="btn btn-primary" @click="saveAppearance">
                      <i class="fas fa-save mr-2"></i>Save Appearance Settings
                    </button>
                    <button class="btn btn-default ml-2" @click="resetAppearance">
                      <i class="fas fa-undo mr-2"></i>Reset to Default
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Alert -->
    <div v-if="showSuccessAlert" class="alert-overlay">
      <div class="alert alert-success alert-dismissible fade show custom-alert" role="alert">
        <i class="fas fa-check-circle mr-2"></i>
        <strong>Success!</strong> {{ successMessage }}
        <button type="button" class="close" @click="showSuccessAlert = false">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      activeTab: 'profile',
      showUploadModal: false,
      showSuccessAlert: false,
      successMessage: '',
      userProfile: {
        name: 'Alexander Pierce',
        role: 'Software Engineer',
        avatar: 'https://i.pravatar.cc/150?img=12',
        firstName: 'Alexander',
        lastName: 'Pierce',
        email: 'alexander.pierce@example.com',
        phone: '+1 234 567 8901',
        bio: 'Full Stack Developer with 5+ years of experience in building web applications.',
        country: 'USA',
        timezone: 'EST'
      },
      security: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: false,
        sessions: [
          {
            id: 1,
            device: 'Chrome on Windows',
            location: 'New York, USA',
            lastActive: '2 minutes ago',
            icon: 'fas fa-desktop'
          },
          {
            id: 2,
            device: 'Safari on iPhone',
            location: 'New York, USA',
            lastActive: '1 hour ago',
            icon: 'fas fa-mobile-alt'
          }
        ]
      },
      notifications: {
        email: {
          comments: true,
          messages: true,
          updates: false,
          newsletter: true
        },
        push: {
          messages: true,
          alerts: true
        }
      },
      privacy: {
        profileVisibility: 'public',
        showOnlineStatus: true,
        showActivity: true,
        allowTagging: true
      },
      appearance: {
        theme: 'light',
        colorScheme: 'purple',
        language: 'en',
        fontSize: 'medium',
        compactMode: false,
        animations: true
      },
      colorSchemes: [
        { name: 'purple', label: 'Purple', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { name: 'blue', label: 'Blue', gradient: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)' },
        { name: 'green', label: 'Green', gradient: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)' },
        { name: 'orange', label: 'Orange', gradient: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)' },
        { name: 'red', label: 'Red', gradient: 'linear-gradient(135deg, #F44336 0%, #D32F2F 100%)' },
        { name: 'pink', label: 'Pink', gradient: 'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)' },
        { name: 'teal', label: 'Teal', gradient: 'linear-gradient(135deg, #009688 0%, #00796B 100%)' },
        { name: 'indigo', label: 'Indigo', gradient: 'linear-gradient(135deg, #3F51B5 0%, #303F9F 100%)' }
      ]
    }
  },
  methods: {
    saveProfile() {
      this.successMessage = 'Profile settings saved successfully!'
      this.showSuccessAlert = true
      setTimeout(() => {
        this.showSuccessAlert = false
      }, 3000)
    },
    resetProfile() {
      // Reset to default values
      this.userProfile = {
        ...this.userProfile,
        firstName: 'Alexander',
        lastName: 'Pierce',
        email: 'alexander.pierce@example.com',
        phone: '+1 234 567 8901'
      }
    },
    changePassword() {
      if (this.security.newPassword !== this.security.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      this.successMessage = 'Password changed successfully!'
      this.showSuccessAlert = true
      this.security.currentPassword = ''
      this.security.newPassword = ''
      this.security.confirmPassword = ''
      setTimeout(() => {
        this.showSuccessAlert = false
      }, 3000)
    },
    revokeSession(sessionId) {
      this.security.sessions = this.security.sessions.filter(s => s.id !== sessionId)
      this.successMessage = 'Session revoked successfully!'
      this.showSuccessAlert = true
      setTimeout(() => {
        this.showSuccessAlert = false
      }, 3000)
    },
    saveNotifications() {
      this.successMessage = 'Notification preferences saved!'
      this.showSuccessAlert = true
      setTimeout(() => {
        this.showSuccessAlert = false
      }, 3000)
    },
    savePrivacy() {
      this.successMessage = 'Privacy settings saved!'
      this.showSuccessAlert = true
      setTimeout(() => {
        this.showSuccessAlert = false
      }, 3000)
    },
    selectTheme(theme) {
      this.appearance.theme = theme
      this.successMessage = `Theme changed to ${theme}!`
      this.showSuccessAlert = true
      setTimeout(() => {
        this.showSuccessAlert = false
      }, 2000)
      // Apply theme to body
      document.body.className = `theme-${theme}`
    },
    selectColorScheme(scheme) {
      this.appearance.colorScheme = scheme
      this.successMessage = `Color scheme changed to ${scheme}!`
      this.showSuccessAlert = true
      setTimeout(() => {
        this.showSuccessAlert = false
      }, 2000)
    },
    changeLanguage() {
      const languages = {
        en: 'English',
        uz: "O'zbekcha",
        ru: 'Русский',
        es: 'Español',
        fr: 'Français',
        de: 'Deutsch',
        zh: '中文',
        ar: 'العربية'
      }
      // Change i18n locale
      this.$i18n.locale = this.appearance.language
      // Save to localStorage
      localStorage.setItem('language', this.appearance.language)
      
      this.successMessage = `Language changed to ${languages[this.appearance.language]}!`
      this.showSuccessAlert = true
      setTimeout(() => {
        this.showSuccessAlert = false
      }, 2000)
    },
    saveAppearance() {
      this.successMessage = 'Appearance settings saved successfully!'
      this.showSuccessAlert = true
      setTimeout(() => {
        this.showSuccessAlert = false
      }, 3000)
      // Save to localStorage
      localStorage.setItem('appearance', JSON.stringify(this.appearance))
    },
    resetAppearance() {
      this.appearance = {
        theme: 'light',
        colorScheme: 'purple',
        language: 'en',
        fontSize: 'medium',
        compactMode: false,
        animations: true
      }
      this.successMessage = 'Appearance settings reset to default!'
      this.showSuccessAlert = true
      setTimeout(() => {
        this.showSuccessAlert = false
      }, 3000)
    }
  },
  mounted() {
    // Load saved appearance settings
    const savedAppearance = localStorage.getItem('appearance')
    if (savedAppearance) {
      this.appearance = JSON.parse(savedAppearance)
    }
    
    // Load saved language
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      this.appearance.language = savedLanguage
      this.$i18n.locale = savedLanguage
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

/* Profile Card */
.card-primary.card-outline {
  border-top: 3px solid #667eea;
}

.profile-user-img {
  width: 100px;
  height: 100px;
  border: 3px solid #fff;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}

.profile-user-img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.profile-username {
  font-size: 1.3rem;
  margin-top: 15px;
  font-weight: 600;
  color: #333;
}

/* Quick Links */
.nav-pills .nav-link {
  color: #6c757d;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin-bottom: 5px;
}

.nav-pills .nav-link:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  transform: translateX(5px);
}

/* Tabs */
.card-header .nav-pills .nav-link {
  border-radius: 10px;
  transition: all 0.3s ease;
  margin-right: 5px;
}

.card-header .nav-pills .nav-link.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.card-header .nav-pills .nav-link:not(.active):hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

/* Form Styles */
.form-control {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 15px;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Buttons */
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  padding: 10px 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.btn-default {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-default:hover {
  border-color: #667eea;
  color: #667eea;
}

/* Custom Switch */
.custom-control-input:checked ~ .custom-control-label::before {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
}

/* Session List */
.session-item {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.session-item:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
}

/* Notification Groups */
.notification-group {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

/* Data Management */
.data-management .btn {
  display: block;
  width: 100%;
  text-align: left;
  border-radius: 8px;
}

/* Alert Overlay */
.alert-overlay {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  animation: slideInRight 0.4s ease-out;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.custom-alert {
  min-width: 300px;
  border-radius: 10px;
  border: none;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.alert-success {
  background: linear-gradient(135deg, rgba(40, 167, 69, 0.1) 0%, rgba(32, 201, 151, 0.1) 100%);
  color: #28a745;
  border-left: 4px solid #28a745;
}

/* Animations */
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

.card {
  animation: fadeIn 0.5s ease-out;
}

/* Theme Cards */
.theme-card {
  border: 3px solid #e0e0e0;
  border-radius: 15px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fff;
}

.theme-card:hover {
  border-color: #667eea;
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
}

.theme-card.active {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.theme-preview {
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.preview-header {
  height: 20px;
  background: #667eea;
}

.preview-body {
  display: flex;
  height: 100px;
}

.preview-sidebar {
  width: 30%;
  background: #2c3e50;
}

.preview-content {
  flex: 1;
  background: #ecf0f1;
}

/* Light Theme Preview */
.light-theme .preview-sidebar {
  background: #f8f9fa;
}

.light-theme .preview-content {
  background: #ffffff;
}

/* Dark Theme Preview */
.dark-theme .preview-header {
  background: #1a1a1a;
}

.dark-theme .preview-sidebar {
  background: #2d2d2d;
}

.dark-theme .preview-content {
  background: #1a1a1a;
}

/* Auto Theme Preview */
.auto-theme .preview-sidebar {
  background: linear-gradient(180deg, #f8f9fa 0%, #2d2d2d 100%);
}

.auto-theme .preview-content {
  background: linear-gradient(180deg, #ffffff 0%, #1a1a1a 100%);
}

.theme-info {
  text-align: center;
}

.theme-info i {
  font-size: 24px;
  color: #667eea;
}

.theme-info strong {
  display: block;
  margin: 10px 0 5px;
  font-size: 16px;
  color: #333;
}

/* Color Scheme Cards */
.color-scheme-card {
  border: 3px solid #e0e0e0;
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.color-scheme-card:hover {
  border-color: #667eea;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.color-scheme-card.active {
  border-color: #667eea;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.color-preview {
  height: 60px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.color-scheme-card:hover .color-preview {
  transform: scale(1.1);
}

.color-scheme-card p {
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

/* Language Select */
#language {
  font-size: 16px;
  padding: 12px 15px;
}

#language option {
  padding: 10px;
  font-size: 15px;
}

/* Display Settings */
.custom-control-label {
  font-weight: 500;
  color: #333;
}

.form-text.text-muted {
  font-size: 13px;
  margin-top: 5px;
  display: block;
}

/* Responsive */
@media (max-width: 768px) {
  .col-md-3, .col-md-9 {
    max-width: 100%;
    flex: 0 0 100%;
  }
  
  .card-header .nav-pills {
    flex-wrap: wrap;
  }
  
  .card-header .nav-pills .nav-link {
    font-size: 14px;
    padding: 8px 12px;
  }
  
  .theme-card {
    margin-bottom: 15px;
  }
  
  .color-scheme-card {
    margin-bottom: 10px;
  }
}
</style>
