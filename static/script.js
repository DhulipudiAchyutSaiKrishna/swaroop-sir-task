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


// var originalTableHTML = ""; // Variable to store the original table HTML

// function highlightText(text, search) {
//     var pattern = new RegExp("(" + search + ")", "gi");
//     return text.replace(pattern, '<span class="highlight">$1</span>');
// }

// function filterTable() {
//     var input, filter, table, tr, td, i, j, txtValue;
//     input = document.getElementById("searchInput");
//     filter = input.value.toLowerCase();
//     table = document.getElementsByClassName("data")[0];
//     tr = table.getElementsByTagName("tr");
//     var rowCount = 0;

//     for (i = 1; i < tr.length; i++) {
//         var rowVisible = false;
//         for (j = 0; j < tr[i].cells.length; j++) {
//             td = tr[i].cells[j];
//             if (td) {
//                 txtValue = td.textContent || td.innerText;
//                 var highlightedText = highlightText(txtValue, filter);
//                 td.innerHTML = highlightedText;
//                 if (txtValue.toLowerCase().indexOf(filter) > -1) {
//                     rowVisible = true;
//                 }
//             }
//         }
//         if (rowVisible) {
//             tr[i].style.display = "";
//             rowCount++;
//         } else {
//             tr[i].style.display = "none";
//         }
//     }

//     document.getElementById("rowCount").textContent = "Rows Found: " + rowCount;
// }

// function removeColumns() {
//     var input, columnsToRemove;
//     input = document.getElementById("removeColumnsInput");
//     columnsToRemove = input.value.split(",").map(column => column.trim());

//     if (originalTableHTML === "") {
//         originalTableHTML = document.getElementsByClassName("data")[0].innerHTML;
//     }

//     var table = document.getElementsByClassName("data")[0];
//     var tr = table.getElementsByTagName("tr");

//     for (var i = 0; i < tr.length; i++) {
//         for (var j = 0; j < columnsToRemove.length; j++) {
//             var columnIndex = Array.from(tr[i].getElementsByTagName("th")).findIndex(th => th.textContent.trim() === columnsToRemove[j]);
//             if (columnIndex !== -1) {
//                 tr[i].deleteCell(columnIndex);
//             }
//         }
//     }
// }

// function restoreColumns() {
//     if (originalTableHTML !== "") {
//         document.getElementsByClassName("data")[0].innerHTML = originalTableHTML;
//     }
// }


// function downloadTable() {
//   var table = document.getElementsByClassName("data")[0];
//   var tableHTML = table.outerHTML;

//   // Create a Blob containing the table HTML
//   var blob = new Blob([tableHTML], { type: "text/html" });

//   // Create a download link
//   var a = document.createElement("a");
//   a.href = URL.createObjectURL(blob);
//   a.download = "table_data.html";

//   // Append the link to the body and trigger the download
//   document.body.appendChild(a);
//   a.click();

//   // Remove the link from the body
//   document.body.removeChild(a);
// }



var originalTableHTML = ""; // Variable to store the original table HTML

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
    var rowCount = 0;

    for (i = 1; i < tr.length; i++) {
        var rowVisible = false;
        for (j = 0; j < tr[i].cells.length; j++) {
            td = tr[i].cells[j];
            if (td) {
                txtValue = td.textContent || td.innerText;
                var highlightedText = highlightText(txtValue, filter);
                td.innerHTML = highlightedText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    rowVisible = true;
                }
            }
        }
        if (rowVisible) {
            tr[i].style.display = "";
            rowCount++;
        } else {
            tr[i].style.display = "none";
        }
    }

    document.getElementById("rowCount").textContent = "Rows Found: " + rowCount;
}

function removeColumns() {
    var input, columnsToRemove;
    input = document.getElementById("removeColumnsInput");
    columnsToRemove = input.value.split(",").map(column => column.trim());

    if (originalTableHTML === "") {
        originalTableHTML = document.getElementsByClassName("data")[0].innerHTML;
    }

    var table = document.getElementsByClassName("data")[0];
    var tr = table.getElementsByTagName("tr");

    for (var i = 0; i < tr.length; i++) {
        for (var j = 0; j < columnsToRemove.length; j++) {
            var columnIndex = Array.from(tr[i].getElementsByTagName("th")).findIndex(th => th.textContent.trim() === columnsToRemove[j]);
            if (columnIndex !== -1) {
                tr[i].deleteCell(columnIndex);
            }
        }
    }

    // After removing columns, update the search results
    filterTable();
}

function restoreColumns() {
    if (originalTableHTML !== "") {
        document.getElementsByClassName("data")[0].innerHTML = originalTableHTML;

        // After restoring columns, update the search results
        filterTable();
    }
}

function downloadTable() {
    var table = document.getElementsByClassName("data")[0];
    var tableHTML = table.outerHTML;

    // Create a Blob containing the table HTML
    var blob = new Blob([tableHTML], { type: "text/html" });

    // Create a download link
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "table_data.html";

    // Append the link to the body and trigger the download
    document.body.appendChild(a);
    a.click();

    // Remove the link from the body
    document.body.removeChild(a);
}
