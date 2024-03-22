var todayDate = dayjs().format('dddd, MMMM D, YYYY, h:mm:ss a');
$("#currentDay").html(todayDate);

$(document).ready(function () {
  // Save button listener on click. 
  $(".saveBtn").on("click", function () {
    // Get values of description in JQuery
    var text = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    // Save inputted information in local storage.
    localStorage.setItem(time, text);
  })

  // Button added to clear all contents to make it easier to test/use interface.
  let clearButton = document.getElementById("clearBtn");
  clearButton.addEventListener("click", function () {
    localStorage.clear()
    window.location.reload()
  });

  function timeSlot() {
    //Set the current hour from the JQuery.
    let rightNow = dayjs().hour();

    // Set loop over the time blocks.
    $(".time-block").each(function () {
      var scheduleTime = parseInt($(this).attr("id").split("hour")[1]);

      // Overwrite color scheme with future, present and past color schemes.
      if (scheduleTime < rightNow) {
        $(this).removeClass("future");
        $(this).removeClass("present");
        $(this).addClass("past");
      }
      else if (scheduleTime === rightNow) {
        $(this).removeClass("past");
        $(this).removeClass("future");
        $(this).addClass("present");
      }
      else {
        $(this).removeClass("present");
        $(this).removeClass("past");
        $(this).addClass("future");

      }
    })
  }

  // Get inputs from hour slots if anything inputted.
  $("#8hour .description").val(localStorage.getItem("8hour"));
  $("#9hour .description").val(localStorage.getItem("9hour"));
  $("#10hour .description").val(localStorage.getItem("10hour"));
  $("#11hour .description").val(localStorage.getItem("11hour"));
  $("#12hour .description").val(localStorage.getItem("12hour"));
  $("#13hour .description").val(localStorage.getItem("13hour"));
  $("#14hour .description").val(localStorage.getItem("14hour"));
  $("#15hour .description").val(localStorage.getItem("15hour"));
  $("#16hour .description").val(localStorage.getItem("16hour"));

  timeSlot();
})

// Wait until Jquery is ready
$(document).ready(function () {
//Display current date
//Variable to append cols
  var a = dayjs().format('dddd, MMMM D, YYYY, h:mm:ss a');
  $("#display-date").text(a)
  var row = ""
  //Display 8am to 4pm.
  for (var i = 8; i <= 16; i++) {
    //Create the row elements
    row = $(`<div class="row">`)
    col1 = $(`<div class ="col-lg-2 hour">${displayAmPm(i)}</div>`)
    col2 = $(`<div class ="col-lg-8 inputcontent"><input data-input="${i}" id="textarea${i}" class="form-control textarea" type="text" name="userInput"></div>`)
    col3 = $(`<div class ="col-lg-2"><button data-id="${i}" id="savePlanner" class="btn btn-success btn-block"><i class="fas fa-save"></i> Save</button></div>`)
    row.append(col1)
    row.append(col2)
    row.append(col3)
    getlocalStorage(i)
  }
// Save button functionailty.
  $("button.btn.btn-success").click(function () {
    var id = $(this).data("id")
    var textarea = $(this).parent().siblings().find("input").val()
    localStorage.setItem(id, textarea)
  });
  //Convert 24 hour to AM/PM
  function displayAmPm(hour) {
    var b = ""
    if (hour <= 12) {
      b = "AM"
    } else {
      b = "PM"
    }
    hour = hour % 12
    hour = hour ? hour : 12
    return hour + " " + b
  }
});

function getlocalStorage(hour) {
  let inputval = localStorage.getItem(hour)
  if (true) {
    $("input").data(`input${hour}`)
    var text = $(`input#textarea${hour}`).val(inputval)
    console.log(text)
  }
}
