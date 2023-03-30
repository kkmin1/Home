% print star image

star1(7);
disp(" ");
star2(7);
disp(" ");
star3(7);
disp(" ");
star4(7);
disp(" ");
star5(7);

% 왼쪽 붙은 직각삼각형
function star1(n)
for y=1:n
for x=1:n
  if x < y
  fprintf('*');
  end
end
fprintf('\n');
end
end

% 오른쪽 붙은 직각삼각형
function star2(n)
for y=1:n
for x=1:n
  if n-x < y
    fprintf('*');
  else
    fprintf(' ');
  end
end
fprintf('\n');
end
end

% 왼쪽 붙은 직각삼각형
function star3(n)
x = [];
for i = 1 : n
    x = strcat(x,'*');
    disp(x)
end
end

% 오른쪽 붙은 직각삼각형
function star4(n)
x = [];
for i = 1 : n
    x = strcat(x,'*');
    s = [blanks(n-i) x];
    disp(s)
end
end

% 정삼각형
function star5(n)

x = [];
for i = 1 : n
    x = strcat(x,'*');
    s = [blanks(n-i) x];
    if i == 1
      disp([s]); % no symmetry print in first line
    end
    disp([s fliplr(s)])
end
end




