function leftRightTringle(n)

for i = 1, n do
	for j = 1, i do
		io.write("*")
	end
	io.write("\n") -- print()는 자동 줄바꿈
end
end

n = 5
leftRightTringle(n)
