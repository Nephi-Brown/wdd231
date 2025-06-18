document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const timestampInput = document.createElement('input');
    timestampInput.type = 'hidden';
    timestampInput.name = 'submitted';
    timestampInput.value = new Date().toISOString();
    form.appendChild(timestampInput);
  });
  