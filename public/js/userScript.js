

// take values
$("#create").on("click", function(event) {
  event.preventDefault();
  user = {
      name: $('#name').val().trim(),
      password: $('#pw').val().trim()
  }
  console.log(user)

// post users to database

  $.post("/user/create", user)

  .done(function(data){
      if (data.msg === "user created") {
      sessionStorage.setItem("id", data.id);
       sessionStorage.setItem("name", data.name);

      window.open('/search', "_self")
    }
    else {
        $("#valid").html("username already exists")
    }
      


  })



});

$("#login").on("click", function(event) {
  event.preventDefault();
  user = {
      name: $('#name').val().trim(),
      password: $('#pw').val().trim()
  }
  console.log(user)

  $.post("/user/login", user)

  .done(function(data){
      console.log(data)
      sessionStorage.setItem("id", data.id)
      sessionStorage.setItem("name", data.name)
      console.log(sessionStorage)
      window.open('/search', "_self")

  })
});

var firstBox = $('#createUser').val();
var secondBox = $('#confirmPass').val().trim();

$('#butt').on('click', function(){
console.log(firstBox)
})

if(firstBox === secondBox) {
    document.getElementById('butt').disabled = false;
}


function clicker() {

    var butthole = $('#confirmPass').val()
    console.log(firstBox)
}
// make sure you 'npm install crypto --save'



