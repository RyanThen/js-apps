const searchForm = document.querySelector('.search-form');
const searchFormInput = searchForm.querySelector('.search-form__search-container input');
const searchFormSubmitBtn = searchForm.querySelector('.search-form__submit-container input');

const generateCardTemplate = function(array) {

  let template = ``;

  array.forEach(single => {
    template += `
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

  return template;
}

// Display all animals on page load
fetch('https://api.petfinder.com/v2/animals/', { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
  .then(response => response.json())
  .then(data => {
    // Populate animals 
    searchResultsContainer.insertAdjacentHTML('afterbegin', generateCardTemplate(data.animals));

    console.log(data);
  })
  .catch(err => console.log(err));

// Search for a specific animal
const searchSpecificAnimal = function(searchFromInputValue) {
  // If search term is a number
  if(!isNaN(searchFromInputValue)) {
    fetch('https://api.petfinder.com/v2/animals/' + searchFromInputValue, { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
    .then(response => response.json())
    .then(data => { 
      // Replace search results container content with new animal 
      searchResultsContainer.innerHTML = generateCardTemplate([data.animal]);

      return;
    })
    .catch(err => console.log(err));
  // If search term is a string
  } else {
    fetch('https://api.petfinder.com/v2/animals/', { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
      .then(response => response.json())
      .then(data => {
        // Revise strings in order to compare for conditional check
        let searchFormInputValueRevised = searchFromInputValue.toLowerCase().trim();
        let animalNameRevised;
        // Loop through animal data
        data.animals.forEach(function(animal){
          // Lower case and trim animal name
          animalNameRevised = animal.name.toLowerCase().trim();
          // Generate card if name makes search term
          if(animalNameRevised === searchFormInputValueRevised) {
            searchResultsContainer.innerHTML = generateCardTemplate([animal]);
          }
        });
      })
      .catch(err => console.log(err));
  }  // End else

}

// Search form button functionality
searchFormSubmitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  searchSpecificAnimal(searchFormInput.value);
});


// Checkbox search
const searchCheckboxes = document.querySelector('.search-checkboxes');
const searchCheckboxesSpeciesGroupWrap = searchCheckboxes.querySelector('.search-checkboxes--species-group');
const searchCheckboxesAgeGroupWrap = searchCheckboxes.querySelector('.search-checkboxes--age-group');
const searchCheckboxesSubmitBtn = searchCheckboxes.querySelector('.search-checkboxes__submit-container');

searchCheckboxes.addEventListener('click', function(e){
  // e.preventDefault();

  if(e.target.value == 'species-dog') alert('dog');
  if(e.target.value == 'species-cat') alert('cat');
  if(e.target.value == 'species-np') alert('no pref');
});