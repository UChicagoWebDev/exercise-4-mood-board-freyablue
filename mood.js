//mood.js
const bing_api_endpoint = "https://api.bing.microsoft.com/v7.0/images/search";
BING_API_KEY = "a506e7c8978b49f88d844976daa5d6b0";
const bing_api_key = BING_API_KEY;


function runSearch() {

  // TODO: Clear the results pane before you run a new search

  clearResultsPane();

  // TODO: Build your query by combining the bing_api_endpoint and a query attribute
  //  named 'q' that takes the value from the search bar input field.
  const query = document.querySelector(".search input").value;

  let request = new XMLHttpRequest();

  // TODO: Construct the request object and add appropriate event listeners to
  // handle responses. See:
  // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_XMLHttpRequest
  request.open("GET", `${bing_api_endpoint}?q=${encodeURIComponent(query)}`);
  request.setRequestHeader("Ocp-Apim-Subscription-Key",bing_api_key);
    //   - You'll want to specify that you want json as your response type
  request.responseType = "json";


  //   - Look for your data in event.target.response
  //   - When adding headers, also include the commented out line below. See the API docs at:
  // https://docs.microsoft.com/en-us/bing/search-apis/bing-image-search/reference/headers
  //   - When you get your responses, add elements to the DOM in #resultsImageContainer to
  //     display them to the user
  //   - HINT: You'll need to ad even listeners to them after you add them to the DOM
  //
  // request.setRequestHeader("Ocp-Apim-Subscription-Key", bing_api_key);

  

  request.onload = function (){
    if (request.status==200){ //ok
      const res = request.response.value;
      displayImages(res);
      
    } else{
      console.error("Error", request.statusText);
    }
  };
  // TODO: Send the request
  request.send();

  return false;  // Keep this; it keeps the browser from sending the event
                  // further up the DOM chain. Here, we don't want to trigger
                  // the default form submission behavior.
}

function clearResultsPane() {
  // TODO: Clear the results pane
  const resultsImageContainer = document.querySelector("#resultsImageContainer");
  resultsImageContainer.innerHTML = "";
}

function displayImages(results) {
  const resultsImageContainer = document.querySelector("#resultsImageContainer");

  // TODO: Loop through the results and add them to the DOM
  results.forEach((result) => {
    const resultImage = document.createElement("div");
    resultImage.classList.add("resultImage");

    const image = document.createElement("img");
    image.src = result.thumbnailUrl;

    resultImage.appendChild(image);
    resultsImageContainer.appendChild(resultImage);

    // TODO: Add event listeners to the images
    image.addEventListener("click", function () {
      addImageToBoard(result.contentUrl);
    });
  });

  openResultsPane();
}

function addImageToBoard(imageUrl) {
  // TODO: Implement adding the selected image to the user's mood board
  const board = document.querySelector("#board");

  const savedImage = document.createElement("div");
  savedImage.classList.add("savedImage");

  const image = document.createElement("img");
  image.src = imageUrl;

  savedImage.appendChild(image);
  board.appendChild(savedImage);
}

function openResultsPane() {
  // This will make the results pane visible.
  document.querySelector("#resultsExpander").classList.add("open");
}

function closeResultsPane() {
  // This will make the results pane hidden again.
  document.querySelector("#resultsExpander").classList.remove("open");
}

// This will 
document.querySelector("#runSearchButton").addEventListener("click", runSearch);
document.querySelector(".search input").addEventListener("keypress", (e) => {
  if (e.key == "Enter") {runSearch()}
});

document.querySelector("#closeResultsButton").addEventListener("click", closeResultsPane);
document.querySelector("body").addEventListener("keydown", (e) => {
  if(e.key == "Escape") {closeResultsPane()}
});
