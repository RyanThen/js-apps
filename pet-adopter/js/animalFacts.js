/* ------------------------------------------ //
Set up form to generate info cards where users
can learn more about various animals/breeds.
// ------------------------------------------ */

const learnMoreContainer = document.querySelector('.learn-more-container');
const learnMoreSelectorContainer = document.querySelector('.learn-more-selector-container');
const learnMoreSelect = document.querySelector('#learn-more-select');

const buildLearnMoreInfoCard = function() {

  // ######################################################################################################
  // USE BELOW API CALLS TO BUILD LEARN MORE BREED INFO CARD SO USERS CAN LEARN ABOUT BREED CHARACTERISTICS
  // ######################################################################################################

  // The Dog API -- Search Specific Dog Breed
  fetch('https://api.thedogapi.com/v1/breeds/search?q=collie', { headers: { "x-api-key": theDogApiKey } })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => alert(err));

  // The Dog API -- Get Image of Dog Breed
  fetch('https://api.thedogapi.com/v1/images/A09F4c1qP', { headers: { "x-api-key": theDogApiKey } })
    .then(response => response.json())
    .then(data => console.log(data.url))
    .catch(err => alert(err));
}



// Random Cat Fact API Call (Meow Facts)
// fetch('https://meowfacts.herokuapp.com/')
//   .then(response => response.json())
//   .then(({data}) => randomCatFactContainer.insertAdjacentHTML('afterbegin', 'Cat Factoid: ' + data))
//   .catch(err => alert(err));