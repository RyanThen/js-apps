/* ------------------------------------------ //
Set up form to generate info cards where users
can learn more about various animals/breeds.
// ------------------------------------------ */

// The Dog API Call
fetch('https://api.thedogapi.com/v1/breeds/search?q=collie', { headers: { "x-api-key": theDogApiKey } })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => alert(err));



// Random Cat Fact API Call (Meow Facts)
// fetch('https://meowfacts.herokuapp.com/')
//   .then(response => response.json())
//   .then(({data}) => randomCatFactContainer.insertAdjacentHTML('afterbegin', 'Cat Factoid: ' + data))
//   .catch(err => alert(err));