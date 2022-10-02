function oldUserInput(){
  // let oldFeeling = document.querySelector("savedNote")
   let getOldNotes = JSON.parse(localStorage.getItem("userNotes"));
   let getOldImages = JSON.parse(localStorage.getItem("SavedImage"));
   let getOldQuotes = JSON.parse(localStorage.getItem("oldQuote"));
    console.log(getOldNotes)
     for(i=0; i < 3 ; i++){
       document.getElementById("note-" + i).innerHTML = getOldNotes[i]
       $('.historyCard-container').children().eq(i).children().find(".oldQuote").text(getOldQuotes[i]);
       $('.historyCard-container').children().eq(i).children().find(".savedImage").attr("src", getOldImages[i]); 
     }
   
}
oldUserInput();

$('#clearHistorybtn').on('click', clearHistory);

function clearHistory(event){
    event.preventDefault();
    window.localStorage.clear();
    window.location.reload();
}