// Function to print the contents of the local storage into each of the three respective containers
function oldUserInput(){
   let getOldNotes = JSON.parse(localStorage.getItem("userNotes"));
   let getOldImages = JSON.parse(localStorage.getItem("SavedImage"));
   let getOldQuotes = JSON.parse(localStorage.getItem("oldQuote"));
    console.log(getOldNotes)
     for(i=0; i < 3 ; i++){
        if (!getOldNotes[i]){
            document.getElementById("note-" + i).innerHTML = "";
        }
        else{
       document.getElementById("note-" + i).innerHTML = getOldNotes[i]
        }
        if (!getOldQuotes[i]){
            $('.historyCard-container').children().eq(i).children().find(".oldQuote").text("");
        }
        else{
            $('.historyCard-container').children().eq(i).children().find(".oldQuote").text(getOldQuotes[i]);
        }
       $('.historyCard-container').children().eq(i).children().find(".savedImage").attr("src", getOldImages[i]); 
     }
   
}
// Execute function on page load
oldUserInput();
// Event listener for the clear history button
$('#clearHistorybtn').on('click', clearHistory);
// Function to clear the local storage and reload the window
function clearHistory(event){
    event.preventDefault();
    window.localStorage.clear();
    window.location.reload();
}