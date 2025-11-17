// JavaScript for FurEver Family Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing functionality');
    
    // Initialize all functionality
    initAccordion();
    initGalleryLightbox();
    initAdoptionModal();
    initFormValidation();
    initSearchFilter();
    initMaps();
    initDonationButtons();
    initLearnMoreButtons();
    
    // Add form submission handler for home page contact form
    const homeContactForm = document.getElementById('home-contact-form');
    if (homeContactForm) {
        homeContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message has been sent and you will be contacted as soon as possible.');
            this.reset();
        });
    }
});

// Accordion functionality
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    console.log('Found accordion headers:', accordionHeaders.length);
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            console.log('Accordion clicked:', this.textContent);
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordions first
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            
            // Remove active class from all headers
            accordionHeaders.forEach(h => h.classList.remove('active'));
            
            // Open current one if it wasn't active
            if (!isActive) {
                content.classList.add('active');
                this.classList.add('active');
            }
        });
    });
}

// Gallery lightbox functionality
function initGalleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        console.log('Lightbox not found on this page');
        return;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Open lightbox when gallery image is clicked
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', function() {
            console.log('Opening lightbox');
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
            lightboxCaption.textContent = this.alt;
        });
    });
    
    // Close lightbox
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
    }
    
    // Close when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// Adoption modal functionality
function initAdoptionModal() {
    const modal = document.getElementById('adoption-modal');
    if (!modal) {
        console.log('Adoption modal not found on this page');
        return;
    }
    
    const closeModal = document.querySelector('.close-modal');
    const adoptButtons = document.querySelectorAll('.adopt-btn');
    const modalPetName = document.getElementById('modal-pet-name');
    const modalPetName2 = document.getElementById('modal-pet-name-2');
    
    console.log('Found adopt buttons:', adoptButtons.length);
    
    adoptButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const petName = this.getAttribute('data-pet');
            console.log('Adopt button clicked for:', petName);
            
            if (modalPetName) modalPetName.textContent = petName;
            if (modalPetName2) modalPetName2.textContent = petName;
            modal.style.display = 'block';
        });
    });
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close when clicking outside the modal
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Learn More buttons functionality
function initLearnMoreButtons() {
    const learnMoreButtons = document.querySelectorAll('.adopt-btn');
    console.log('Found Learn More buttons:', learnMoreButtons.length);
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const petName = this.getAttribute('data-pet');
            console.log('Learn More button clicked for:', petName);
            alert(`Feature coming soon! We're working on detailed profiles for ${petName}.`);
        });
    });
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    const adoptionForm = document.getElementById('adoption-form');
    const donationForm = document.getElementById('donation-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                alert('Thank you! Your message has been sent and we will contact you as soon as possible.');
                this.reset();
            }
        });
    }
    
    if (adoptionForm) {
        adoptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateAdoptionForm()) {
                alert('Thank you for your adoption inquiry! We will contact you within 24 hours to discuss next steps.');
                const modal = document.getElementById('adoption-modal');
                if (modal) modal.style.display = 'none';
                this.reset();
            }
        });
    }
    
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateDonationForm()) {
                alert('Thank you for your generous donation! Your support helps us save more lives. A confirmation email will be sent shortly.');
                this.reset();
                
                // Clear donation button selections
                document.querySelectorAll('.donation-amount').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
        });
    }
}

function validateContactForm() {
    let isValid = true;
    
    // Name validation
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (name && name.value.trim().length < 2) {
        if (nameError) nameError.textContent = 'Please enter a valid name';
        isValid = false;
    } else if (nameError) {
        nameError.textContent = '';
    }
    
    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.value)) {
        if (emailError) emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    } else if (emailError) {
        emailError.textContent = '';
    }
    
    return isValid;
}

function validateAdoptionForm() {
    const name = document.getElementById('adopter-name');
    const email = document.getElementById('adopter-email');
    const phone = document.getElementById('adopter-phone');
    
    if (!name || name.value.trim().length < 2) {
        alert('Please enter your full name');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.value)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!phone || phone.value.trim().length < 10) {
        alert('Please enter a valid phone number');
        return false;
    }
    
    return true;
}

function validateDonationForm() {
    const name = document.getElementById('donor-name');
    const email = document.getElementById('donor-email');
    const card = document.getElementById('card-number');
    const expiry = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    
    // Check if donation amount is selected
    const selectedAmount = document.querySelector('.donation-amount.active');
    const customAmount = document.getElementById('custom-amount');
    
    if (!selectedAmount && (!customAmount || !customAmount.value)) {
        alert('Please select or enter a donation amount');
        return false;
    }
    
    if (!name || name.value.trim().length < 2) {
        alert('Please enter your full name');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.value)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!card || card.value.replace(/\s/g, '').length !== 16) {
        alert('Please enter a valid 16-digit card number');
        return false;
    }
    
    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry.value)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
    }
    
    if (!cvv || !/^\d{3,4}$/.test(cvv.value)) {
        alert('Please enter a valid CVV (3 or 4 digits)');
        return false;
    }
    
    return true;
}

// Search and filter functionality
function initSearchFilter() {
    const searchInput = document.getElementById('pet-search');
    const typeFilter = document.getElementById('pet-type-filter');
    
    if (searchInput && typeFilter) {
        searchInput.addEventListener('input', filterPets);
        typeFilter.addEventListener('change', filterPets);
    }
}

function filterPets() {
    const searchTerm = document.getElementById('pet-search').value.toLowerCase();
    const typeFilter = document.getElementById('pet-type-filter').value;
    const pets = document.querySelectorAll('.gallery-item');
    
    pets.forEach(pet => {
        const petName = pet.querySelector('h3').textContent.toLowerCase();
        const petType = pet.getAttribute('data-type');
        
        const matchesSearch = petName.includes(searchTerm);
        const matchesType = typeFilter === 'all' || petType === typeFilter;
        
        if (matchesSearch && matchesType) {
            pet.style.display = 'block';
        } else {
            pet.style.display = 'none';
        }
    });
}

// Interactive maps
function initMaps() {
    // Shelter location map (About page)
    const shelterMap = document.getElementById('shelter-map');
    if (shelterMap && typeof L !== 'undefined') {
        console.log('Initializing shelter map');
        try {
            const map = L.map('shelter-map').setView([-25.7479, 28.2293], 15);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            L.marker([-25.7479, 28.2293])
                .addTo(map)
                .bindPopup('<strong>FurEver Family Shelter</strong><br>4652 Zebra Street, Pretoria, South Africa')
                .openPopup();
        } catch (error) {
            console.error('Error initializing shelter map:', error);
        }
    }
    
    // Contact page map
    const contactMap = document.getElementById('contact-map');
    if (contactMap && typeof L !== 'undefined') {
        console.log('Initializing contact map');
        try {
            const map = L.map('contact-map').setView([-25.7479, 28.2293], 15);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            L.marker([-25.7479, 28.2293])
                .addTo(map)
                .bindPopup('<strong>FurEver Family</strong><br>Visit us today!')
                .openPopup();
        } catch (error) {
            console.error('Error initializing contact map:', error);
        }
    }
}

// Donation button functionality
function initDonationButtons() {
    const donationButtons = document.querySelectorAll('.donation-amount');
    const customAmount = document.getElementById('custom-amount');
    
    console.log('Found donation buttons:', donationButtons.length);
    
    donationButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Donation button clicked:', this.textContent);
            // Remove active class from all buttons
            donationButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set custom amount field to empty when preset amount is selected
            if (customAmount) {
                customAmount.value = '';
            }
        });
    });
    
    // When custom amount is entered, deselect preset buttons
    if (customAmount) {
        customAmount.addEventListener('input', function() {
            donationButtons.forEach(btn => btn.classList.remove('active'));
        });
    }
}

// Global error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});
// Volunteer Form Handling
function initVolunteerForm() {
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateVolunteerForm()) {
                alert('Thank you for your volunteer application! We will contact you within 3-5 business days.');
                this.reset();
            }
        });
    }
}

function validateVolunteerForm() {
    const name = document.getElementById('volunteer-name').value;
    const email = document.getElementById('volunteer-email').value;
    const age = document.getElementById('volunteer-age').value;
    
    if (!name || name.trim().length < 2) {
        alert('Please enter your full name.');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (!age || age < 16) {
        alert('Volunteers must be 16 years or older.');
        return false;
    }
    
    return true;
}

// Update your DOMContentLoaded function to include new forms
document.addEventListener('DOMContentLoaded', function() {
    // ... your existing initialization code ...
    
    // Initialize new forms
    initVolunteerForm();
});