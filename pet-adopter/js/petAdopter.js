// Display animals on page load
fetch('https://api.petfinder.com/v2/animals/', { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
  .then(response => response.json())
  .then(data => {
    // populate animals 
    searchResultsContainer.insertAdjacentHTML('afterbegin', generateCardTemplate(data.animals));

    console.log(data);
  })
  .catch(err => console.log(err));

// Intersection observer for infinite scroll when user reaches the bottom of page
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}

// create intersection observer (inside setTimeout to avoid firing on page load)
setTimeout(function(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // only fire when scrolling down
      if(!entry.isIntersecting) return;

      for(let i = 0; i < 4; i++) {
        loadPaginationNext('beforeend');
      }
    });
  }, options);

  const target = document.querySelector('#page-bottom');
  observer.observe(target);
}, 1500)

// Load more results button
const loadMorePaginationBtn = document.querySelector('#load-more-pagination');
const searchLoadingContainer = document.querySelector('.search-loading-container');

loadMorePaginationBtn.addEventListener('click', () => {
  searchLoadingContainer.innerHTML = 'Searching next 80 entries that meets your criteria';
  // search through more than one api call (each call only provides 20 animals)
  for(let i = 0; i < 4; i++) {
    loadPaginationNext('afterbegin');
  }
  setTimeout(() => searchLoadingContainer.innerHTML = '', 2000)
  
});