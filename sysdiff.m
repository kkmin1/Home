function x_dot = f (x, t) 
 
     r = 0.15;
     k = 1.6;
     a = 1.25;
     b = 0.12;
     c = 0.89;
     d = 0.58;
 
     x_dot(1) = r*x(1)*(1 - x(1)/k) - a*x(1)*x(2)/(1 + b*x(1));
     x_dot(2) = c*a*x(1)*x(2)/(1 + b*x(1)) - d*x(2);
  
endfunction

x = lsode ("f", [1; 2], (t = linspace (0, 50, 200)'));

plot (t, x)