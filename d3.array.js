<html>
   <head>
      <script type = "text/javascript" src = "https://d3js.org/d3.v4.min.js"></script>
   </head>
 
   <body>
      <h3>D3 collection API</h3>
      <script>
         var month = {"jan": 1, "Feb": 2, "mar": 3, "apr": 4};
         console.log(d3.keys(month));
         console.log(d3.values(month));
         console.log(d3.entries(month));
      </script>
   </body>
</html>