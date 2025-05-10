// Add typing animation to response blocks with improved reliability
document.addEventListener('DOMContentLoaded', () => {
  // Function to initialize the typing animation
  function initTypeAnimation() {
    const responses = document.querySelectorAll('.response pre');
    if (!responses.length) {
      // If elements aren't found, try again in a bit
      setTimeout(initTypeAnimation, 100);
      return;
    }
    
    responses.forEach((response, idx) => {
      // Store original content
      const originalText = response.textContent;
      response.setAttribute('data-original', originalText);
      response.textContent = '';
      
      // Add a class for styling while typing
      response.classList.add('typing');
      
      // Start typing with a staggered delay
      setTimeout(() => {
        let i = 0;
        let typingInterval = setInterval(() => {
          if (i < originalText.length) {
            response.textContent += originalText.charAt(i);
            i++;
          } else {
            clearInterval(typingInterval);
            response.classList.remove('typing');
            response.classList.add('typed');
          }
        }, 5);
      }, idx * 250);
    });
  }
  
  // Start animation after a short delay to ensure DOM is ready
  setTimeout(initTypeAnimation, 200);
  
  // Fallback: If after 10 seconds any element is still empty, restore content
  setTimeout(() => {
    document.querySelectorAll('.response pre').forEach(el => {
      if (!el.textContent && el.hasAttribute('data-original')) {
        el.textContent = el.getAttribute('data-original');
      }
    });
  }, 10000);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Handle contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill out all fields');
        return;
      }
      
      // Simulate form submission - in a real scenario, this would send data to a backend
      alert(`Thanks for your message, ${name}! I'll get back to you soon at ${email}.`);
      
      // Reset form
      contactForm.reset();
    });
  }

  // Add active class to current navigation item
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  
  function highlightNavOnScroll() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(navLink => {
          navLink.classList.remove('active');
          if (navLink.getAttribute('href') === `#${sectionId}`) {
            navLink.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavOnScroll);
  
  // Add hover effect to endpoints
  const endpoints = document.querySelectorAll('.endpoint');
  
  endpoints.forEach(endpoint => {
    endpoint.addEventListener('mouseenter', () => {
      endpoint.classList.add('endpoint--hover');
    });
    
    endpoint.addEventListener('mouseleave', () => {
      endpoint.classList.remove('endpoint--hover');
    });
  });
});