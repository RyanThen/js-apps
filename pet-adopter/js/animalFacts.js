const learnMoreSelectorContainer = document.querySelector('.learn-more-selector-container');
const learnMoreSelector = document.querySelector('#learn-more-select');
const learnMoreContainer = document.querySelector('.learn-more-container');

// Build dropdown selector HTML
let breedSelectorTemplate;

fetch('https://api.thedogapi.com/v1/breeds?attach_breed=0', { headers: { "x-api-key": theDogApiKey } })
  .then(response => response.json())
  .then(data => {
    // build <option> list template for dropdown
    data.forEach(breed => {
      breedSelectorTemplate += `
        <option value="${breed.name}">${breed.name}</option>
      `
    });
    // inject <option> list template into HTML
    learnMoreSelector.insertAdjacentHTML('beforeend', breedSelectorTemplate);
  }) 
  .catch(err => alert(err));


// Generate card facts when a breed is selected in learn more dropdown selector
let learnMoreSelectorActiveSelection;

learnMoreSelector.addEventListener('change', function() {
  // find active selection
  learnMoreSelectorActiveSelection = learnMoreSelector.options[learnMoreSelector.selectedIndex].text;
  // get data for selected breed
  fetch(`https://api.thedogapi.com/v1/breeds/search?q=${learnMoreSelectorActiveSelection}`, { headers: { "x-api-key": theDogApiKey } })
    .then(response => response.json())
    .then(data => {

      // ################################################### //
      // ####### START BUILDING BREED INFO CARD HERE ####### //
      // ################################################### //

      // get breed image
      const breedimageID = data[0].reference_image_id;
      fetch(`https://api.thedogapi.com/v1/images/${breedimageID}`, { headers: { "x-api-key": theDogApiKey } })
        .then(response => response.json())
        .then(data => console.log(data.url))
        .catch(err => alert(err));

      // ################################################### //
      // ####### END BUILDING BREED INFO CARD HERE ####### //
      // ################################################### //

    })
    .catch(err => alert(err));
    
  // console.log('text:', learnMoreSelector.options[learnMoreSelector.selectedIndex].text);
  // console.log('value:', learnMoreSelector.options[learnMoreSelector.selectedIndex].value);
});


// Random Cat Fact API Call (Meow Facts)
// fetch('https://meowfacts.herokuapp.com/')
//   .then(response => response.json())
//   .then(({data}) => randomCatFactContainer.insertAdjacentHTML('afterbegin', 'Cat Factoid: ' + data))
//   .catch(err => alert(err));