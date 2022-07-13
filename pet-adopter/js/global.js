//-- Variables --//
const allForms = document.querySelectorAll('.forms-container form');
const searchFilter = document.querySelector('#search-filter');
const searchFilterInputs = searchFilter.querySelectorAll('input')
const searchForm = document.querySelector('#search-form');
const searchFormInput = searchForm.querySelector('.search-form__search-container input');
const searchFormSubmitBtn = searchForm.querySelector('.search-form__submit-container input');

const searchTermsConfirmation = document.querySelector('.search-terms-confirmation');
const searchResultsContainer = document.querySelector('.search-results-container');

let speciesSearchFilter;
let ageSearchFilter;

// Reset search terms
const resetSearch = function() {
  searchFilterInputs.forEach(el => el.checked = false);
  speciesSearchFilter = '';
  ageSearchFilter = '';
  searchFormInput.value = '';
  searchTermsConfirmation.innerHTML = 'General search for all animals and ages';
  pagination = 2;
}

// Generate generic card template
const generateCardTemplate = function(array) {

  let cardTemplate = '';

  array.forEach(single => {
    cardTemplate += `
      <div class="card">
        <div class="card__img-container">

          ${single.photos.length != 0 
            ? "<img class='card__img' src='" + single.photos[0].medium + "'>"
            : "<div class='no-img'>no photo</div>"
          }
 
          <div class="card__img-tag">${single.status ? single.status : 'adoptability unspecified'}</div>
        </div>

        <div class="card__content-container">
          <div class="card__lead-content-container">
            <p><span class="card-descriptor--name">Name:</span> ${single.name ? single.name : 'animal has not been named yet'}</p>
            <p>${single.size ? single.size : 'unspecified size'} ${single.gender ? single.gender : 'unspecified gender'} ${single.species ? single.species : 'unspecified species'} (${single.age ? single.age : 'unspecified age'})</p>
          </div>
          
          <div class="card__inner-content-container">
            <p class="card__animal-attributes">
              Shots up-to-date: ${single.attributes.shots_current ? 'Yes' : 'No'}<br>
              Spayed/neutered: ${single.attributes.spayed_neutered ? 'Yes' : 'No'}
            </p>
            <p class="card__description">${single.description ? single.description : 'no description available'}</p>
          </div>
          
          <div class="card__trailing-content-container">
            <p class="card__trailing-content-headline">Contact Info:</p>
            <p class="card__trailing-content-text">PH: ${single.contact.phone ? single.contact.phone : 'no phone #'}</p>
            <p class="card__trailing-content-text card__trailing-content-email">Email: <span class="card__link">view email</span><span class="card__email-content">${single.contact.email ? single.contact.email : 'no email address'}</span></p>
            <p class="card__trailing-content-text">Animal ID: ${single.id ? single.id : 'no animal id'}</p>
            <p><a href="${single.url ? single.url : '#'}" class="card__link" target="_blank">PetFinder Link</a></p>
          </div>
        </div>
      </div>
    `;
  });

  return cardTemplate;
}

// Perform filtered search depending on user search criteria
const filteredAnimalSearch = function(url, htmlLocation = 'beforeend') {
  // get radio button values
  speciesSearchFilter = searchFilter['species'].value;
  ageSearchFilter = searchFilter['age'].value;

  fetch(url, { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
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
          // build filtered animal search template
          if(animal.species === speciesSingle && animal.age === ageSingle) filteredSearchTemplate += generateCardTemplate([animal]);      
          // include animals defined as 'young' and 'senior' in search results too
          if (ageSingle === 'Baby' && animal.age === 'Young' && animal.species === speciesSingle) filteredSearchTemplate += generateCardTemplate([animal]);      
          if (ageSingle === 'Adult' && animal.age === 'Senior' && animal.species === speciesSingle) filteredSearchTemplate += generateCardTemplate([animal]);      
        });

        searchResultsContainer.insertAdjacentHTML(htmlLocation, filteredSearchTemplate);
      }

      generateFilteredCards(speciesSearchFilter, ageSearchFilter);
    })
}


// Load pagination -- loadPaginationNext() determines if there is an active search and loads results accordingly
let pagination = 2;

const loadPaginationNext = (placement = 'afterbegin') => {
    // if there is an active specific search
    if(searchFormInput.value) {
      fetch('https://api.petfinder.com/v2/animals?page=' + pagination, { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
        .then(response => response.json())
        .then(data => {
          // make all strings the same for conditional check
          let searchFormInputValueRevised = searchFormInput.value.toLowerCase().trim();
          let animalNameRevised;
          
          data.animals.forEach(function(animal){
            // lower case and trim animal name
            animalNameRevised = animal.name.toLowerCase().trim();
            // generate card if name is included in search term
            if(animalNameRevised.includes(searchFormInputValueRevised)) {
              searchResultsContainer.insertAdjacentHTML(placement, generateCardTemplate([animal]));
            }
          });
        })
        .catch(err => console.log(err));
        pagination++;
        return;
    }

    // if there is an active filter search
    if(speciesSearchFilter) {
      filteredAnimalSearch('https://api.petfinder.com/v2/animals?page=' + pagination, placement);
      pagination++;
      return;
    } 
    
    // if no active searches, load general animal cards
    if(!speciesSearchFilter && !searchFormInput.value) {
      fetch('https://api.petfinder.com/v2/animals?page=' + pagination, { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
        .then(response => response.json())
        .then(data => {
          // populate another batch of animals cards to the end of container
          searchResultsContainer.insertAdjacentHTML(placement, generateCardTemplate(data.animals));
          pagination++;
          return;
        })
        .catch(err => console.log(err));
    }
    
    pagination++;
};