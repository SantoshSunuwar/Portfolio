document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile drawer when clicking any link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Smooth Scrolling for Navigation Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // 3. Contact Form Submission (Web3Forms JSON API)
  const form = document.getElementById('contact-form');
  const statusText = document.getElementById('form-status');

  if (form && statusText) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      statusText.textContent = "Sending Message...";
      statusText.style.color = "#00ff9d";

      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        });

        const result = await response.json();

        if (response.status === 200) {
          statusText.textContent = "Message sent successfully!";
          statusText.style.color = "#00ff9d";
          form.reset();
        } else {
          statusText.textContent = result.message || "Failed to send message.";
          statusText.style.color = "#ff4d4d";
        }
      } catch (error) {
        statusText.textContent = "An error occurred. Please try again.";
        statusText.style.color = "#ff4d4d";
      }
    });
  }

});
