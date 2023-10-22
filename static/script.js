// function highlightText(text, search) {
//   var pattern = new RegExp("(" + search + ")", "gi");
//   return text.replace(pattern, '<span class="highlight">$1</span>');
// }

// function filterTable() {
//   var input, filter, table, tr, td, i, j, txtValue;
//   input = document.getElementById("searchInput");
//   filter = input.value.toLowerCase();
//   table = document.getElementsByClassName("data")[0];
//   tr = table.getElementsByTagName("tr");
//   var rowCount = 0; // Initialize row count to 0

//   for (i = 1; i < tr.length; i++) {
//     var rowVisible = false;
//     for (j = 0; j < tr[i].cells.length; j++) {
//       td = tr[i].cells[j];
//       if (td) {
//         txtValue = td.textContent || td.innerText;
//         var highlightedText = highlightText(txtValue, filter);
//         td.innerHTML = highlightedText; // Highlight the text in the cell
//         if (txtValue.toLowerCase().indexOf(filter) > -1) {
//           rowVisible = true;
//         }
//       }
//     }
//     if (rowVisible) {
//       tr[i].style.display = "";
//       rowCount++; // Increment row count when a row is visible
//     } else {
//       tr[i].style.display = "none";
//     }
//   }

//   // Update the row count display
//   document.getElementById("rowCount").textContent = "Rows Found: " + rowCount;
// }



function highlightText(text, search) {
  var pattern = new RegExp("(" + search + ")", "gi");
  return text.replace(pattern, '<span class="highlight">$1</span>');
}

function filterTable() {
  var input, filter, table, tr, td, i, j, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toLowerCase();
  table = document.getElementsByClassName("data")[0];
  tr = table.getElementsByTagName("tr");
  var rowCount = 0; // Initialize row count to 0

  for (i = 1; i < tr.length; i++) {
    var rowVisible = false;
    for (j = 0; j < tr[i].cells.length; j++) {
      td = tr[i].cells[j];
      if (td) {
        txtValue = td.textContent || td.innerText;
        var highlightedText = highlightText(txtValue, filter);
        td.innerHTML = highlightedText; // Highlight the text in the cell
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          rowVisible = true;
        }
      }
    }
    if (rowVisible) {
      tr[i].style.display = "";
      rowCount++; // Increment row count when a row is visible
    } else {
      tr[i].style.display = "none";
    }
  }

  // Update the row count display
  document.getElementById("rowCount").textContent = "Rows Found: " + rowCount;
}


// Function to hide columns based on column names
function hideColumns() {
  var columnNames = document.getElementById("columnInput").value.split(",");
  var table = document.getElementsByClassName("data")[0];
  var headers = table.getElementsByTagName("th");
  for (var i = 0; i < headers.length; i++) {
    if (columnNames.includes(headers[i].textContent.trim())) {
      for (var j = 0; j < table.rows.length; j++) {
        table.rows[j].cells[i].style.display = "none";
      }
    }
  }
  // Display message when columns are hidden
  document.getElementById("rowCount").textContent = "Columns hidden: " + columnNames.join(", ");
}


// Function to restore removed columns
function restoreColumns() {
  var table = document.getElementsByClassName("data")[0];
  var headers = table.getElementsByTagName("th");
  for (var i = 0; i < headers.length; i++) {
    for (var j = 0; j < table.rows.length; j++) {
      table.rows[j].cells[i].style.display = "";
    }
  }
  // Display message when columns are restored
  document.getElementById("rowCount").textContent = "Columns restored";
}