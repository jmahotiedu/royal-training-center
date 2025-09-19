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

// Weekly Fact Update System
const weeklyFacts = [
    "Regular exercise increases the production of endorphins, your brain's natural 'feel-good' chemicals, which can reduce stress and improve mood for up to 24 hours after your workout.",
    "Just 30 minutes of moderate exercise can improve your cognitive function and memory retention for up to 2 hours afterward.",
    "Exercise has been shown to be as effective as medication for treating mild to moderate depression, with benefits lasting longer than pharmaceutical interventions.",
    "Physical activity increases BDNF (Brain-Derived Neurotrophic Factor), which helps grow new brain cells and protect existing ones from stress-related damage.",
    "People who exercise regularly report 43% fewer days of poor mental health compared to those who don't exercise.",
    "Strength training specifically has been proven to reduce anxiety symptoms by up to 20% and can improve self-esteem significantly.",
    "Exercise increases the size of the hippocampus, the brain region associated with memory and learning, by up to 2% in just 6 months.",
    "Regular physical activity can reduce the risk of developing depression by 17% and anxiety disorders by 20%.",
    "Group fitness activities release additional endorphins through social bonding, creating a 'double boost' for mental wellness.",
    "Even light exercise like walking for 10 minutes can immediately improve mood and reduce feelings of fatigue.",
    "Exercise improves sleep quality by 65%, which directly impacts mental clarity, emotional regulation, and stress management.",
    "Physical activity increases production of norepinephrine, a chemical that helps moderate the brain's response to stress and improves focus."
];

function updateWeeklyFact() {
    const factElement = document.getElementById('weekly-fact');
    if (factElement) {
        // Get current week of year to ensure consistent fact rotation
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        const weekOfYear = Math.floor(dayOfYear / 7);
        
        const factIndex = weekOfYear % weeklyFacts.length;
        factElement.textContent = weeklyFacts[factIndex];
    }
}

// Initialize weekly fact on page load
document.addEventListener('DOMContentLoaded', updateWeeklyFact);

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

// Shopping Cart System
let cart = [];

function addToCart(productId) {
    const products = {
        'royal-tshirt': { name: 'Royal Training T-Shirt', price: 29 },
        'wellness-cap': { name: 'Wellness Cap', price: 24 },
        'hydration-bottle': { name: 'Mindful Hydration Bottle', price: 34 },
        'resistance-bands': { name: 'Resistance Band Set', price: 39 }
    };
    
    const product = products[productId];
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
        
        updateCartDisplay();
        showCartModal();
        
        // Show success message
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.backgroundColor = '#4a6741';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 1500);
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #eee;">
                <div>
                    <h4 style="margin: 0; color: #2c3e2d;">${item.name}</h4>
                    <p style="margin: 0; color: #6b7c6b;">$${item.price} x ${item.quantity}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span style="font-weight: 600; color: #4a6741;">$${itemTotal}</span>
                    <button onclick="removeFromCart('${item.id}')" style="background: #dc3545; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;">Remove</button>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    cartTotal.textContent = total;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function showCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('paymentModal').style.display = 'block';
}

// Regimen Purchase System
function purchaseRegimen(regimenId) {
    const regimens = {
        'mindful-strength': { name: 'Mindful Strength Program', price: 89 },
        'mental-resilience': { name: 'Mental Resilience Program', price: 129 },
        'morning-wellness': { name: 'Morning Wellness Program', price: 49 },
        'stress-relief': { name: 'Stress Relief Flow Program', price: 69 }
    };
    
    const regimen = regimens[regimenId];
    if (regimen) {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Processing...';
        button.disabled = true;
        
        // Simulate purchase process
        setTimeout(() => {
            alert(`Thank you for purchasing the ${regimen.name}! You'll receive access details via email within 10 minutes.`);
            button.textContent = 'Purchased!';
            button.style.backgroundColor = '#4a6741';
            
            // In a real implementation, you would process the payment and provide access
            console.log('Regimen purchased:', regimen);
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

// Payment Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Processing Payment...';
            submitButton.disabled = true;
            
            // Simulate payment processing
            setTimeout(() => {
                alert('Payment successful! Thank you for your purchase. You\'ll receive a confirmation email shortly.');
                cart = []; // Clear cart
                updateCartDisplay();
                document.getElementById('paymentModal').style.display = 'none';
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        });
    }
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
    const animatedElements = document.querySelectorAll('.service-card, .benefit, .regimen-card, .product-card, .tip-card');
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
Mental Wellness Through Fitness

Visit us at: https://royaltrainingcenter.com
Follow us on Instagram: @royaltrainingcenter
TikTok: @royaltrainingcenter

"Working out is a means of mental peace, prosperity, stability, and healing."
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
