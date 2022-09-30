// Declare API variable and query select the buttons
let API = '4bf99d80dc6e60d9f637002fca396fe9';
let imageButton = document.querySelector('#make-img');
let quoteButton = document.querySelector('#make-quote');

 let currentQuote_index;

let imageHolder = document.querySelector('.imgcard');

let imageURL;
let imageHistory = [];

//Add event listener to button
imageButton.addEventListener('click', generateImage);
quoteButton = addEventListener('click', generateQuote);
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
//  console.log(data)
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
}
// random number generator . max number 

function get_randomQuote(data){
 let randomQuote= 0 + Math.floor(Math.random() * 1643);
 
 if (data[randomQuote].author === null){
    let ifNull = "Anonymous";
   let withoutAuthor = data[randomQuote].text+ "\n"+"~"+ ifNull;
    document.getElementById("quotecard").innerHTML = withoutAuthor;
    } 
    else{
    let withAuthor = data[randomQuote].text+ "\n"+"~"+ data[randomQuote].author;
    document.getElementById("quotecard").innerHTML = withAuthor;
    }

}