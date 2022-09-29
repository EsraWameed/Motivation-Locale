// Declare API variable and query select the buttons
var API = '4bf99d80dc6e60d9f637002fca396fe9';
var imageButton = document.querySelector('#make-img');

//Add event listener to button
imageButton.addEventListener('click', generateImage);

// On button click, generate image metadata from up to page 1000 on the API
function generateImage(event){
    event.preventDefault();
    var pagenumber = 1 + Math.floor(Math.random() * 2000);
    console.log('click');
    var requestURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" +API+"&per_page=20&tags=pet&page=" +pagenumber+"&format=json&nojsoncallback=1";
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
    })
}