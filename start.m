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

% ���� ���� �����ﰢ��
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

% ������ ���� �����ﰢ��
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

% ���� ���� �����ﰢ��
function star3(n)
x = [];
for i = 1 : n
    x = strcat(x,'*');
    disp(x)
end
end

% ������ ���� �����ﰢ��
function star4(n)
x = [];
for i = 1 : n
    x = strcat(x,'*');
    s = [blanks(n-i) x];
    disp(s)
end
end

% ���ﰢ��
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




