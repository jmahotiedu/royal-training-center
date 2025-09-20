// Royal Training Center Website JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// Session Booking Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('sessionBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const bookingData = {
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                sessionType: formData.get('sessionType'),
                preferredDate: formData.get('preferredDate'),
                preferredTime: formData.get('preferredTime'),
                goals: formData.get('goals')
            };
            
            // Validate required fields
            if (!bookingData.fullName || !bookingData.email || !bookingData.phone || 
                !bookingData.sessionType || !bookingData.preferredDate || !bookingData.preferredTime) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate booking submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Booking Session...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thank you ${bookingData.fullName}! Your session booking request has been submitted. We'll contact you within 24 hours to confirm your appointment.`);
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // In a real implementation, you would send this data to your backend
                console.log('Booking submitted:', bookingData);
            }, 2000);
        });
    }
});

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const contactData = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            if (!contactData.name || !contactData.email || !contactData.message) {
                alert('Please fill in all fields.');
                return;
            }
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you ${contactData.name}! Your message has been sent. We'll get back to you soon.`);
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                console.log('Contact form submitted:', contactData);
            }, 1500);
        });
    }
});


// Regimen Purchase System
function purchaseRegimen(regimenId) {
    const regimens = {
        'single-workout': { name: 'Single Workout Regiment', price: 10 },
        'few-workouts': { name: 'Few Workout Regiments', price: 20 },
        'weekly-regiments': { name: 'A Week Worth of Regiments', price: 25 }
    };
    
    const regimen = regimens[regimenId];
    if (regimen) {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Processing...';
        button.disabled = true;
        
        // Simulate purchase process
        setTimeout(() => {
            let message = `Thank you for purchasing ${regimen.name}! You'll receive access details via email within 10 minutes.`;
            if (regimenId === 'weekly-regiments') {
                message += ' Phone calls are available for movement explanation.';
            }
            alert(message);
            button.textContent = 'Purchased!';
            button.style.backgroundColor = '#4a6741';
            
            // In a real implementation, you would process the payment and provide access
            console.log('Kings Royal Workout purchased:', regimen);
        }, 2000);
    }
}

// Modal Management
document.addEventListener('DOMContentLoaded', function() {
    // Close modals when clicking the X
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});


// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(250, 248, 243, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#faf8f3';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.pillar, .regimen-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Enhanced form validation for booking
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#dc3545';
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.style.borderColor = '#4a6741';
                this.setCustomValidity('');
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#dc3545';
                this.setCustomValidity('Please enter a valid phone number');
            } else {
                this.style.borderColor = '#4a6741';
                this.setCustomValidity('');
            }
        });
    }
});

// Date validation for booking (no past dates)
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        dateInput.addEventListener('change', function() {
            if (this.value < today) {
                alert('Please select a future date for your session.');
                this.value = '';
            }
        });
    }
});

// Console welcome message
console.log(`
🌿 Welcome to Royal Training Center! 🌿
YOUR BODY, YOUR KINGDOM.

Follow us on Instagram: @royaltrainingcenter
Kings Royal Workouts: @kingsroyalworkouts

"Working out is a means of mental peace, prosperity. Let's get to work!"
`);

// Performance monitoring
window.addEventListener('load', function() {
    // Simple performance logging
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here in a production environment
        console.log('Service Worker support detected');
    });
}
