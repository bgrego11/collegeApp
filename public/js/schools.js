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
    newRow = $('<tr><td>'+col.College+'</td><td>'+col.City+'</td><td>'+col.State+'</td><td>'+(col.Admission*100).toFixed(2)+'</td><td>'+col.Tuition_In+'</td><td>'+col.Tuition_Out+'</td></tr>');
    newField = $('<td>')
    delBtn = $('<button>').attr('data-id', col.id)
    delBtn.addClass("btn btn-danger delBtn");
    $(".btn.btn-danger.delBtn").attr("type", "button");
    trash = $('<i>')
    trash.addClass("far fa-trash-alt")
    delBtn.append(trash);
    newField.append(delBtn);
    newRow.append(newField)
    table.append(newRow)
  }
  

  });
});

$(document).on("click",".delBtn", function(){
  self = $(this)
  row = self.parent().parent()
  id = self.data("id");
  delData = {
    user: sessionStorage.id,
    college: id
  }
  $.post("/myCollege/del", delData)
  .done(function(data) {
    if (data.msg = "deleted") {
      row.remove()
    }
  })
})