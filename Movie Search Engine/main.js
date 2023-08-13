// Replace 'YOUR_TMDB_API_KEY' with your actual TMDB API key
const apiKey = 'YOUR_TMDB_API_KEY';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const imageGallery = document.querySelector('.image-gallery');

searchButton.addEventListener('click', searchImages);

function searchImages() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    alert('Please enter a movie or TV show name.');
    return;
  }

  // Clear previous search results
  imageGallery.innerHTML = '';

  // Fetch images from TMDB API
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`)
    .then(response => response.json())
    .then(data => {
      displayImages(data.results);
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
}

function displayImages(images) {
  images.forEach(image => {
    if (image.poster_path) {
      const imageUrl = `https://image.tmdb.org/t/p/w500${image.poster_path}`;
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.alt = image.title || image.name;
      imageGallery.appendChild(imageElement);
    }
  });
}