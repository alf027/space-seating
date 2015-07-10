/**
 * Created by Alfano on 7/10/15.
 */
var table = document.getElementById('table');
var seats = document.getElementsByClassName('seat');
var counter = 0;
for(var i=0;i<seats.length;i++) {
  if(counter % 7 === 0) {
    var row = document.createElement('tr');
    table.appendChild(row)

  }
  counter++;


}