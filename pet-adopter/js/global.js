// Variables
const randomCatFactContainer = document.querySelector('.random-cat-fact-container');
const searchResultsContainer = document.querySelector('.search-results-container');

const searchForm = document.querySelector('.search-form');
const searchFormInput = searchForm.querySelector('.search-form__search-container input');
const searchFormSubmitBtn = searchForm.querySelector('.search-form__submit-container input');

const searchFilter = document.forms['search-filter'];
let speciesSearchFilter;
let ageSearchFilter;

// Functions
const generateCardTemplate = function(array) {

  let cardTemplate = '';

  array.forEach(single => {
    cardTemplate += `
      <div class="card">
        <div class="card__img-container">
          <img class="card__img" src="${single.photos.length == 0 ? '#' : single.photos[0].medium}">
          <div class="card__img-tag">${single.status ? single.status : 'unspecified status'}</div>
        </div>

        <div class="card__content-container">
          <div class="card__lead-content-container">
            <p>Name: ${single.name ? single.name : 'animal has not been named yet'}</p>
            <p>${single.size ? single.size : 'unspecified size'} ${single.gender ? single.gender : 'unspecified gender'} ${single.species ? single.species : 'unspecified species'} (${single.age ? single.age : 'unspecified age'})</p>
          </div>
          
          <div class="card__inner-content-container accordion">
            <p class="card__animal-attributes">
              Shots up-to-date: ${single.attributes.shots_current ? 'Yes' : 'No'}<br>
              Spayed/neutered: ${single.attributes.spayed_neutered ? 'Yes' : 'No'}
            </p>
            <p class="card__description">${single.description ? single.description : 'no description available'}</p>
          </div>
          
          <div class="card__trailing-content-container">
            <p class="card__trailing-content-headline">Contact Info:</p>
            <p class="card__trailing-content-text">PH: ${single.contact.phone ? single.contact.phone : 'no phone #'}</p>
            <p class="card__trailing-content-text">Email: ${single.contact.email ? single.contact.email : 'no email address'}</p>
            <p class="card__trailing-content-text">Animal ID: ${single.id ? single.id : 'no animal id'}</p>
            <p><a href="${single.url ? single.url : '#'}" target="_blank">PetFinder Link</a></p>
          </div>
        </div>
      </div>
    `;
  });

  return cardTemplate;
}


const filteredAnimalSearch = function(url) {
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
          // build filted search template
          if(animal.species === speciesSingle && animal.age === ageSingle) filteredSearchTemplate += generateCardTemplate([animal]);      
        });
    
        searchResultsContainer.insertAdjacentHTML('afterbegin', filteredSearchTemplate);
      }
    
      generateFilteredCards(speciesSearchFilter, ageSearchFilter);
    })
}