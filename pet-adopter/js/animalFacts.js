// Slideout functionality
const fixedBtnRight = document.querySelector('.fixed-btn--right');

const slideoutContainer = document.querySelector('.slideout-container');
const slideoutContentContainer = document.querySelector('.slideout-content-container');
const learnMoreSelector1 = document.querySelector('#learn-more-select-1');
const learnMoreSelector2 = document.querySelector('#learn-more-select-2');
const closeCTA = document.querySelector('.close');

let animalFactsSlideoutTemplate;
let animalFactCardImg;
let breedImageID;

// build dropdown selector lists
let breedSelectorTemplate;

const buildDropdownSelectorList = function(apiKey, htmlContainer, url) {
  fetch(url, { headers: { "x-api-key": apiKey } })
    .then(response => response.json())
    .then(data => {

      console.log(data);

      // build <option> list template for dropdown
      data.forEach(breed => {
        breedSelectorTemplate += `
          <option value="${breed.name}" ${data.name === breed.name ? 'selected': ''}>${breed.name}</option>
        `
      });
      // inject <option> list template into HTML
      htmlContainer.insertAdjacentHTML('beforeend', breedSelectorTemplate);

      breedSelectorTemplate = '';
    });
}

buildDropdownSelectorList(theDogApiKey, learnMoreSelector1, 'https://api.thedogapi.com/v1/breeds');
buildDropdownSelectorList(theCatApiKey, learnMoreSelector2, 'https://api.thecatapi.com/v1/breeds');



// Generate DOG card when a breed is selected in dropdown
let dropdownActiveSelection1;

const generateDogCard = function() {
   // find active selection
   dropdownActiveSelection1 = learnMoreSelector1.options[learnMoreSelector1.selectedIndex].text;
   
   // get data for selected breed
   fetch(`https://api.thedogapi.com/v1/breeds/search?q=${dropdownActiveSelection1}`, { headers: { "x-api-key": theDogApiKey } })
     .then(response => response.json())
     .then(data => {

      console.log(data);

       // get breed image
       breedImageID = data[0].reference_image_id;
       // build animal fact card template
       animalFactsSlideoutTemplate = `
         <div class="dog-card-container animal-fact-card-container">
           <div class="animal-fact-img-container">
             <img src="#" class="animal-fact-img">
           </div>
 
           <div class="animal-fact-content-container">
             <p class="animal-fact">Breed: ${data[0].name}</p>
             <p class="animal-fact">Breed group: ${data[0].breed_group}</p>
             <p class="animal-fact">Origin: ${data[0].origin}</p>
             <p class="animal-fact">Bred for: ${data[0].bred_for}</p>
             <p class="animal-fact">Temperament: ${data[0].temperament}</p>
             <p class="animal-fact">Life span: ${data[0].life_span}</p>
             <p class="animal-fact">Height: ${data[0].height.metric} cm (${data[0].height.imperial} in)</p>
             <p class="animal-fact">Weight: ${data[0].weight.metric} kg (${data[0].weight.imperial} lbs)</p>
           </div>
         </div>
       `
       // set animal card content
       slideoutContentContainer.innerHTML = animalFactsSlideoutTemplate;
       // api call to get animal card image
       return fetch(`https://api.thedogapi.com/v1/images/${breedImageID}`, { headers: { "x-api-key": theDogApiKey } })
     })
    .then(response => response.json())
    .then(data => {
      // set animal card image url
      animalFactCardImg = document.querySelector('.dog-card-container .animal-fact-img');
      animalFactCardImg.setAttribute('src', data.url);
    })
    .catch(err => alert(err));
     
   // console.log('text:', learnMoreSelector1.options[learnMoreSelector1.selectedIndex].text);
   // console.log('value:', learnMoreSelector1.options[learnMoreSelector1.selectedIndex].value);
}

learnMoreSelector1.addEventListener('change', function() {
  generateDogCard();
});


// Generate CAT card when a breed is selected in dropdown
let dropdownActiveSelection2;

const generateCatCard = function() {
  // find active selection
  dropdownActiveSelection2 = learnMoreSelector2.options[learnMoreSelector2.selectedIndex].text;
  
  // get data for selected breed
  fetch(`https://api.thecatapi.com/v1/breeds/search?q=${dropdownActiveSelection2}`, { headers: { "x-api-key": theCatApiKey } })
    .then(response => response.json())
    .then(data => {

      console.log(data);  

      // get breed image
      breedImageID = data[0].reference_image_id;
      // build animal fact card template
      animalFactsSlideoutTemplate = `
        <div class="cat-card-container animal-fact-card-container">
          <div class="animal-fact-img-container">
            <img src="#" class="animal-fact-img">
          </div>

          <div class="animal-fact-content-container">
            <p class="animal-fact">Breed: ${data[0].name}</p>
            <p class="animal-fact">Child friendly: ${data[0].child_friendly}</p>
            <p class="animal-fact">Dog friendly: ${data[0].dog_friendly}</p>
            <p class="animal-fact">Temperament: ${data[0].temperament}</p>
            <p class="animal-fact">Life span: ${data[0].life_span}</p>
            <p class="animal-fact">Origin: ${data[0].origin}</p>
            <p class="animal-fact">Weight: ${data[0].weight.metric} kg (${data[0].weight.imperial} lbs)</p>
            <p class="animal-fact">Description: ${data[0].description}</p>
          </div>
        </div>
      `
      // set animal card content
      slideoutContentContainer.innerHTML = animalFactsSlideoutTemplate;
      // api call to get animal card image
      return fetch(`https://api.thecatapi.com/v1/images/${breedImageID}`, { headers: { "x-api-key": theCatApiKey } })
    })
    .then(response => response.json())
    .then(data => {
      // set animal card image url
      animalFactCardImg = document.querySelector('.cat-card-container .animal-fact-img');
      animalFactCardImg.setAttribute('src', data.url);
    })
    .catch(err => alert(err));
}

learnMoreSelector2.addEventListener('change', function() {
  generateCatCard();
});



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

// Open-Close functionality for slideout
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
  openCloseSlideout()
  generateDogCard();
})

closeCTA.addEventListener('click', openCloseSlideout)