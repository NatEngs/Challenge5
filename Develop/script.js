// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// $(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// });

// Wait until Jquery is ready
$( document ).ready(function() {
  //Display current date
  //Variable to append cols
var a= moment().format('dddd MMMM Do YYYY, h:mm');
  $("#display-date").text(a)
  var row = ""
  //loop to dispaly 9am-18pm
    for (var i= 9 ; i<=18; i++){
      // Creation of the row elements
      row = $(`<div class="row">`)
      col1 = $(`<div class ="col-lg-2 hour">${displayAmorPm(i)}</div>`)
      col2 = $(`<div class ="col-lg-8 inputcontent"><input data-input="${i}" id="inputText${i}" class="form-control inputText" type="text" name="userInput"></div>`)
      col3 = $(`<div class ="col-lg-2"><button data-id="${i}" id="savePlanner" class="btn btn-success btn-block"><i class="fas fa-save"></i> Save</button></div>`)
      row.append(col1)
      row.append(col2)
      row.append(col3)
      $("#display-planner").append(row)
      getlocalStorage(i)
    }
   $("button.btn.btn-success").click(function(e){
   var id = $(this).data("id")
   var inputText = $(this).parent().siblings().find("input").val()
   localStorage.setItem(id,inputText)
   })
  //  Convert Am to Pm
   function displayAmorPm(hour){
     var b=""
     if(hour<=12){
       b= "AM"
     }else{
       b="PM"
     }
     hour = hour % 12
     hour = hour ? hour : 12
     return hour + " " + b
   }
  });

   function getlocalStorage(hour){
     let inputval = localStorage.getItem(hour)
     if(true){
      //  $("input").data(`input${hour}`)
      var text= $(`input#inputText${hour}`).val(inputval)
      console.log(text)
     }
   }
   //Apdate color
   function updateColor(){
     var hour = new Date().getHours();
     for (var i= 9 ; i<=18; i++){
       console.log(hour,i)
       if(hour==i ) {
        $(`#inputText${i}`).css("background","red")
       }else  if(hour<i ){
        
         $(`#inputText${i}`).css("background","lightblue")

       }
     }
   }
   setInterval(function(){
     updateColor()
   },1000)