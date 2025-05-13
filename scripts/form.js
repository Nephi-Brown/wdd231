const form = document.getElementById('form');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    form.addEventListener('submit', function (e) {
      if (password.value !== confirmPassword.value) {
        alert("Passwords do not match. Please try again.");
        password.value = "";
        confirmPassword.value = "";
        password.focus();
        e.preventDefault();
      }
    });