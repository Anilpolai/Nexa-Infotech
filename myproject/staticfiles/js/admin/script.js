// script.js - Nexa Infotech Admin Dashboard
// Handles sidebar toggle for mobile responsiveness

document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const sidebarCollapse = document.getElementById('sidebarCollapse');

  // Toggle sidebar on mobile
  if (sidebarCollapse) {
    sidebarCollapse.addEventListener('click', function () {
      sidebar.classList.toggle('active');
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function (event) {
    if (window.innerWidth <= 991 && sidebar.classList.contains('active')) {
      if (!sidebar.contains(event.target) && event.target !== sidebarCollapse) {
        sidebar.classList.remove('active');
      }
    }
  });
}); 