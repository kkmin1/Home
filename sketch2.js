
      // Define the differential equations
      function dx_dt(x, y) {
        return 2*x - y;
      }
      function dy_dt(x, y) {
        return x + y;
      }

      // Define the range of x and y values to plot
      const xMin_box = -5;
      const xMax_box = 5;
      const yMin_box = -5;
      const yMax_box = 5;
      margin = 3;
      const xMin = xMin_box + margin;
      const xMax = xMax_box - margin;
      const yMin = yMin_box + margin;
      const yMax = yMax_box - margin;

      // Define the step size for the x and y values
      const xStep = 0.1;
      const yStep = 0.1;

      // Define the canvas size
      const canvasWidth = 600;
      const canvasHeight = 600;

      // Set up the canvas
      function setup() {
        createCanvas(canvasWidth, canvasHeight);
        background(255);
       
      }

      // Draw an arrow at the given position, pointing in the given direction
      function drawArrow(x, y, dx, dy, arrowSize) {
        push();
        translate(x, y);
        rotate(-atan2(-dy, dx));
        line(0, 0, arrowSize, 0);
        fill(0, 0, 255);
        triangle(arrowSize, 0, arrowSize * 0.7, arrowSize * 0.2, arrowSize * 0.7, -arrowSize * 0.2);
        pop();
      }

      // Draw the phase diagram

      /* The draw() function in p5.js runs as a loop. The code inside the draw() function runs continuously from top to bottom until the program is stopped. */

      function draw() {
        // Draw x and y axis
        const axis_margin = 40;
        stroke(0);
        strokeWeight(1);
        line(axis_margin, height/2, width, height/2);
        line(axis_margin, height-yMin-axis_margin, width, height-yMin-axis_margin);
        line(width/2, 0, width/2, height-axis_margin);
        line(0+axis_margin, 0, 0+axis_margin, height-axis_margin);

        // Draw tick marks for x and y axis
        const xs = 0.5;
        const ys = 0.5;
        const text_size = 12;

        for (let x = xMin; x <= xMax; x += xs) {
            const xPixel = map(x, xMin, xMax, 0, width);
            line(xPixel, height-40, xPixel, height-35);  // 눈금선
            textSize(text_size);
            fill(0, 0, 0); // text color
            text(x, xPixel, height-20); // text(이름, x좌표, y좌표)
            
        }
        textSize(24);
        textFont('Georgia');
        fill(255, 0, 0); // text color red
        text('x', (width+20)/2, height); // x 축 이름
        

        for (let y = yMin; y <= yMax; y += ys) {
            const yPixel = map(y, yMin, yMax, height, 0);
            line(35, yPixel, 40, yPixel);
            textSize(text_size);
            fill(0, 0, 0); // text color
            text(y, 20, yPixel);
        }
        textSize(24);
        textFont('Georgia');
        fill(255, 0, 0); // text color red
        text('y', 5, (height-20)/2); // y 축 이름

        // Loop over all x and y values and draw an arrow at each point
        const arrow_margin = 0.4;
        for (let x = xMin + arrow_margin; x <= xMax; x += xStep) {
          for (let y = yMin + arrow_margin; y <= yMax; y += yStep) {
            // Calculate the rate of change for this point
            const dx = dx_dt(x, y);
            const dy = dy_dt(x, y);

            // Normalize the rate of change
            const magnitude = Math.sqrt(dx*dx + dy*dy);
            const dxNorm = dx / magnitude;
            const dyNorm = dy / magnitude;

            // Draw an arrow at this point, with length proportional to the magnitude of the rate of change
            const arrowLength = magnitude * 10;
            const arrowSize = arrowLength / 5;
            const xPixel = map(x, xMin, xMax, 0, width);
            const yPixel = map(y, yMin, yMax, height, 0);
            stroke(0, 0, 255);
            strokeWeight(1);
            drawArrow(xPixel, yPixel, dxNorm * arrowLength, -dyNorm * arrowLength, arrowSize);
          
        }
    }
      

      
            // Choose an initial condition
            const x0 = 0.1;
            const y0 = 0.1;

            // Define the time step for the integration
            const dt = 0.05;

            // Define the number of steps to integrate
            const numSteps = 200;

            // Integrate the differential equations using Euler's method
            let x = x0;
            let y = y0;
            const trajectory = [[x, y]];
            for (let i = 0; i < numSteps; i++) {
            const dx = dx_dt(x, y);
            const dy = dy_dt(x, y);
            x += dx * dt;
            y += dy * dt;
            trajectory.push([x, y]);
            }

            /* // Plot the trajectory as a curve
            noFill();
            stroke(255, 0, 0);
            strokeWeight(2);
            beginShape();
            for (const [x, y] of trajectory) {
            const xPixel = map(x, xMin, xMax, 0, width);
            const yPixel = map(y, yMin, yMax, height, 0);
            vertex(xPixel, yPixel);
            }
            endShape(); */

            // Plot the trajectory as a curve with arrow in the middle
 noFill();
stroke(255, 0, 0);
strokeWeight(2); 
beginShape();

for (let i = 0; i < trajectory.length; i++) {
  const [x, y] = trajectory[i];
  const xPixel = map(x, xMin, xMax, 0, width);
  const yPixel = map(y, yMin, yMax, height, 0);
  vertex(xPixel, yPixel);
  // Add arrow in the middle of the trajectory
  if (i === Math.floor(trajectory.length / 2)) {
    const prevX = map(trajectory[i - 1][0], xMin, xMax, 0, width);
    const prevY = map(trajectory[i - 1][1], yMin, yMax, height, 0);
    const nextX = map(trajectory[i + 1][0], xMin, xMax, 0, width);
    const nextY = map(trajectory[i + 1][1], yMin, yMax, height, 0);
    const angle = atan2(nextY - prevY, nextX - prevX);
    const arrowSize = 10;
    push();
    translate(xPixel, yPixel);
    rotate(angle);
    fill(0, 255, 0); // 초록색으로 색 지정
    triangle(-arrowSize, arrowSize / 2, -arrowSize, -arrowSize / 2, 0, 0);
    pop();
  }
}
endShape();

      }
    

            
          

/* // Draw the trajectory starting from this point
noFill();
stroke(255, 0, 0);
strokeWeight(2);
beginShape();
vertex(xPixel, yPixel);
for (let i = 0; i < 4; i++) {
  const newX = x + dx * i * 0.05;
  const newY = y + dy * i * 0.05;
  const newXPixel = map(newX, xMin, xMax, 0, width);
  const newYPixel = map(newY, yMin, yMax, height, 0);
  vertex(newXPixel, newYPixel);
  if (i === 2) {  // Add an arrow at the midpoint of the trajectory
    const arrowStartX = newXPixel - dxNorm * arrowLength / 2;
    const arrowStartY = newYPixel + dyNorm * arrowLength / 2;
    drawArrow(arrowStartX, arrowStartY, dxNorm * arrowLength, -dyNorm * arrowLength, arrowSize);
  }
}
endShape(); */
