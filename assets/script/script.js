// Declare API variable and query select the buttons
let API = '4bf99d80dc6e60d9f637002fca396fe9';
let imageButton = document.getElementById('gimg');
let quoteButton = document.getElementById('gquote');
//Declare variable for the container for the images
let imageHolder = document.querySelector('.imgcard');
// Two variables to be used for randomizing the quote and image selection
let currentQuote_index;
let imageURL;
// Three variables used to build the quote strings
let theQuote;
let theAuthor;
let theQuote_theAuthor;

//Add event listener to button
imageButton.addEventListener('click', generateImage);
quoteButton.addEventListener('click', generateQuote);
// On button click, generate image metadata from up to page 500 on the API
function generateImage(event){
    event.preventDefault();
    event.stopPropagation();
    var pagenumber = 1 + Math.floor(Math.random() * 500);
    var requestURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" +API+"&per_page=20&tags=smile%2Canimals&tag_mode=all&page=" +pagenumber+"&safe_search=1&sort=relevance&format=json&nojsoncallback=1";
    fetch (requestURL)
    .then(function(response){
        if(response.status !=200)
        {
            console.log('Failed search');
            return;
        }
        else {
            return response.json();
        }
    })
    .then(function(data){
       // With the data first get a random number based on the length of the photo array returned
        var imagenumber = 1 + Math.floor(Math.random() * (data.photos.photo.length -1));
        // Then set variables to the server, the ID, and the secret
        var serverID = data.photos.photo[imagenumber].server;
        var imageID = data.photos.photo[imagenumber].id;
        var secretID = data.photos.photo[imagenumber].secret;
        // Build a URL string from the three variables, then set the src of the container for the image to it
        imageURL = "https://live.staticflickr.com/"+serverID+"/"+imageID+"_"+secretID+"_w.jpg";
        imageHolder.setAttribute("src", imageURL);
    })
}
// On quote button click, generate quote metadata
function generateQuote(event){
    event.preventDefault();
    event.stopPropagation();
    fetch("https://type.fit/api/quotes")
    .then(function(response) {
        if(response.status!=200){
            console.log('Failed search');
            return;
        }
        else {
        return response.json();
        }
    })
    .then(function(data) {
        // Then get a random quote with said data
        get_randomQuote(data);

    });
}

// The function to generate and return a random quote
function get_randomQuote(data){
    let randomQuote= 0 + Math.floor(Math.random() * 1643);
    console.log(data)
    theQuote = data[randomQuote].text;
   theAuthor = data[randomQuote].author;
   theQuote_theAuthor;
   if (data[randomQuote].author === null){
       theAuthor = "Anonymous"
    } 
   theQuote_theAuthor=theQuote + "\n~"+ theAuthor;
    
    document.getElementById("quotecard").innerHTML = theQuote_theAuthor;
       
    return;
   }
// Add a event listener to the save button
$(document).on('click', '.feeling-save', saveDisplayed);

// Function to save the generated image URL to the local storage 
function saveDisplayed(event){
    event.preventDefault();
    let imageHistory = [];
    imageHistory = JSON.parse(localStorage.getItem("SavedImage")) || []
    if (imageHistory.length < 3){
    imageHistory.unshift(imageURL);
    localStorage.setItem("SavedImage", JSON.stringify(imageHistory));
    }
    else{
        imageHistory.unshift(imageURL);
        imageHistory.splice(3, 1);
        localStorage.setItem("SavedImage", JSON.stringify(imageHistory));
    }
    // Executes the other two associated save function at the end
    saveQuoteTolocalHistory();
    saveUserInput();
}



// function to store generated quote to local storage upon clicking save
function saveQuoteTolocalHistory(){
    let quoteHistory = [];
    quoteHistory = JSON.parse(localStorage.getItem("oldQuote")) || []
        if (quoteHistory.length < 3){
            quoteHistory.unshift(theQuote_theAuthor);
      localStorage.setItem("oldQuote", JSON.stringify(quoteHistory));
        }
        else{
            quoteHistory.unshift(theQuote_theAuthor);
            quoteHistory.splice(3, 1);
            localStorage.setItem("oldQuote", JSON.stringify(quoteHistory));
        }

    }
// function to store inputted user feeling to the local storage upon clicking save
function saveUserInput(){
    let input = document.getElementById("userinput").value
    let userNotes =[];
    userNotes = JSON.parse(localStorage.getItem("userNotes")) || []
    if (userNotes.length < 3){
    userNotes.unshift(input)
    localStorage.setItem("userNotes", JSON.stringify(userNotes));
    }
    else{
        userNotes.unshift(input);
        userNotes.splice(3, 1);
        localStorage.setItem("userNotes", JSON.stringify(userNotes));
    }   


}

// Added functionality to display a modal on clicking the modal button at the top of the page
$(document).ready(function(){
    $('.modal').modal();
 });
