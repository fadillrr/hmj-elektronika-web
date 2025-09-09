document.addEventListener("DOMContentLoaded", () => {
    // --- Toggle hamburger menu ---
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector("header nav");
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
    const navLinks = document.querySelectorAll("header nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("show")) {
                navMenu.classList.remove("show");
            }
        });
    });

    // --- LOGIKA BARU: SAMBUTAN SLIDESHOW OTOMATIS ---
    let sambutanSlideIndex = 0;

    function showSambutanSlides() {
        const slides = document.getElementsByClassName("sambutan-slide");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        sambutanSlideIndex++;
        if (sambutanSlideIndex > slides.length) {
            sambutanSlideIndex = 1;
        }
        slides[sambutanSlideIndex - 1].style.display = "flex";
        setTimeout(showSambutanSlides, 5000); // Ganti slide setiap 5 detik
    }
    showSambutanSlides(); // Memulai slideshow

    // --- Galeri Slideshow Logic ---
    let slideIndex = 1;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    showSlides(slideIndex);
    document.querySelector(".prev").addEventListener("click", () => showSlides(slideIndex += -1));
    document.querySelector(".next").addEventListener("click", () => showSlides(slideIndex += 1));
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", () => showSlides(slideIndex = i + 1));
    }
    setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000);

    // --- Particle animation background ---
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function initParticles() {
        particles = [];
        const numberOfParticles = window.innerWidth < 768 ? 40 : 80;
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2.5 + 1,
                dx: (Math.random() - 0.5) * 0.8,
                dy: (Math.random() - 0.5) * 0.8,
                color: Math.random() > 0.5 ? "#1d4ed8" : "#f97316"
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });
        requestAnimationFrame(drawParticles);
    }
    window.addEventListener("resize", () => {
        resizeCanvas();
        initParticles();
    });
    resizeCanvas();
    initParticles();
    drawParticles();

    // --- FUNGSI BARU UNTUK ANIMASI KETIK (DENGAN LOOPING) ---
    const heroText = document.querySelector('.hero p');
    const textToType = 'Menghidupkan inovasi, menghubungkan ide, membangun masa depan teknologi.';
    const typingSpeed = 50;
    const loopDelay = 5000; // Jeda 5 detik sebelum mengulang

    function typeEffect() {
        let i = 0;
        heroText.textContent = ''; // Clear text before starting
        function typing() {
            if (i < textToType.length) {
                heroText.textContent += textToType.charAt(i);
                i++;
                setTimeout(typing, typingSpeed);
            } else {
                // Setelah selesai mengetik, tunggu sebentar lalu mulai lagi
                setTimeout(typeEffect, loopDelay);
            }
        }
        typing();
    }
    typeEffect();
});