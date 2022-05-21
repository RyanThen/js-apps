// Random Cat Fact API Call
fetch('https://meowfacts.herokuapp.com/')
  .then(response => response.json())
  .then(({data}) => randomCatFactContainer.insertAdjacentHTML('afterbegin', 'Cat Factoid: ' + data))
  .catch(err => alert(err));
  
