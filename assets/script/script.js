

// Declare API variable and query select the buttons
let API = '4bf99d80dc6e60d9f637002fca396fe9';
let imageButton = document.getElementById('gimg');
let quoteButton = document.getElementById('gquote');

 let currentQuote_index;

let imageHolder = document.querySelector('.imgcard');

let imageURL;
let imageHistory = [];
let quoteHistory = [];
quoteHistory = JSON.parse(localStorage.getItem("savedQuotes"));
if(quoteHistory=== null){
    quoteHistory=[];
}

//Add event listener to button
imageButton.addEventListener('click', generateImage);
quoteButton.addEventListener('click', generateQuote);
// On button click, generate image metadata from up to page 1000 on the API
function generateImage(event){
    event.preventDefault();
    event.stopPropagation();
    var pagenumber = 1 + Math.floor(Math.random() * 250);
    console.log('click');
    var requestURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" +API+"&per_page=20&tags=smile%2Canimals&tag_mode=all&page=" +pagenumber+"&safe_search=1&sort=relevance&format=json&nojsoncallback=1";
    fetch (requestURL)
    .then(function(response){
        if(response.status !=200)
        {
            console.log('Failed search')
        }
        else {
            return response.json();
        }
    })
    .then(function(data){
        console.log(data);
        var imagenumber = 1 + Math.floor(Math.random() * (data.photos.photo.length -1));
        console.log(imagenumber);
        var serverID = data.photos.photo[imagenumber].server;
        var imageID = data.photos.photo[imagenumber].id;
        var secretID = data.photos.photo[imagenumber].secret;
       // console.log(userID);
         imageURL = "https://live.staticflickr.com/"+serverID+"/"+imageID+"_"+secretID+"_w.jpg";
        imageHolder.setAttribute("src", imageURL);
       // imageHistory.push(imageURL);
       // localStorage.setItem("SavedImage", JSON.stringify(imageHistory));
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
        }
        else{
        return response.json();
        }
    })
    .then(function(data) {
        get_randomQuote(data);

    });
}

$(document).on('click', '.feeling-save', saveDisplayed);

function saveDisplayed(event){
    event.preventDefault();
    if (imageHistory.length < 3){
    imageHistory.unshift(imageURL);
    localStorage.setItem("SavedImage", JSON.stringify(imageHistory));
    }
    else{
        imageHistory.unshift(imageURL);
        imageHistory.splice(3, 1);
        localStorage.setItem("SavedImage", JSON.stringify(imageHistory));
    }
    saveQuoteTolocalHistory();
    saveUserInput();
}

// function to generate random Quote
let theQuote;
let theAuthor;
let theQuote_theAuthor;
function get_randomQuote(data){
 let randomQuote= 0 + Math.floor(Math.random() * 1643);
 console.log(data)
 theQuote = data[randomQuote].text;
theAuthor = data[randomQuote].author;
theQuote_theAuthor;
if (data[randomQuote].author === null){
    theAuthor = "Anonymous"
} theQuote_theAuthor=theQuote + "\n~"+ theAuthor;
 
    document.getElementById("quotecard").innerHTML = theQuote_theAuthor;
    
  return randomQuote;
}

// function to store generated quote to local storage upon clicking save
function saveQuoteTolocalHistory(){

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







//let getOldNotes ;
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
 //let savebtn = document.querySelector(".feeling-save")
//savebtn.addEventListener('click', saveUserInput);



















