// Search form - specific search
const searchSpecificAnimal = function(searchFromInputValue) {
  // if search term is a number
  if(!isNaN(searchFromInputValue)) {
    fetch('https://api.petfinder.com/v2/animals/' + searchFromInputValue, { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
      .then(response => response.json())
      .then(data => { 
        // replace search results container content with new animal 
        searchResultsContainer.innerHTML = generateCardTemplate([data.animal]);
      })
      .catch(err => console.log(err));
  } else {
    // if search term is a string
    searchResultsContainer.innerHTML = '';

    fetch('https://api.petfinder.com/v2/animals/', { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
      .then(response => response.json())
      .then(data => {
        // revise strings in order to compare for conditional check
        let searchFormInputValueRevised = searchFromInputValue.toLowerCase().trim();
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
  }  // end else

}

// search form button functionality
searchFormSubmitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  searchSpecificAnimal(searchFormInput.value);
});


// Search filter -- generic search
const searchFilterSpeciesGroupWrap = searchFilter.querySelector('.search-filter--species-group');
const searchFilterAgeGroupWrap = searchFilter.querySelector('.search-filter--age-group');
const searchFilterSubmitBtn = searchFilter.querySelector('.search-filter__submit-container');

searchFilterSubmitBtn.addEventListener('click', function(e){
  e.preventDefault();
  // get radio button values
  speciesSearchFilter = searchFilter['species'].value;
  ageSearchFilter = searchFilter['age'].value;
  // if filtered search form not completed by user
  if(!speciesSearchFilter || !ageSearchFilter) { 
    alert('Please complete search filters.');
    return;
  }
  // clear search results container
  searchResultsContainer.innerHTML = '';

  filteredAnimalSearch('https://api.petfinder.com/v2/animals/');
});