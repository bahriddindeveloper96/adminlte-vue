<template>
  <div class="content-wrapper">
    <!-- Content Header -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>{{ $t('contacts.title') }}</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">{{ $t('breadcrumb.home') }}</router-link></li>
              <li class="breadcrumb-item active">{{ $t('breadcrumb.contacts') }}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Default box -->
      <div class="card card-solid">
        <div class="card-body pb-0">
          <div class="row">
            <div 
              v-for="contact in contacts" 
              :key="contact.id" 
              class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column"
            >
              <div class="card bg-light d-flex flex-fill">
                <div class="card-header text-muted border-bottom-0">
                  {{ contact.position }}
                </div>
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-7">
                      <h2 class="lead"><b>{{ contact.name }}</b></h2>
                      <p class="text-muted text-sm"><b>About: </b>{{ contact.about }}</p>
                      <ul class="ml-4 mb-0 fa-ul text-muted">
                        <li class="small">
                          <span class="fa-li"><i class="fas fa-lg fa-building"></i></span> 
                          Address: {{ contact.address }}
                        </li>
                        <li class="small">
                          <span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> 
                          Phone: {{ contact.phone }}
                        </li>
                      </ul>
                    </div>
                    <div class="col-5 text-center">
                      <img :src="contact.avatar" alt="user-avatar" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    <a href="#" class="btn btn-sm bg-teal">
                      <i class="fas fa-comments"></i>
                    </a>
                    <a href="#" class="btn btn-sm btn-primary">
                      <i class="fas fa-user"></i> {{ $t('contacts.viewProfile') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <nav aria-label="Contacts Page Navigation">
            <ul class="pagination justify-content-center m-0">
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">4</a></li>
              <li class="page-item"><a class="page-link" href="#">5</a></li>
              <li class="page-item"><a class="page-link" href="#">6</a></li>
              <li class="page-item"><a class="page-link" href="#">7</a></li>
              <li class="page-item"><a class="page-link" href="#">8</a></li>
            </ul>
          </nav>
        </div>
        <!-- /.card-footer -->
      </div>
      <!-- /.card -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
export default {
  name: 'Contacts',
  data() {
    return {
      contacts: [
        {
          id: 1,
          name: 'Nicole Pearson',
          position: 'Digital Strategist',
          about: 'Web Designer / UX / Graphic Artist / Coffee Lover',
          address: 'Demo Street 123, Demo City 04312, NJ',
          phone: '+800 - 12 12 23 52',
          avatar: 'https://i.pravatar.cc/150?img=5'
        },
        {
          id: 2,
          name: 'Alexander Pierce',
          position: 'Software Engineer',
          about: 'Full Stack Developer / Team Lead / Tech Enthusiast',
          address: 'Tech Avenue 456, Silicon Valley, CA',
          phone: '+1 234 567 8901',
          avatar: 'https://i.pravatar.cc/150?img=12'
        },
        {
          id: 3,
          name: 'Sarah Johnson',
          position: 'Product Manager',
          about: 'Product Strategy / Agile / Innovation Driver',
          address: 'Business Park 789, New York, NY',
          phone: '+1 345 678 9012',
          avatar: 'https://i.pravatar.cc/150?img=9'
        },
        {
          id: 4,
          name: 'Michael Chen',
          position: 'UI/UX Designer',
          about: 'Creative Designer / Prototyping / User Research',
          address: 'Design District 321, Los Angeles, CA',
          phone: '+1 456 789 0123',
          avatar: 'https://i.pravatar.cc/150?img=13'
        },
        {
          id: 5,
          name: 'Emma Williams',
          position: 'Marketing Director',
          about: 'Digital Marketing / Brand Strategy / Content Creator',
          address: 'Marketing Plaza 654, Chicago, IL',
          phone: '+1 567 890 1234',
          avatar: 'https://i.pravatar.cc/150?img=10'
        },
        {
          id: 6,
          name: 'David Brown',
          position: 'DevOps Engineer',
          about: 'Cloud Architecture / CI/CD / Automation Expert',
          address: 'Tech Hub 987, Seattle, WA',
          phone: '+1 678 901 2345',
          avatar: 'https://i.pravatar.cc/150?img=14'
        },
        {
          id: 7,
          name: 'Lisa Anderson',
          position: 'Data Scientist',
          about: 'Machine Learning / Analytics / AI Researcher',
          address: 'Innovation Center 147, Boston, MA',
          phone: '+1 789 012 3456',
          avatar: 'https://i.pravatar.cc/150?img=16'
        },
        {
          id: 8,
          name: 'James Wilson',
          position: 'Sales Manager',
          about: 'Business Development / Client Relations / Growth Hacker',
          address: 'Commerce Street 258, Miami, FL',
          phone: '+1 890 123 4567',
          avatar: 'https://i.pravatar.cc/150?img=15'
        },
        {
          id: 9,
          name: 'Sophia Martinez',
          position: 'HR Manager',
          about: 'Talent Acquisition / Employee Engagement / Culture Builder',
          address: 'Corporate Plaza 369, Austin, TX',
          phone: '+1 901 234 5678',
          avatar: 'https://i.pravatar.cc/150?img=20'
        }
      ]
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

/* Contact Cards */
.card.bg-light {
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.card.bg-light:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
  background: rgba(102, 126, 234, 0.05);
  font-weight: 600;
  color: #667eea;
}

.lead {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.img-circle {
  border: 3px solid #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover .img-circle {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn.bg-teal {
  background: linear-gradient(135deg, #20c997 0%, #17a2b8 100%);
  border: none;
  transition: all 0.3s ease;
}

.btn.bg-teal:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(32, 201, 151, 0.4);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* Pagination */
.pagination .page-link {
  color: #667eea;
  border: 1px solid #dee2e6;
  transition: all 0.3s ease;
}

.pagination .page-link:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
}

.pagination .page-item.active .page-link {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.col-12 {
  animation: fadeInUp 0.5s ease-out;
}

.col-12:nth-child(1) { animation-delay: 0.1s; }
.col-12:nth-child(2) { animation-delay: 0.2s; }
.col-12:nth-child(3) { animation-delay: 0.3s; }
.col-12:nth-child(4) { animation-delay: 0.4s; }
.col-12:nth-child(5) { animation-delay: 0.5s; }
.col-12:nth-child(6) { animation-delay: 0.6s; }
.col-12:nth-child(7) { animation-delay: 0.7s; }
.col-12:nth-child(8) { animation-delay: 0.8s; }
.col-12:nth-child(9) { animation-delay: 0.9s; }
</style>
