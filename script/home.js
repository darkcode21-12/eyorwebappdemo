
function wait() {
    alert("wait please ... ")
    console.log("on progress!")
}
document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[index].classList.add("active");
        dots[index].classList.add("active");
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        updateSlide();
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        updateSlide();
    }

    function updateSlide() {
        document.querySelector(".slides").style.transform = `translateX(-${slideIndex * 100}%)`;
        showSlide(slideIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Button Controls
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    // Dots Click Event
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            slideIndex = index;
            updateSlide();
        });
    });

    // Pause on Hover
    document.querySelector(".slideshow-container").addEventListener("mouseover", stopAutoSlide);
    document.querySelector(".slideshow-container").addEventListener("mouseleave", startAutoSlide);

    startAutoSlide(); // Start Auto-Slideshow
});
    // Start counters when the section comes into view
    function startCounters() {
        animateCounter('yearsCounter', 19);
        animateCounter('campusesCounter', 2);
        animateCounter('staffCounter', 53); // You didn't provide staff number, so I added a placeholder
        animateCounter('studentsCounter', 897);
    }
    
    // Intersection Observer to trigger animation when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.stats-container'));
    

        document.querySelector('.menu-toggle').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });

        const navItems = document.querySelectorAll('.nav-links > li');
        navItems.forEach(item => {
            if (window.innerWidth <= 768) {
                item.addEventListener('click', function() {
                    const dropdown = this.querySelector('.dropdown');
                    if (dropdown) {
                        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                    }
                });
            }
        });

        // Slideshow Functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = slides.length;

        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Ensure index is within bounds
            if (index >= totalSlides) currentSlide = 0;
            else if (index < 0) currentSlide = totalSlides - 1;
            else currentSlide = index;
            
            // Show current slide
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // Next/Previous Controls
        document.querySelector('.next-btn').addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });

        document.querySelector('.prev-btn').addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });

        // Dot Navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });

        // Auto-advance slides every 5 seconds
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);

        // Initialize first slide
        showSlide(0);

        function animateCounter(elementId, targetNumber, duration = 2000) {
            const element = document.getElementById(elementId);
            const startNumber = 0;
            const increment = targetNumber / (duration / 16); // 60fps
            
            let currentNumber = startNumber;
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    clearInterval(timer);
                    currentNumber = targetNumber;
                }
                element.textContent = Math.floor(currentNumber).toLocaleString();
            }, 16);
        }
        document.addEventListener('DOMContentLoaded', function() {
            const featureCards = document.querySelectorAll('.feature-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            featureCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        });
