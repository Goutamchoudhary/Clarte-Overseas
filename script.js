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

// Product data
const products = [
    { name: "Smartphone", image: "images/smartphone.jpg", category: "electronics" },
    { name: "Laptop", image: "images/laptop.jpg", category: "electronics" },
    { name: "T-Shirt", image: "images/tshirt.jpg", category: "fashion" },
    { name: "Sneakers", image: "images/sneakers.jpg", category: "fashion" }
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
                        <p class="card-text">Category: ${product.category}</p>
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

// Load products initially
document.addEventListener('DOMContentLoaded', () => {
    loadHTML();
    filterProducts("all"); // Display all products on page load
});