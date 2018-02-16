fetch('file.txt')
  .then(response => response.text())
  .then(text => console.log(text))
  // outputs the content of the text file

fetch('file.json')
  .then(response => response.json())
  .then(jsonResponse => console.log(jsonResponse))     
   // outputs a javascript object from the parsed json