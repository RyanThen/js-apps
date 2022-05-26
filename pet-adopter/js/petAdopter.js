// display all animals on page load
fetch('https://api.petfinder.com/v2/animals/', { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
  .then(response => response.json())
  .then(data => {
    // populate animals 
    searchResultsContainer.insertAdjacentHTML('afterbegin', generateCardTemplate(data.animals));

    console.log(data);
  })
  .catch(err => console.log(err));




// // Add infinite scroll when user reaches the bottom
// let pagination = 2;

// const loadPaginationNext = (entries, observer) => {
//   entries.forEach(entry => {
//     // Display another entry
//     fetch('https://api.petfinder.com/v2/animals?page=' + pagination, { headers: { Authorization: `Bearer ${petFinderApiToken}` } })
//       .then(response => response.json())
//       .then(data => {
//         // Populate animals 
//         searchResultsContainer.insertAdjacentHTML('beforeend', generateCardTemplate(data.animals));

//         console.log(data);
//         console.log(pagination);
//       })
//       .catch(err => console.log(err));
//   });

//   pagination++;
// };

// const options = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 1.0
// }

// const observer = new IntersectionObserver(loadPaginationNext, options);

// const target = document.querySelector('#page-bottom');
// observer.observe(target);




// // Random Cat Fact API Call
// fetch('https://meowfacts.herokuapp.com/')
//   .then(response => response.json())
//   .then(({data}) => randomCatFactContainer.insertAdjacentHTML('afterbegin', 'Cat Factoid: ' + data))
//   .catch(err => alert(err));