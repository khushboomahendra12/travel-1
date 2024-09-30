document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.like-btn');
    const likedPlacesContainer = document.querySelector('.liked-places-container');
  
    // Function to load liked places from local storage
    function loadLikedPlaces() {
      const likedPlaces = JSON.parse(localStorage.getItem('likedPlaces')) || [];
      likedPlacesContainer.innerHTML = '';  // Clear previous content
  
      likedPlaces.forEach(place => {
        const placeCard = document.createElement('div');
        placeCard.classList.add('place-card');
        placeCard.innerHTML = `
          <img src="${place.image}" alt="${place.name}">
          <div class="info">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
            <button class="delete-btn">Delete</button>
          </div>
        `;
  
        // Add delete button functionality
        placeCard.querySelector('.delete-btn').addEventListener('click', () => {
          deletePlace(place.name);
        });
  
        likedPlacesContainer.appendChild(placeCard);
      });
    }
  
    // Function to handle "like" button click
    function handleLikeButtonClick(event) {
      const placeCard = event.target.closest('.place-card');
      const placeData = {
        name: placeCard.querySelector('h3').innerText,
        image: placeCard.querySelector('img').src,
        description: placeCard.querySelector('.info p:nth-of-type(4)').innerText
      };
  
      // Get liked places from local storage
      let likedPlaces = JSON.parse(localStorage.getItem('likedPlaces')) || [];
  
      // Check if the place is already liked
      const isAlreadyLiked = likedPlaces.some(place => place.name === placeData.name);
  
      if (!isAlreadyLiked) {
        // Add the place to liked places
        likedPlaces.push(placeData);
        localStorage.setItem('likedPlaces', JSON.stringify(likedPlaces));
        loadLikedPlaces();  // Reload liked places
      } else {
        alert(`${placeData.name} is already liked!`);
      }
    }
  
    // Function to delete a place from local storage
    function deletePlace(placeName) {
      let likedPlaces = JSON.parse(localStorage.getItem('likedPlaces')) || [];
      
      // Remove the place from the liked places array
      likedPlaces = likedPlaces.filter(place => place.name !== placeName);
      
      // Update local storage
      localStorage.setItem('likedPlaces', JSON.stringify(likedPlaces));
      
      // Reload the liked places after deletion
      loadLikedPlaces();
    }
  
    // Add event listeners to all "like" buttons
    likeButtons.forEach(button => {
      button.addEventListener('click', handleLikeButtonClick);
    });
  
    // Load liked places on page load
    loadLikedPlaces();
  });
  function expandContainer(element) {
    // Sabhi containers se 'expanded' class remove karen
    const allCards = document.querySelectorAll('.place-card');
    allCards.forEach(card => {
        card.classList.remove('expanded');
    });
    
    // Clicked element par 'expanded' class add karen
    element.classList.add('expanded');
}
  


// script.js

// Get references to the search bar and the place cards
const searchInput = document.querySelector('.search-bar input');
const placeCards = document.querySelectorAll('.place-card');

// Add an event listener to the search input
searchInput.addEventListener('keyup', function() {
    const query = searchInput.value.toLowerCase(); // Get the input value
    placeCards.forEach(card => {
        const placeName = card.querySelector('h3').textContent.toLowerCase(); // Get the place name
        if (placeName.includes(query)) {
            card.style.display = 'block'; // Show matching card
        } else {
            card.style.display = 'none'; // Hide non-matching card
        }
    });
});








