
//load username 

$(document).ready(function(){
  if (sessionStorage.id !== "" || undefined) {
    $('#user').html("logged in as "+sessionStorage.name )
    logBtn = $('<button>');
    logBtn.addClass("btn btn-default");
    logBtn.addClass("logout");
    logBtn.html("logout");
    $('#user').append(logBtn)
  }
  else {
    alert("you must be logged in to use this app");
    window.open('/home', "_self")
  }
//button event to handle added favorites
  $(document).on("click", ".btn-danger", function(){
    self = $(this)
    newFav = {
      user_id: sessionStorage.id,
      college_id: $(this).data("id")
    }
   $.post("/myCollege/add",newFav)
   .done(function(response){
     if (!response.msg) {
       div = self.parent()
       div.empty();
       div.html("added to favs")
     }
     else {
       //code to say list is full
     }
   })
  
   
  })
 

 //logout button clear session and send to home page
  $(document).on("click", ".logout", function(){
    sessionStorage.id = ""
    sessionStorage.name = ""
    window.open('/home', "_self")
  
   
  })


})


//search function
$("#admitButton").on("click", function(event) {
  event.preventDefault();
  //create an array from html option values to use as the range for college query
  adRange = []
  admit = parseFloat($("#admitList option:selected").val())
    if (admit === 1) {
      adRange = [-.1,1]
    }
    else if (admit === .8) {
      adRange = [.8,1]
    }
    else if (admit === .5 ) {
      adRange = [.5, .7]
    }
    else if (admit === .2) {
      adRange = [.01, .5]
    }
//check if state was input -- if not set state to wildcard for query
state =  $("#stateList").val().trim()
if (state === "") {
  state = "%"
}
//create search/query object for api call
    var search = {
    // name from name input
    state :  state,
    admit: adRange,
    tuition: $("#costList option:selected").val()
  };

  console.log(search);

    // send an AJAX POST-request with jQuery
  $.post("/api/college", search)
    // on success, run this callback
    .done(function(data) {
      // log the data we found
      console.log(data);
      $('#search-results').empty();
// create html for each college object in the array returned by query make fave buttons
for (i in data) {
  newDiv = $("<div>");
  newDiv.addClass("well");
  newDiv.append($('<h4>').html(data[i].College));
  newDiv.append($('<h5>').html(data[i].City+", "+data[i].State));
  var link = $('<a>').attr("href", "http://"+data[i].Webstie);
  favBtn = $('<button>').attr("data-id", data[i].id);
  favBtn.addClass("btn btn-danger pull-right");
  $(".btn.btn-danger.pull-right").attr("type", "button");
  heart = $('<i>').addClass('fas fa-heart');
  favBtn.append(heart);
  newDiv.append(favBtn);
  


  newDiv.append((link.html(data[i].Webstie)));
  $('#search-results').append(newDiv);

}

$('#myModal').modal('show')

      //show modal
      $('#myModal').modal();
    });
});





