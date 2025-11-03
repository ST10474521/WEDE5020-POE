// JavaScript for FurEver Family Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initAccordion();
    initGalleryLightbox();
    initAdoptionModal();
    initFormValidation();
    initSearchFilter();
    initMaps();
    initDonationButtons();
    
    // Add form submission handler for home page contact form
    const homeContactForm = document.getElementById('home-contact-form');
    if (homeContactForm) {
        homeContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message has been sent and you will be contacted as soon as possible.');
            this.reset();
        });
    }

    // Add click handlers for Learn More buttons on Pets page
    initLearnMoreButtons();
});

// Accordion functionality
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open current one if it wasn't active
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });
}

// Gallery lightbox functionality
function initGalleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Open lightbox when gallery image is clicked
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.getAttribute('data-full') || this.src;
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
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
}

// Adoption modal functionality
function initAdoptionModal() {
    const modal = document.getElementById('adoption-modal');
    const closeModal = document.querySelector('.close-modal');
    const adoptButtons = document.querySelectorAll('.adopt-btn');
    const modalPetName = document.getElementById('modal-pet-name');
    
    if (adoptButtons && modal) {
        adoptButtons.forEach(button => {
            button.addEventListener('click', function() {
                const petName = this.getAttribute('data-pet');
                modalPetName.textContent = petName;
                modal.style.display = 'block';
            });
        });
        
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close when clicking outside the modal
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Learn More buttons functionality
function initLearnMoreButtons() {
    const learnMoreButtons = document.querySelectorAll('.adopt-btn');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Feature coming soon! We are working on adding detailed pet profiles.');
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
                alert('Message has been sent and you will be contacted as soon as possible.');
                this.reset();
            }
        });
    }
    
    if (adoptionForm) {
        adoptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateAdoptionForm()) {
                alert('Thank you for your adoption inquiry! We will contact you soon.');
                document.getElementById('adoption-modal').style.display = 'none';
                this.reset();
            }
        });
    }
    
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateDonationForm()) {
                alert('Donation successful! Thank you for your generous support.');
                this.reset();
                
                // Clear donation button selections
                document.querySelectorAll('.donation-amount').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
        });
    }
    
    // Real-time validation
    setupRealTimeValidation();
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
    
    // Phone validation (optional)
    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    if (phone && phone.value && !/^\d{10}$/.test(phone.value)) {
        if (phoneError) phoneError.textContent = 'Please enter a valid 10-digit phone number';
        isValid = false;
    } else if (phoneError) {
        phoneError.textContent = '';
    }
    
    return isValid;
}

function validateAdoptionForm() {
    // Similar validation logic for adoption form
    let isValid = true;
    
    const name = document.getElementById('adopter-name');
    const email = document.getElementById('adopter-email');
    const phone = document.getElementById('adopter-phone');
    
    if (name && name.value.trim().length < 2) {
        isValid = false;
        alert('Please enter a valid name');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.value)) {
        isValid = false;
        alert('Please enter a valid email address');
        return false;
    }
    
    if (phone && !/^\d{10,}$/.test(phone.value.replace(/\D/g, ''))) {
        isValid = false;
        alert('Please enter a valid phone number');
        return false;
    }
    
    return isValid;
}

function validateDonationForm() {
    // Add donation-specific validation
    let isValid = true;
    
    const name = document.getElementById('donor-name');
    const email = document.getElementById('donor-email');
    const card = document.getElementById('card-number');
    const expiry = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    
    if (name && name.value.trim().length < 2) {
        isValid = false;
        alert('Please enter a valid name');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.value)) {
        isValid = false;
        alert('Please enter a valid email address');
        return false;
    }
    
    if (card && !/^\d{16}$/.test(card.value.replace(/\s/g, ''))) {
        isValid = false;
        alert('Please enter a valid 16-digit card number');
        return false;
    }
    
    if (expiry && !/^\d{2}\/\d{2}$/.test(expiry.value)) {
        isValid = false;
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
    }
    
    if (cvv && !/^\d{3,4}$/.test(cvv.value)) {
        isValid = false;
        alert('Please enter a valid CVV');
        return false;
    }
    
    return isValid;
}

function setupRealTimeValidation() {
    // Add real-time validation as users type
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Trigger validation when user leaves the field
            if (this.form) {
                const event = new Event('submit', { cancelable: true });
                this.form.dispatchEvent(event);
            }
        });
    });
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
    if (shelterMap) {
        const map = L.map('shelter-map').setView([-25.7479, 28.2293], 13); // Pretoria coordinates
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        L.marker([-25.7479, 28.2293])
            .addTo(map)
            .bindPopup('<strong>FurEver Family Shelter</strong><br>4652 Zebra str, Pretoria, South Africa')
            .openPopup();
    }
    
    // Contact page map
    const contactMap = document.getElementById('contact-map');
    if (contactMap) {
        const map = L.map('contact-map').setView([-25.7479, 28.2293], 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        L.marker([-25.7479, 28.2293])
            .addTo(map)
            .bindPopup('<strong>FurEver Family</strong><br>Visit us today!')
            .openPopup();
    }
}

// Donation button functionality
function initDonationButtons() {
    const donationButtons = document.querySelectorAll('.donation-amount');
    const customAmount = document.getElementById('custom-amount');
    
    donationButtons.forEach(button => {
        button.addEventListener('click', function() {
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