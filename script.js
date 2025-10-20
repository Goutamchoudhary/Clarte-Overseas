// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// "Get Instant Quote" form modal handling (if additional behavior is needed)
document.addEventListener('DOMContentLoaded', function () {
    const quoteModal = document.getElementById('quoteModal');
    if (quoteModal) {
        const modal = new bootstrap.Modal(quoteModal);

        document.querySelectorAll('[data-bs-target="#quoteModal"]').forEach(button => {
            button.addEventListener('click', () => modal.show());
        });
    }
});

// Optional: Add active class to navbar based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

// Lazy load images for better performance
document.addEventListener('DOMContentLoaded', function () {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });
});

// Function to load HTML content (navbar and footer)
function loadHTML() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

function formatCategory(category) {
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Product data
const products = [
    { name: "Biomass Pellets", image: "assets/images/biomass-pellets.webp", category: "bio-fuel" },
    { name: "Biomass Briquettes", image: "assets/images/wood-briquettes.jpg", category: "bio-fuel" },
    { name: "Banana Powder", image: "assets/images/banana-powder-2.png", category: "fruit-powder" },
    { name: "Pineapple Powder", image: "assets/images/pineapple-powder.png", category: "fruit-powder" },
    { name: "Apple Powder", image: "assets/images/apple-powder.png", category: "fruit-powder" },
    { name: "Guava Powder", image: "assets/images/guava-powder.png", category: "fruit-powder" },
    { name: "Onion Powder", image: "assets/images/onion-powder-2.png", category: "veg-powder" },
    { name: "Ginger Powder", image: "assets/images/ginger-powder-2.png", category: "veg-powder" },
    { name: "Garlic Powder", image: "assets/images/garlic-powder-2.png", category: "veg-powder" },
    { name: "Beetroot Powder", image: "assets/images/beetroot-powder-2.png", category: "veg-powder" },
    { name: "Wooden Handicrafts", image: "assets/images/wooden-handicrafts.png", category: "handicrafts" }
];

// Filter and display products
function filterProducts(category) {                                                                                                     
    const productGrid = document.getElementById("product-grid");
    const spinner = document.getElementById("loading-spinner");
    const tabs = document.querySelectorAll('.nav-tabs .nav-link');

    // Show spinner
    spinner.classList.add("active");

    // Highlight the selected tab
    tabs.forEach(tab => tab.classList.remove('active'));
    const activeTab = document.querySelector(`[data-category="${category}"]`);
    if (activeTab) activeTab.classList.add('active');

    // Fade out grid
    productGrid.classList.remove("visible");

    setTimeout(() => {
        // Clear current products
        productGrid.innerHTML = "";

        // Filter products
        const filteredProducts = category === "all"
            ? products
            : products.filter(product => product.category === category);

        // Generate product cards
        filteredProducts.forEach(product => {
            const card = document.createElement("div");
            card.className = "col";
            card.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Category: ${formatCategory(product.category)}</p>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });

        // Hide spinner and fade in grid
        spinner.classList.remove("active");
        productGrid.classList.add("visible");
    }, 500); // Duration matches CSS transition
}

// Scroll categories carousel
function scrollCategories(direction) {
  const container = document.getElementById('categories-carousel');
  const scrollAmount = 320;
  container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function redirectProductsCategory(category) {
    window.location.href = `products.html`;
    filterProducts(category);
}

// Load products initially
document.addEventListener('DOMContentLoaded', () => {
    loadHTML();
    filterProducts("all"); // Display all products on page load

    const text = "Connecting Continents, Delivering Trust";
    const target = document.getElementById("animated-hero-text");
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            target.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 35); // Adjust speed here (ms)
        }
    }
    typeWriter();
});


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const data = new FormData(form);
    const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
        status.innerHTML = "✅ Thank you! Your message has been sent.";
        form.reset();
    } else {
        status.innerHTML = "❌ Oops! There was a problem sending your message.";
    }
});