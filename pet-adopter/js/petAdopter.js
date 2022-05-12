const petFinderApiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwVEVlRWdmeVdicGhkNFpjQlEzam5UWHI5ckhjcE92eDQ3UlBYanBqcEZjUm1ubW9wZyIsImp0aSI6ImY5OGNmNTcyYTA1Yzc3N2RkYjg1YjIxMzNjNmU3NGI3NzVhZTVkOGNhNTYzMzBkZjE4MzAxMGI1YWI4OWQyYjYxNmJjYzI3OGI5ODNkN2U0IiwiaWF0IjoxNjUyMzE3MTc0LCJuYmYiOjE2NTIzMTcxNzQsImV4cCI6MTY1MjMyMDc3NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.a0N9ZIG8Y8bkY5o1xE-AGOumukYDcwBH67BY6pp3F9mDIOaWw0JPvb1-qlSQYPu9if3GjyNP90vMPQgTxMzrvUsbvgA5w1rQKh5kK9eDhKGyGfLsYY_p7rWSbACD_rVCiOckBY4mmm5QH8U-af5bM-UHpy66tyYLl_v8JsGa-C-CGpaHFNdhr6TlKDbMOZhI6UbvUNjAXS19efBMEMB4oPQbmGmCq5YpQMVPsbvbzBI0VLuZhfHQspqShOz0hs1ZD8-y6qlp0lSa9OvjZFF58wWlTkawEviqR-001U9499dlbalJqF40ZV3xxJtR4t261pKFQK6E5SvRcV-QJNbfKw';

const randomCatFactContainer = document.querySelector('.random-cat-fact-container');
const petFinderContainer = document.querySelector('.pet-finder-container');

const searchForm = document.querySelector('.search-form');
const searchFormInput = searchForm.querySelector('.search-form__search-container input');
const searchFormSubmitBtn = searchForm.querySelector('.search-form__submit-container input');

// PetFinder API Call -- Search By ID
const searchAnimalById = function(searchFromInputValue) {
  fetch('https://api.petfinder.com/v2/animals/' + searchFromInputValue, { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
    .then(response => response.json())
    .then( data => { 
      petFinderContainer.insertAdjacentHTML('beforebegin', `
        <div class="pet-finder-container">
        <div class="card">
          <div class="card__img-container">
            <img class="card__img" src="${data.animal.photos.length == 0 ? '#' : data.animal.photos[0].medium}">
            <div class="card__img-tag">${data.animal.status ? data.animal.status : 'unspecified status'}</div>
          </div>

          <div class="card__content-container">
            <div class="card__lead-content-container">
              <p>Name: ${data.animal.name ? data.animal.name : 'animal has not been named yet'}</p>
              <p>${data.animal.size ? data.animal.size : 'unspecified size'} ${data.animal.gender ? data.animal.gender : 'unspecified gender'} ${data.animal.species ? data.animal.species : 'unspecified species'} (${data.animal.age ? data.animal.age : 'unspecified age'})</p>
            </div>
            
            <div class="card__inner-content-container accordion">
              <p class="card__animal-attributes">
                Shots up-to-date: ${data.animal.attributes.shots_current ? 'Yes' : 'No'}<br>
                Spayed/neutered: ${data.animal.attributes.spayed_neutered ? 'Yes' : 'No'}
              </p>
              <p class="card__description">${data.animal.description ? data.animal.description : 'no description available'}</p>
            </div>
            
            <div class="card__trailing-content-container">
              <p class="card__trailing-content-headline">Contact Info:</p>
              <p class="card__trailing-content-text">PH: ${data.animal.contact.phone ? data.animal.contact.phone : 'no phone #'}</p>
              <p class="card__trailing-content-text">Email: ${data.animal.contact.email ? data.animal.contact.email : 'no email address'}</p>
              <p class="card__trailing-content-text">Animal ID: ${data.animal.id ? data.animal.id : 'no Animal ID'}</p>
              <p><a href="${data.animal.url ? data.animal.url : '#'}" target="_blank">PetFinder Link</a></p>
            </div>
          </div>

        </div>
        </div>

      `);
    });
}

searchFormSubmitBtn.addEventListener('click', function(e) {
  e.preventDefault();

  const searchFromInputValue = searchFormInput.value;
  searchAnimalById(searchFromInputValue);

  console.log(searchFormInput.value);
});

// PetFinder API Call -- All Animals
fetch('https://api.petfinder.com/v2/animals/', { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
  .then(response => response.json())
  .then( (data) => {
    data.animals.forEach((animal) => {
      petFinderContainer.insertAdjacentHTML('beforeend', `
        <div class="card">
          <div class="card__img-container">
            <img class="card__img" src="${animal.photos.length == 0 ? '#' : animal.photos[0].medium}">
            <div class="card__img-tag">${animal.status ? animal.status : 'unspecified status'}</div>
          </div>

          <div class="card__content-container">
            <div class="card__lead-content-container">
              <p>Name: ${animal.name ? animal.name : 'animal has not been named yet'}</p>
              <p>${animal.size ? animal.size : 'unspecified size'} ${animal.gender ? animal.gender : 'unspecified gender'} ${animal.species ? animal.species : 'unspecified species'} (${animal.age ? animal.age : 'unspecified age'})</p>
            </div>
            
            <div class="card__inner-content-container accordion">
              <p class="card__animal-attributes">
                Shots up-to-date: ${animal.attributes.shots_current ? 'Yes' : 'No'}<br>
                Spayed/neutered: ${animal.attributes.spayed_neutered ? 'Yes' : 'No'}
              </p>
              <p class="card__description">${animal.description ? animal.description : 'no description available'}</p>
            </div>
            
            <div class="card__trailing-content-container">
              <p class="card__trailing-content-headline">Contact Info:</p>
              <p class="card__trailing-content-text">PH: ${animal.contact.phone ? animal.contact.phone : 'no phone #'}</p>
              <p class="card__trailing-content-text">Email: ${animal.contact.email ? animal.contact.email : 'no email address'}</p>
              <p class="card__trailing-content-text">Animal ID: ${animal.id ? animal.id : 'no animal id'}</p>
              <p><a href="${animal.url ? animal.url : '#'}" target="_blank">PetFinder Link</a></p>
            </div>
          </div>

        </div>
      `);
    })

    console.log(data);
  })
  // .catch(err => alert(err));

  // Random Cat Fact API Call
fetch('https://meowfacts.herokuapp.com/')
  .then(response => response.json())
  .then(({data}) => randomCatFactContainer.insertAdjacentHTML('afterbegin', 'Cat Factoid: ' + data))
  .catch(err => alert(err));
  
