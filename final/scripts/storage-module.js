export function getViewMode() {
    return localStorage.getItem('view') || 'grid';
  }
  
  export function setViewMode(mode) {
    localStorage.setItem('view', mode);
  }
  