// Slideout functionality
const fixedBtnRight = document.querySelector('.fixed-btn--right');

const slideoutContainer = document.querySelector('.slideout-container');
const slideoutContentContainer = document.querySelector('.slideout-content-container');
const learnMoreSelector = document.querySelector('#learn-more-select');
const closeCTA = document.querySelector('.close');

let animalFactsSlideoutTemplate;
let animalFactCardImg;

// build dropdown selector HTML
let breedSelectorTemplate;

fetch('https://api.thedogapi.com/v1/breeds?attach_breed=0', { headers: { "x-api-key": theDogApiKey } })
  .then(response => response.json())
  .then(data => {
    // build <option> list template for dropdown
    data.forEach(breed => {
      breedSelectorTemplate += `
        <option value="${breed.name}" ${data[0].name === breed.name ? 'selected': ''}>${breed.name}</option>
      `
    });
    // inject <option> list template into HTML
    learnMoreSelector.insertAdjacentHTML('beforeend', breedSelectorTemplate);
  }) 
  .catch(err => alert(err));


// Generate card facts when a breed is selected in learn more dropdown selector
let learnMoreSelectorActiveSelection;

const generateAnimalCard = function() {
   // find active selection
   learnMoreSelectorActiveSelection = learnMoreSelector.options[learnMoreSelector.selectedIndex].text;
   
   // get data for selected breed
   fetch(`https://api.thedogapi.com/v1/breeds/search?q=${learnMoreSelectorActiveSelection}`, { headers: { "x-api-key": theDogApiKey } })
     .then(response => response.json())
     .then(data => {
       // get breed image
       const breedimageID = data[0].reference_image_id;
       // build animal fact card template
       animalFactsSlideoutTemplate = `
         <div class="animal-fact-card-container">
 
           <div class="animal-fact-img-container">
             <img src="#" class="animal-fact-img">
           </div>
 
           <div class="animal-fact-content-container">
             <p class="animal-fact">Breed: ${data[0].name}</p>
             <p class="animal-fact">Bred for: ${data[0].bred_for}</p>
           </div>
         </div>
       `
       // set animal card content
       slideoutContentContainer.innerHTML = animalFactsSlideoutTemplate;
       // api call to get animal card image
       return fetch(`https://api.thedogapi.com/v1/images/${breedimageID}`, { headers: { "x-api-key": theDogApiKey } })
     })
    .then(response => response.json())
    .then(data => {
      // set animal card image url
      animalFactCardImg = document.querySelector('.animal-fact-img');
      animalFactCardImg.setAttribute('src', data.url);
    })
    .catch(err => alert(err));

    

  //    // get data for selected breed
  //  fetch(`https://api.thedogapi.com/v1/breeds/search?q=${learnMoreSelectorActiveSelection}`, { headers: { "x-api-key": theDogApiKey } })
  //  .then(response => response.json())
  //  .then(data => {

  //    // ################################################### //
  //    // ####### START BUILDING BREED INFO CARD HERE ####### //
  //    // ################################################### //
  //    console.log(data);
  //    animalFactCardImage = '';

  //    // get breed image
  //    const breedimageID = data[0].reference_image_id;

  //    const fetchImage = fetch(`https://api.thedogapi.com/v1/images/${breedimageID}`, { headers: { "x-api-key": theDogApiKey } })
  //      .then(response => response.json())
  //      .then(data => animalFactCardImage = data.url)
  //      .catch(err => alert(err));

  //    animalFactsSlideoutTemplate = `
  //      <div class="animal-fact-card-container">

  //        <div class="animal-fact-img-container">
  //          <img src="" class="animal-fact-img">
  //        </div>

  //        <div class="animal-fact-content-container">
  //          <p class="animal-fact">${'lorem ipsum'}</p>
  //        </div>
  //      </div>
  //    `

  //    slideoutContentContainer.innerHTML = animalFactsSlideoutTemplate;

  //    // ################################################### //
  //    // ####### END BUILDING BREED INFO CARD HERE ####### //
  //    // ################################################### //

  //  })
  //  .catch(err => alert(err));


     
   // console.log('text:', learnMoreSelector.options[learnMoreSelector.selectedIndex].text);
   // console.log('value:', learnMoreSelector.options[learnMoreSelector.selectedIndex].value);
}

learnMoreSelector.addEventListener('change', function() {
  generateAnimalCard();
});


// Random Cat Fact API Call (Meow Facts)
const factoid = document.querySelector('.factoid');

fetch('https://meowfacts.herokuapp.com/')
  .then(response => response.json())
  .then(({data}) => factoid.innerHTML = 'Cat Factoid: ' + data)
  .catch(err => alert(err));



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
  generateAnimalCard();
})

closeCTA.addEventListener('click', openCloseSlideout)