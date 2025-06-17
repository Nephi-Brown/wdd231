document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookEvent');
  
    if (!form) return;
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const name = document.getElementById('name').value.trim();
      const contact = document.getElementById('phone').value.trim();
      const eventName = document.getElementById('event').value.trim();
  
      if (name && contact && eventName) {
        localStorage.setItem('bookingName', name);
        localStorage.setItem('bookingContact', contact);
        localStorage.setItem('bookingEvent', eventName);
  
        window.location.href = 'bookeventconfirm.html';
      } else {
        alert("Please fill out all fields.");
      }
    });
  });