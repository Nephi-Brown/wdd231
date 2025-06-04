document.addEventListener("DOMContentLoaded", () => {
    const breadcrumbContainer = document.getElementById("breadcrumb");
    if (!breadcrumbContainer) return;
  
    const basePath = "/wdd230/chamber/";
    const fullPath = window.location.pathname;
  
    // Remove base path and trailing slash if present
    const relativePath = fullPath.replace(basePath, "").replace(/\/$/, "");
  
    if (!relativePath || relativePath === "index.html") {
      breadcrumbContainer.style.display = "none";
      return;
    }
  
    const pathSegments = relativePath.split("/");
  
    let breadcrumbHTML = `<a href="${basePath}">Home</a>`;
    let currentPath = basePath;
  
    pathSegments.forEach((segment, index) => {
      const cleanSegment = segment.replace(".html", "");
      const title = cleanSegment
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
  
      currentPath += segment.includes(".html") ? "" : `${segment}/`;
  
      if (index === pathSegments.length - 1) {
        breadcrumbHTML += ` &gt; <span>${title}</span>`;
      } else {
        breadcrumbHTML += ` &gt; <a href="${currentPath}">${title}</a>`;
      }
    });
  
    breadcrumbContainer.innerHTML = breadcrumbHTML;
  });