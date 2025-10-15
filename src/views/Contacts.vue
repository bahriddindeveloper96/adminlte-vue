<template>
  <div class="content-wrapper">
    <!-- Content Header -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Contacts & Chat</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item active">Contacts</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <!-- Contacts List -->
          <div class="col-md-4">
            <div class="card contacts-card">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="fas fa-users"></i> Contacts
                </h3>
                <div class="card-tools">
                  <button class="btn btn-sm btn-primary" @click="showAddContact = true">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div class="card-body p-0">
                <!-- Search -->
                <div class="search-box">
                  <input
                    type="text"
                    v-model="searchQuery"
                    class="form-control"
                    placeholder="Search contacts..."
                  />
                  <i class="fas fa-search"></i>
                </div>

                <!-- Contacts List -->
                <div class="contacts-list">
                  <div
                    v-for="contact in filteredContacts"
                    :key="contact.id"
                    class="contact-item"
                    :class="{ active: selectedContact?.id === contact.id }"
                    @click="selectContact(contact)"
                  >
                    <div class="contact-avatar">
                      <img :src="contact.avatar" :alt="contact.name" />
                      <span class="status-badge" :class="contact.status"></span>
                    </div>
                    <div class="contact-info">
                      <h4>{{ contact.name }}</h4>
                      <p>{{ contact.lastMessage }}</p>
                    </div>
                    <div class="contact-meta">
                      <span class="time">{{ contact.time }}</span>
                      <span v-if="contact.unread" class="badge badge-primary">{{ contact.unread }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Area -->
          <div class="col-md-8">
            <div class="card chat-card">
              <!-- Chat Header -->
              <div class="chat-header" v-if="selectedContact">
                <div class="chat-user-info">
                  <div class="contact-avatar">
                    <img :src="selectedContact.avatar" :alt="selectedContact.name" />
                    <span class="status-badge" :class="selectedContact.status"></span>
                  </div>
                  <div>
                    <h4>{{ selectedContact.name }}</h4>
                    <p class="status-text">{{ selectedContact.status === 'online' ? 'Online' : 'Offline' }}</p>
                  </div>
                </div>
                <div class="chat-actions">
                  <button class="btn-icon"><i class="fas fa-phone"></i></button>
                  <button class="btn-icon"><i class="fas fa-video"></i></button>
                  <button class="btn-icon"><i class="fas fa-ellipsis-v"></i></button>
                </div>
              </div>

              <!-- Chat Messages -->
              <div class="chat-messages" ref="chatMessages">
                <div v-if="!selectedContact" class="no-chat-selected">
                  <i class="fas fa-comments"></i>
                  <h3>Select a contact to start chatting</h3>
                </div>
                <div v-else>
                  <div
                    v-for="message in messages"
                    :key="message.id"
                    class="message"
                    :class="{ sent: message.sent, received: !message.sent }"
                  >
                    <div class="message-content">
                      <p>{{ message.text }}</p>
                      <span class="message-time">{{ message.time }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Chat Input -->
              <div class="chat-input" v-if="selectedContact">
                <button class="btn-icon"><i class="fas fa-paperclip"></i></button>
                <input
                  type="text"
                  v-model="newMessage"
                  @keyup.enter="sendMessage"
                  class="form-control"
                  placeholder="Type a message..."
                />
                <button class="btn-icon"><i class="fas fa-smile"></i></button>
                <button class="btn-send" @click="sendMessage">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Contacts',
  data() {
    return {
      searchQuery: '',
      selectedContact: null,
      newMessage: '',
      showAddContact: false,
      contacts: [
        {
          id: 1,
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?img=1',
          status: 'online',
          lastMessage: 'Hey! How are you?',
          time: '2m',
          unread: 3
        },
        {
          id: 2,
          name: 'Sarah Smith',
          avatar: 'https://i.pravatar.cc/150?img=5',
          status: 'online',
          lastMessage: 'See you tomorrow!',
          time: '15m',
          unread: 0
        },
        {
          id: 3,
          name: 'Mike Johnson',
          avatar: 'https://i.pravatar.cc/150?img=3',
          status: 'offline',
          lastMessage: 'Thanks for the help',
          time: '1h',
          unread: 0
        },
        {
          id: 4,
          name: 'Emily Davis',
          avatar: 'https://i.pravatar.cc/150?img=9',
          status: 'online',
          lastMessage: 'Can you send me the files?',
          time: '2h',
          unread: 1
        },
        {
          id: 5,
          name: 'David Wilson',
          avatar: 'https://i.pravatar.cc/150?img=7',
          status: 'offline',
          lastMessage: 'Great work on the project!',
          time: '1d',
          unread: 0
        }
      ],
      messages: []
    }
  },
  computed: {
    filteredContacts() {
      if (!this.searchQuery) return this.contacts
      return this.contacts.filter(contact =>
        contact.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  methods: {
    selectContact(contact) {
      this.selectedContact = contact
      this.loadMessages(contact.id)
    },
    loadMessages(contactId) {
      // Simulate loading messages
      this.messages = [
        {
          id: 1,
          text: 'Hey! How are you doing?',
          time: '10:30 AM',
          sent: false
        },
        {
          id: 2,
          text: 'I\'m doing great! Thanks for asking.',
          time: '10:32 AM',
          sent: true
        },
        {
          id: 3,
          text: 'That\'s awesome! Are you free for a meeting tomorrow?',
          time: '10:35 AM',
          sent: false
        },
        {
          id: 4,
          text: 'Yes, I\'m available. What time works for you?',
          time: '10:37 AM',
          sent: true
        }
      ]
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    sendMessage() {
      if (!this.newMessage.trim()) return

      const message = {
        id: Date.now(),
        text: this.newMessage,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        sent: true
      }

      this.messages.push(message)
      this.newMessage = ''

      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    scrollToBottom() {
      const chatMessages = this.$refs.chatMessages
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    }
  }
}
</script>

<style scoped>
/* Contacts Card */
.contacts-card {
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
}

.contacts-card .card-body {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Search Box */
.search-box {
  position: relative;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.search-box input {
  padding-left: 40px;
  border-radius: 25px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
}

.search-box input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-box i {
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
}

/* Contacts List */
.contacts-list {
  flex: 1;
  overflow-y: auto;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
}

.contact-item:hover {
  background: rgba(102, 126, 234, 0.05);
}

.contact-item.active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-left: 4px solid #667eea;
}

.contact-avatar {
  position: relative;
  margin-right: 15px;
  flex-shrink: 0;
}

.contact-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.status-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #fff;
}

.status-badge.online {
  background: #28a745;
}

.status-badge.offline {
  background: #6c757d;
}

.contact-info {
  flex: 1;
  min-width: 0;
}

.contact-info h4 {
  margin: 0 0 5px 0;
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.contact-info p {
  margin: 0;
  font-size: 13px;
  color: #6c757d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.contact-meta .time {
  font-size: 12px;
  color: #6c757d;
}

.contact-meta .badge {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 10px;
}

/* Chat Card */
.chat-card {
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
}

/* Chat Header */
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid rgba(102, 126, 234, 0.1);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
}

.chat-user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.chat-user-info h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.status-text {
  margin: 0;
  font-size: 13px;
  color: #28a745;
}

.chat-actions {
  display: flex;
  gap: 10px;
}

.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background: #667eea;
  color: #fff;
  transform: scale(1.1);
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f8f9fa;
}

.no-chat-selected {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.no-chat-selected i {
  font-size: 80px;
  margin-bottom: 20px;
  opacity: 0.3;
}

.no-chat-selected h3 {
  font-size: 20px;
  font-weight: 600;
}

/* Messages */
.message {
  display: flex;
  margin-bottom: 20px;
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.sent {
  justify-content: flex-end;
}

.message.received {
  justify-content: flex-start;
}

.message-content {
  max-width: 60%;
  padding: 12px 18px;
  border-radius: 18px;
  position: relative;
}

.message.sent .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-bottom-right-radius: 4px;
}

.message.received .message-content {
  background: #fff;
  color: #333;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.message-content p {
  margin: 0 0 5px 0;
  line-height: 1.5;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
}

/* Chat Input */
.chat-input {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-top: 2px solid rgba(102, 126, 234, 0.1);
  background: #fff;
}

.chat-input input {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.chat-input input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-send {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.btn-send:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Scrollbar */
.contacts-list::-webkit-scrollbar,
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.contacts-list::-webkit-scrollbar-track,
.chat-messages::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

.contacts-list::-webkit-scrollbar-thumb,
.chat-messages::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .contacts-card,
  .chat-card {
    height: auto;
    min-height: 500px;
  }

  .message-content {
    max-width: 80%;
  }
}
</style>
