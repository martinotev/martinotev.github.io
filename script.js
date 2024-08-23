document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Lazy loading for gallery images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    document.querySelectorAll("img.lazy").forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyImages = document.querySelectorAll("img.lazy");
    const loadImages = () => {
      lazyImages.forEach((img) => {
        img.src = img.dataset.src;
        img.classList.remove("lazy");
      });
    };

    // Load images after a short delay
    setTimeout(loadImages, 250);
  }

  // Form submission handling
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (email) {
        alert("Thank you for subscribing with: " + email);
        this.reset();
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }

  // Add animation class to gallery images on scroll
  const galleryImages = document.querySelectorAll(".gallery-grid img");
  const animateImages = () => {
    galleryImages.forEach((img) => {
      const imgTop = img.getBoundingClientRect().top;
      const imgBottom = img.getBoundingClientRect().bottom;
      if (imgTop < window.innerHeight && imgBottom > 0) {
        img.classList.add("animate");
      }
    });
  };

  if (galleryImages.length > 0) {
    window.addEventListener("scroll", animateImages);
    animateImages(); // Call once on load
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // Automatic slideshow for gallery (if on gallery page)
  const gallerySlideshow = document.querySelector(".gallery-slideshow");
  if (gallerySlideshow) {
    let slideIndex = 0;
    const slides = gallerySlideshow.querySelectorAll("img");

    function showSlide(n) {
      slides.forEach((slide) => (slide.style.display = "none"));
      slideIndex = (n + slides.length) % slides.length;
      slides[slideIndex].style.display = "block";
    }

    function nextSlide() {
      showSlide(slideIndex + 1);
    }

    setInterval(nextSlide, 5000); // Change slide every 5 seconds
    showSlide(0); // Show first slide
  }

  // Add hover effects to nav buttons
  const navItems = document.querySelectorAll("nav ul li a");

  navItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("hovered");
    });

    item.addEventListener("mouseleave", () => {
      item.classList.remove("hovered");
    });
  });

  // Image modal functionality
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const closeBtn = document.getElementsByClassName("close")[0];

  document.querySelectorAll(".menu-image").forEach((image) => {
    image.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = image.src;
      captionText.innerHTML = image.alt;
    });
  });

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
