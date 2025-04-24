// Function to load an HTML file into a div
function loadHTML(elementId, file) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        document.getElementById(elementId).innerHTML = data;
      });
  }
  
  // On page load, insert header and footer
  window.onload = function() {
    loadHTML('header', 'partials/header.html');
    loadHTML('footer', 'partials/footer.html');
  }
  