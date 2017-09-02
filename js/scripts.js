// Followed tutorial - https://freshman.tech/wikipedia-javascript/

// ----- //

// parameter takes event that triggers execution of function
function handleSubmit(event) {
    // prevents page from reloading when form is submitted
    event.preventDefault();
    // get value of the input field
    const input = document.querySelector(".searchForm-input").value;
    // remove whitespace from the input
    const searchQuery = input.trim();
    // print `searchQuery` to the console
    fetchResults(searchQuery);
}

// makes actual request to wiki
function fetchResults(searchQuery) {
        // when fetchResults() is called, whatever is passed in as an argument (the user’s searchQuery) will be interpolated into our endpoint variable as the value of the &srsearch= parameter
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
   
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const results = data.query.search;
            displayResults(results);       
         });
}

function displayResults(results) {
    // store a reference to `.searchResults`
    const searchResults = document.querySelector(".searchResults");
    // remove all child elements
    searchResults.innerHTML = "";
    // loop over results array 
    results.forEach(result => {
        // result here represents each object in our array
        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
       
        // appends each result to .searchResults node using insertAdjacentHTML
        searchResults.insertAdjacentHTML("beforeend",
        `<div class="resultItem">
          <h3 class="resultItem-title">
            <a href="${url}" target="_blank" rel="noreferrer">${result.title}</a>
          </h3>
          <span class="resultItem-snippet">${result.snippet}</span><br>
          <a href="${url}" class="resultItem-link" target="_blank" rel="noreferrer">${url}</a>
        </div>`
      );
    });
}

// references form element and stores it in a variable
const form = document.querySelector(".searchForm");

// listens to submit event on form element to capture search query when form is submitted
form.addEventListener('submit', handleSubmit);