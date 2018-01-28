

function basicShapesDemo(svg) { 
    svg.rect(20, 50, 100, 50,  
        {fill: 'yellow', stroke: 'navy', strokeWidth: 5}); 
    svg.rect(150, 50, 100, 50, 10, 10, {fill: 'green'}); 
    var g = svg.group({transform: 'translate(270 80) rotate(-30)'}); 
    svg.rect(g, 0, 0, 100, 50, 10, 10, {fill: 'none', stroke: 'purple', strokeWidth: 3}); 
    svg.circle(70, 220, 50, {fill: 'red', stroke: 'blue', strokeWidth: 5}); 
    g = svg.group({transform: 'translate(175 220)'}); 
    svg.ellipse(g, '', '', 75, 50, {fill: 'yellow'}); 
    svg.ellipse('', '', 75, 50, {transform: 'translate(300 220) rotate(-30)',  
        fill: 'none', stroke: 'blue', strokeWidth: 10}); 
    g = svg.group({stroke: 'green'}); 
    svg.line(g, 450, 120, 550, 20, {strokeWidth: 5}); 
    svg.line(g, 550, 120, 650, 20, {strokeWidth: 10}); 
    svg.line(g, 650, 120, 750, 20, {strokeWidth: 15}); 
    svg.line(g, 750, 120, 850, 20, {strokeWidth: 20}); 
    svg.line(g, 850, 120, 950, 20, {strokeWidth: 25}); 
    svg.polyline([[450,250], [475,250],[475,220],[500,220],[500,250], 
        [525,250],[525,200],[550,200],[550,250], 
        [575,250],[575,180],[600,180],[600,250], 
        [625,250],[625,160],[650,160],[650,250],[675,250]], 
        {fill: 'none', stroke: 'blue', strokeWidth: 5}); 
    svg.polygon([[800,150],[900,180],[900,240],[800,270],[700,240],[700,180]],  
        {fill: 'lime', stroke: 'blue', strokeWidth: 10}); 
}