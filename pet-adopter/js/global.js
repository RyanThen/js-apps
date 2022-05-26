// Variables
const randomCatFactContainer = document.querySelector('.random-cat-fact-container');
const searchResultsContainer = document.querySelector('.search-results-container');

// Functions
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