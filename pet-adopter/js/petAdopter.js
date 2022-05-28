// Display all animals on page load
fetch('https://api.petfinder.com/v2/animals/', { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
  .then(response => response.json())
  .then(data => {
    // populate animals 
    searchResultsContainer.insertAdjacentHTML('afterbegin', generateCardTemplate(data.animals));

    console.log(data);
  })
  .catch(err => console.log(err));

// Infinite scroll when user reaches the bottom of page
let pagination = 2;

const loadPaginationNext = (entries) => {
  entries.forEach(entry => {
    console.log(entry);
    // only fire when scrolling down
    if(!entry.isIntersecting) { pagination--; return; }

    // if there is an active specific search
    if(searchFormInput.value) {
      fetch('https://api.petfinder.com/v2/animals?page=' + pagination, { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
        .then(response => response.json())
        .then(data => {
          // revise strings in order to compare for conditional check
          let searchFormInputValueRevised = searchFormInput.value.toLowerCase().trim();
          let animalNameRevised;
          
          data.animals.forEach(function(animal){
            // lower case and trim animal name
            animalNameRevised = animal.name.toLowerCase().trim();
            // generate card if name is included in search term
            if(animalNameRevised.includes(searchFormInputValueRevised)) {
              searchResultsContainer.insertAdjacentHTML('beforeend', generateCardTemplate([animal]));
            }
          });
        })
        .catch(err => console.log(err));
    }

    // if there is an active filter search
    if(speciesSearchFilter) {
      filteredAnimalSearch('https://api.petfinder.com/v2/animals?page=' + pagination);
      return;
    } 
    
    // if no active searches, load general animal cards
    if(!speciesSearchFilter && !searchFormInput.value) {
      fetch('https://api.petfinder.com/v2/animals?page=' + pagination, { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
        .then(response => response.json())
        .then(data => {
          // populate another batch of animals cards to the end of container
          searchResultsContainer.insertAdjacentHTML('beforeend', generateCardTemplate(data.animals));
          return;
        })
        .catch(err => console.log(err));
    }
  });

  pagination++;
};

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}

// Initialize intersection observer for infinite scroll (inside setTimeout to avoid firing on page load)
setTimeout(function(){
  const observer = new IntersectionObserver(loadPaginationNext, options);

  const target = document.querySelector('#page-bottom');
  observer.observe(target);
}, 2000)


// // Random Cat Fact API Call
// fetch('https://meowfacts.herokuapp.com/')
//   .then(response => response.json())
//   .then(({data}) => randomCatFactContainer.insertAdjacentHTML('afterbegin', 'Cat Factoid: ' + data))
//   .catch(err => alert(err));