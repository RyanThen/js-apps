// Search options button functionality
const searchMethodContainer = document.querySelector('.search-method-container');
const searchMethodSingleContainer = searchMethodContainer.querySelectorAll('.search-method-single-container');
const searchMethods = document.querySelectorAll('.search-method');
const loadMoreBtn = document.querySelector('.load-more-btn button');

// open first form on page load
allForms[0].classList.add('search-form-show');

searchMethodContainer.addEventListener('click', function(e) {
  resetSearch();
  // hide all forms
  allForms.forEach((el, index) => allForms[index].classList.remove('search-form-show'));
  // remove active class from search method
  searchMethodSingleContainer.forEach((searchMethodContainer) => searchMethodContainer.classList.contains('active-search') ? searchMethodContainer.classList.remove('active-search') : '');
  // show selected form
  searchMethods.forEach(function(el, i) {
    if(e.target === el) { 
      allForms[i].classList.add('search-form-show');
      el.closest('.search-method-single-container').classList.add('active-search');
    }
  })
})

// Search form - specific search
const searchSpecificAnimal = function(searchFromInputValue) {
  // if search term is a number
  if(!isNaN(searchFromInputValue)) {
    fetch('https://api.petfinder.com/v2/animals/' + searchFromInputValue, { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
      .then(response => response.json())
      .then(data => { 
        // replace search results container content with new animal 
        searchResultsContainer.innerHTML = generateCardTemplate([data.animal]) ;
      })
      .catch(() => searchResultsContainer.innerHTML = '<p>No search results found, please try again or load more results.<p>');
  }

  // if search term is a string
  if(typeof searchFromInputValue === 'string') {
    // clear search results container
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
      .catch(() => searchResultsContainer.innerHTML = '<p>No search results found, please try again or load more results.<p>');
  }

}

// search form button functionality
searchFormSubmitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  searchSpecificAnimal(searchFormInput.value);
  searchTermsConfirmation.innerHTML = `<p>Searching for animal name or ID: ${searchFormInput.value}</p>`;
  pagination = 2;
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
  // display search details to user
  searchTermsConfirmation.innerHTML = `<p>Searching for ${ageSearchFilter === 'No Preference' ? 'all' : ageSearchFilter.toLowerCase()} ${speciesSearchFilter === 'No Preference' ? 'animals' : speciesSearchFilter.toLowerCase() + 's'}</p>`;
  // perform search
  filteredAnimalSearch('https://api.petfinder.com/v2/animals/');
  pagination = 2;
});


// Clear button
const searchMethodClear = document.querySelector('.search-method-clear');

searchMethodClear.addEventListener('click', function() {
  // clear search results container and populate with generic search
  fetch('https://api.petfinder.com/v2/animals', { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
    .then(response => response.json())
    .then(data => {
      searchResultsContainer.innerHTML = generateCardTemplate(data.animals);
    })
    .catch(err => console.log(err));

    resetSearch();
})