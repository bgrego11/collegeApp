// Code here handles what how the page displays all of the characters
// It pings the server. The server then pings the database and displays all of the characters.

// make a get request to our api to grab every character

$(document).ready(function(){
$.get("/myCollege/"+sessionStorage.id, function(data) {
  var myData = data;
  console.log(myData);

//add colleges to table
  for (i in myData) {
    col = myData[i]
    table = $('#schoolTable')
    table.append($('<tr><td>'+col.College+'</td><td>'+col.City+'</td><td>'+col.State+'</td><td>'+(col.Admission*100).toFixed(2)+'</td><td>'+col.Tuition_In+'</td><td>'+col.Tuition_Out+'</td></tr>'))
  }
  

  });
  });