const StorageModule = (function () {
    function getViewMode() {
      return localStorage.getItem('view') || 'grid';
    }
  
    function setViewMode(mode) {
      localStorage.setItem('view', mode);
    }
  
    return {
      getViewMode,
      setViewMode,
    };
  })();