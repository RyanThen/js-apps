//-- Search form --//
const searchForm = document.querySelector('.search-form');
const searchFormInput = searchForm.querySelector('.search-form__search-container input');
const searchFormSubmitBtn = searchForm.querySelector('.search-form__submit-container input');

// search for a specific animal
const searchSpecificAnimal = function(searchFromInputValue) {
  // if search term is a number
  if(!isNaN(searchFromInputValue)) {
    fetch('https://api.petfinder.com/v2/animals/' + searchFromInputValue, { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
      .then(response => response.json())
      .then(data => { 
        // replace search results container content with new animal 
        searchResultsContainer.innerHTML = generateCardTemplate([data.animal]);

        return;
      })
      .catch(err => console.log(err));
  // if search term is a string
  } else {
    fetch('https://api.petfinder.com/v2/animals/', { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
      .then(response => response.json())
      .then(data => {
        // revise strings in order to compare for conditional check
        let searchFormInputValueRevised = searchFromInputValue.toLowerCase().trim();
        let animalNameRevised;
        // loop through animal data
        data.animals.forEach(function(animal){
          // lower case and trim animal name
          animalNameRevised = animal.name.toLowerCase().trim();
          // generate card if name makes search term
          if(animalNameRevised === searchFormInputValueRevised) {
            searchResultsContainer.innerHTML = generateCardTemplate([animal]);
          }
        });
      })
      .catch(err => console.log(err));
  }  // end else

}

// search form button functionality
searchFormSubmitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  searchSpecificAnimal(searchFormInput.value);
});


//-- Filtered search --//
const searchFilter = document.forms['search-filter'];
const searchFilterSpeciesGroupWrap = searchFilter.querySelector('.search-filter--species-group');
const searchFilterAgeGroupWrap = searchFilter.querySelector('.search-filter--age-group');
const searchFilterSubmitBtn = searchFilter.querySelector('.search-filter__submit-container');

let speciesSearchFilter;
let ageSearchFilter;

searchFilterSubmitBtn.addEventListener('click', function(e){
  e.preventDefault();
  // get radio button group values
  speciesSearchFilter = searchFilter['species'].value;
  ageSearchFilter = searchFilter['age'].value;
  // if filtered search form not completed by user
  if(!speciesSearchFilter || !ageSearchFilter) { 
    alert('Please complete search filters.');
    return;
  }
  // clear search results container
  searchResultsContainer.innerHTML = '';

  fetch('https://api.petfinder.com/v2/animals/', { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
    .then(response => response.json())
    .then(data => {
      // generate filtered search cards
      const generateFilteredCards = function(species, age) {
        let speciesSingle;
        let ageSingle;
        let filteredSearchTemplate = '';

        data.animals.forEach(function(animal){
          // set search filter values for subsequent conditional checks
          species === 'No Preference' ? speciesSingle = animal.species : speciesSingle = species;
          age === 'No Preference' ? ageSingle = animal.age : ageSingle = age;
          // build filted search template
          if(animal.species === speciesSingle && animal.age === ageSingle) filteredSearchTemplate += generateCardTemplate([animal]);      
        });

        searchResultsContainer.insertAdjacentHTML('afterbegin', filteredSearchTemplate);
      }

      generateFilteredCards(speciesSearchFilter, ageSearchFilter);
    })

});