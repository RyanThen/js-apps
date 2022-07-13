// Slideout Functionality
const fixedBtnRight = document.querySelector('.fixed-btn--right');

const slideoutContainer = document.querySelector('.slideout-container');
const slideoutContentContainer = document.querySelector('.slideout-content-container');
const learnMoreSelector1 = document.querySelector('#learn-more-select-1');
const learnMoreSelector2 = document.querySelector('#learn-more-select-2');
const closeCTA = document.querySelector('.close');

// Build dropdown selector lists
let breedSelectorTemplate;

const buildDropdownSelectorList = function(apiKey, htmlContainer, url) {
  fetch(url, { headers: { "x-api-key": apiKey } })
    .then(response => response.json())
    .then(data => {
      // build <option> list template for dropdown
      data.forEach(breed => {
        breedSelectorTemplate += `
          <option value="${breed.name}" ${data.name === breed.name ? 'selected': ''}>${breed.name}</option>
        `
      });
      // inject <option> list template into HTML
      htmlContainer.insertAdjacentHTML('beforeend', breedSelectorTemplate);
      // reset template for next dropdown list
      breedSelectorTemplate = '';
    });
}

buildDropdownSelectorList(theDogApiKey, learnMoreSelector1, 'https://api.thedogapi.com/v1/breeds');
buildDropdownSelectorList(theCatApiKey, learnMoreSelector2, 'https://api.thecatapi.com/v1/breeds');

// Generate animal fact card when breed is selected in dropdown (pulling from TheDogApi and TheCatApi)
let dropdownActiveSelection;
let animalApiKey;
let breedImageID;
let animalFactCardHtmlTemplate;
let animalFactCardImg;

const generateAnimalFactCard = function(animal = 'dog') {
  // configure function based on animal defined in parameters
  if(animal === 'dog') {
    dropdownActiveSelection = learnMoreSelector1.options[learnMoreSelector1.selectedIndex].text;
    animalApiKey = theDogApiKey;
  }

  if(animal === 'cat') {
    dropdownActiveSelection = learnMoreSelector2.options[learnMoreSelector2.selectedIndex].text;
    animalApiKey = theCatApiKey;
  }

  // get data for selected breed
  fetch(`https://api.the${animal}api.com/v1/breeds/search?q=${dropdownActiveSelection}`, { headers: { "x-api-key": animalApiKey } })
    .then(response => response.json())
    .then(data => {
      // get breed image
      breedImageID = data[0].reference_image_id;

      // create animal fact card templates 
      if(animal === 'dog') { 
        animalFactCardHtmlTemplate = `
          <div class="dog-card-container animal-fact-card-container">
            <div class="animal-fact-img-container">
              <img src="#" class="animal-fact-img">
            </div>
        
            <div class="animal-fact-content-container">
              <p class="animal-fact"><span class="animal-fact-descriptor">Breed:</span> ${data[0].name}</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Breed group:</span> ${data[0].breed_group}</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Origin:</span> ${data[0].origin}</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Bred for:</span> ${data[0].bred_for}</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Temperament:</span> ${data[0].temperament}</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Life span:</span> ${data[0].life_span}</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Height:</span> ${data[0].height.metric} cm (${data[0].height.imperial} in)</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Weight:</span> ${data[0].weight.metric} kg (${data[0].weight.imperial} lbs)</p>
            </div>
          </div>
        `
      }

      if(animal === 'cat') { 
        animalFactCardHtmlTemplate = `
          <div class="cat-card-container animal-fact-card-container">
            <div class="animal-fact-img-container">
              <img src="#" class="animal-fact-img">
            </div>
        
            <div class="animal-fact-content-container">
              <p class="animal-fact"><span class="animal-fact-descriptor">Breed:</span> ${data[0].name}</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Child friendly:</span> ${data[0].child_friendly}</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Dog friendly:</span> ${data[0].dog_friendly}</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Temperament:</span> ${data[0].temperament}</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Life span:</span> ${data[0].life_span}</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Origin:</span> ${data[0].origin}</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Weight:</span> ${data[0].weight.metric} kg (${data[0].weight.imperial} lbs)</p>
              <p class="animal-fact"><span class="animal-fact-descriptor">Description:</span> ${data[0].description}</p>
            </div>
          </div>
        `
      }

      // set animal card content
      slideoutContentContainer.innerHTML = animalFactCardHtmlTemplate;
      // api call to get animal card image
      return fetch(`https://api.the${animal}api.com/v1/images/${breedImageID}`, { headers: { "x-api-key": animalApiKey } })
    })
    .then(response => response.json())
    .then(data => {
      // set animal card image url
      animalFactCardImg = document.querySelector('.animal-fact-img');
      animalFactCardImg.setAttribute('src', data.url);
    })
    .catch(err => console.log(err));
}

// on DOG dropdown selector change
learnMoreSelector1.addEventListener('change', () => generateAnimalFactCard('dog'));
// on CAT dropdown selector change
learnMoreSelector2.addEventListener('change', () => generateAnimalFactCard('cat'));

// Open-close functionality for slideout
let isOpen = false;

const openCloseSlideout = function() {
  if(isOpen) {
    slideoutContainer.setAttribute('style', 'right: -100%');
    isOpen = false;
  } else {
    slideoutContainer.setAttribute('style', 'right: 0');
    isOpen = true;
  }
}

fixedBtnRight.addEventListener('click', function() {
  openCloseSlideout();
  generateAnimalFactCard('dog');
})

closeCTA.addEventListener('click', openCloseSlideout)

// Main nav item that triggers slideout
const navSlideoutItem = document.querySelector('#nav-slideout-item');

navSlideoutItem.addEventListener('click', function(e) {
  e.preventDefault();
  openCloseSlideout();
  generateAnimalFactCard('dog');
})

// Random Cat Fact API Call (Meow Facts)
const factoidRefresh = document.querySelector('.factoid-refresh');
const factoid = document.querySelector('.factoid');

const getCatFactoid = function() {
  fetch('https://meowfacts.herokuapp.com/')
    .then(response => response.json())
    .then(({data}) => { 
      factoid.innerHTML = data;
    })
    .catch(err => alert(err));
}

getCatFactoid();
factoidRefresh.addEventListener('click', () => getCatFactoid());