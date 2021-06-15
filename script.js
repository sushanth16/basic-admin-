// var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

$(function() {
    $.get("https://607e95f802a23c0017e8ba2f.mockapi.io/habib-admin", function(
      customerData
    ) {
      for (var i = 0; i < customerData.length; i++) {
        if (i == 0) {
          createTableRow(customerData[i], 0);
        } else {
          createTableRow(customerData[i]);
        }
      }
  
      $(".data-row").click(function(e) {
        var clickedItemId = e.currentTarget.firstChild.innerText;
        console.log(e.currentTarget.className);
  
        var customerDetails = customerData.filter(
          details => details.id == clickedItemId
        )[0];
  
        $(".data-row").removeClass("active");
        e.currentTarget.className = "data-row active";
        updateDetails(customerDetails);
      });
  
      // Search functionality
  
      $("#search-box").on("input", function() {
        var tr = $("tr");
        var searchString = this.value;
  
        for (var j = 1; j < tr.length; j++) {
          var dataString = "";
          for (var k = 0; k < 5; k++) {
            dataString += tr[j].childNodes[k].innerText + " ";
          }
  
          console.log(searchString, dataString);
  
          var isPresent = dataString
            .toLowerCase()
            .includes(searchString.toLowerCase());
  
          console.log(isPresent, tr[j]);
  
          if (isPresent) {
            console.log(tr[j]);
            tr[j].classList.remove("display-class");
          } else {
            tr[j].classList.add("display-class");
          }
        }
      });
    });
  
    // Dynamic data creation
  
    function createTableRow(personData, index) {
      if (index == 0) {
        var tableDataRow = $("<tr>").addClass("data-row active");
      } else {
        var tableDataRow = $("<tr>").addClass("data-row ");
      }
  
      var personId = $("<td>")
        .addClass("column-1")
        .text(personData.id);
      var firstName = $("<td>")
        .addClass("column-2")
        .text(personData.firstName);
      var lastName = $("<td>")
        .addClass("column-3")
        .text(personData.lastName);
      var personEmail = $("<td>")
        .addClass("column-4")
        .text(personData.email);
      var personPhone = $("<td>")
        .addClass("column-5")
        .text(personData.phone);
  
      tableDataRow.append(
        personId,
        firstName,
        lastName,
        personEmail,
        personPhone
      );
  
      $("tbody").append(tableDataRow);
    }
  
    function updateDetails(userDetails) {
      var { firstName, lastName, description, address } = userDetails;
      var { streetAddress, city, state, zip } = address;
      console.log(zip);
  
      $("#user-selected").html(`<b>User selected:</b> ${firstName} ${lastName}`);
      $("textarea").text(`description ${description}`);
      $("#address").html(`<b>Address:</b> ${streetAddress}`);
      $("#city").html(`<b>City:</b> ${city}`);
      $("#state").html(`<b>State:</b> ${state} `);
      $("#zip-code").html(`<b>Zip:</b> ${zip}`);
    }
  });