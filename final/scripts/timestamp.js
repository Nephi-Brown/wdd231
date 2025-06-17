document.addEventListener("DOMContentLoaded", () => {
    const timeStampField = document.getElementById("timeStamp");
    if (timeStampField) {
      const now = new Date();
      timeStampField.value = now.toISOString();
    }
  });