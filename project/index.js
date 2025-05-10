// Add typing animation to response blocks
document.addEventListener('DOMContentLoaded', () => {
  // Type animation for response blocks
  const responses = document.querySelectorAll('.response pre');
  
  responses.forEach(response => {
    const text = response.textContent;
    response.textContent = '';
    let index = 0;
    
    function typeText() {
      if (index < text.length) {
        response.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 5); // Slightly faster typing for better UX
      }
    }
    
    // Start typing when response is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeText();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(response);
  });

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