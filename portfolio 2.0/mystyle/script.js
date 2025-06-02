document.addEventListener('DOMContentLoaded', function() {
    // Animation pour les liens de navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // Animation au défilement
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + window.innerHeight;
        
        sections.forEach(section => {
            if (scrollPosition > section.offsetTop + section.offsetHeight / 2) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Initialisation des animations
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Déclencher l'animation pour la première section
    document.querySelector('section').style.opacity = '1';
    document.querySelector('section').style.transform = 'translateY(0)';
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Ici, vous pourriez ajouter du code pour envoyer les données à un serveur
        console.log('Formulaire soumis:', { name, email, message });
        
        // Afficher un message de confirmation
        alert('Merci pour votre message! Je vous répondrai dès que possible.');
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });

    window.addEventListener('DOMContentLoaded', () => {
        const track = document.querySelector('.profile-slider-track');
        const images = document.querySelectorAll('.profile-img');
        const imageCount = images.length;
    
        let index = 0;
        let direction = 1;
    
        function slideImages() {
          const imageWidth = images[0].offsetWidth;
          track.style.transform = `translateX(-${index * imageWidth}px)`;
    
          // Aller-retour avec point de rebond à l'indice 2 (pas d'arrêt)
          if (index === 2) {
            direction = -1;
            index--; // va vers image 1
          } else if (index === 0 && direction === -1) {
            direction = 1;
            index++; // va vers image 1
          } else {
            index += direction;
          }
        }
    
        setInterval(slideImages, 3000);
    });

});


document.addEventListener("DOMContentLoaded", function () {
  const zoomables = document.querySelectorAll(".zoomable");
  const overlay = document.getElementById("overlay");
  const overlayImg = document.getElementById("overlay-img");
  const closeBtn = document.querySelector(".close-btn");

  // Ouvre le zoom
  zoomables.forEach(img => {
    img.addEventListener("click", () => {
      overlay.style.display = "flex";
      overlayImg.src = img.src;
    });
  });

  // Ferme le zoom (bouton)
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    overlayImg.src = "";
  });

  // Ferme en cliquant hors image
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
      overlayImg.src = "";
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".project-carousel");
  const cards = document.querySelectorAll(".project-card");
  const totalCards = cards.length;

  let currentIndex = 0;
  let direction = 1; // 1 = droite, -1 = gauche

  function updateCarousel() {
    const visibleCount = 3;
    const maxIndex = totalCards - visibleCount;
    if (currentIndex >= maxIndex) direction = -1;
    if (currentIndex <= 0) direction = 1;

    currentIndex += direction;
    const offset = currentIndex * (100 / visibleCount);
    carousel.style.transform = `translateX(-${offset}%)`;
  }

  let autoSlide = setInterval(updateCarousel, 2000);

  // Glisser avec la souris
  let isDragging = false;
  let startX = 0;

  carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    carousel.style.cursor = "grabbing";
    clearInterval(autoSlide);
  });

  carousel.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    const endX = e.pageX;
    const delta = endX - startX;

    if (delta > 50 && currentIndex > 0) {
      currentIndex--;
    } else if (delta < -50 && currentIndex < totalCards - 3) {
      currentIndex++;
    }

    const offset = currentIndex * (100 / 3);
    carousel.style.transform = `translateX(-${offset}%)`;
    isDragging = false;
    carousel.style.cursor = "grab";
    autoSlide = setInterval(updateCarousel, 2000);
  });

  carousel.addEventListener("mouseleave", () => {
    isDragging = false;
    carousel.style.cursor = "grab";
  });

  carousel.addEventListener("mousemove", (e) => {
    if (isDragging) {
      e.preventDefault();
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".project-carousel");
  const cards = document.querySelectorAll(".project-card");
  const visibleCount = 3;
  const totalCards = cards.length;

  let currentIndex = 0;
  let direction = 1; // 1 = droite, -1 = gauche

  function updateCarousel() {
    const maxIndex = totalCards - visibleCount;
    if (currentIndex >= maxIndex) direction = -1;
    if (currentIndex <= 0) direction = 1;

    currentIndex += direction;
    const offset = currentIndex * (100 / visibleCount);
    carousel.style.transform = `translateX(-${offset}%)`;
  }

  let autoSlide = setInterval(updateCarousel, 2000);

  // --- Glissement souris ---
  let isDragging = false;
  let startX = 0;

  carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    clearInterval(autoSlide);
    carousel.style.cursor = "grabbing";
  });

  carousel.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    const delta = e.pageX - startX;
    handleSwipe(delta);
    isDragging = false;
    carousel.style.cursor = "grab";
    autoSlide = setInterval(updateCarousel, 2000);
  });

  // --- Glissement tactile (mobile) ---
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    clearInterval(autoSlide);
  });

  carousel.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX;
    handleSwipe(delta);
    autoSlide = setInterval(updateCarousel, 2000);
  });

  function handleSwipe(delta) {
    const threshold = 50;
    if (delta > threshold && currentIndex > 0) {
      currentIndex--;
    } else if (delta < -threshold && currentIndex < totalCards - visibleCount) {
      currentIndex++;
    }

    const offset = currentIndex * (100 / visibleCount);
    carousel.style.transform = `translateX(-${offset}%)`;
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".about-profile-img");
  let index = 0;

  function showNextImage() {
    images.forEach((img, i) => {
      img.classList.remove("active");
    });

    images[index].classList.add("active");

    // Avancer à l’image suivante
    index = (index + 1) % images.length;

    setTimeout(showNextImage, 1300); // 1 sec + 300ms pause approx.
  }

  showNextImage(); // lancer boucle
});





