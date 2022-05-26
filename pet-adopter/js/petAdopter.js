// display all animals on page load
fetch('https://api.petfinder.com/v2/animals/', { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
  .then(response => response.json())
  .then(data => {
    // populate animals 
    searchResultsContainer.insertAdjacentHTML('afterbegin', generateCardTemplate(data.animals));

    console.log(data);
  })
  .catch(err => console.log(err));

// add infinite scroll when user reaches the bottom of page
let pagination = 2;

const loadPaginationNext = (entries, observer) => {
  entries.forEach(entry => {
    console.log(entry);
    // only fire when scrolling down
    if(!entry.isIntersecting) { pagination--; return; }

    // if there is an active search
    if(speciesSearchFilter) {
      filteredAnimalSearch('https://api.petfinder.com/v2/animals?page=' + pagination);
      console.log(pagination)
    } else {
      // if no active search, load general animal cards
      fetch('https://api.petfinder.com/v2/animals?page=' + pagination, { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
        .then(response => response.json())
        .then(data => {
          // populate another batch of animals cards to the end of container
          searchResultsContainer.insertAdjacentHTML('beforeend', generateCardTemplate(data.animals));

          console.log(data);
          console.log(pagination);
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

// initialize intersection observer for pagination (inside setTimeout to avoid firing on page load)
setTimeout(function(){
  const observer = new IntersectionObserver(loadPaginationNext, options);

  const target = document.querySelector('#page-bottom');
  observer.observe(target);
}, 1000)


// // Random Cat Fact API Call
// fetch('https://meowfacts.herokuapp.com/')
//   .then(response => response.json())
//   .then(({data}) => randomCatFactContainer.insertAdjacentHTML('afterbegin', 'Cat Factoid: ' + data))
//   .catch(err => alert(err));