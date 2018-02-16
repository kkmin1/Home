# gnuplot을 실행한 후 화면에서 아래 명령을 실행. 경로는 eco-cobweb.gnu가 있는 경로를 써주면 된다. 예로 
# gnuplot> load 'C:\workspace\cobweb\eco-cobweb.gnu'
# 밑의 iter 파일도 경로를 설정. 같은 폴더에 있는 것이 편하다.

set multiplot
unset key # default legend 제거  
start=1 # starting point
a=5
b=-0.7
c=1
d=1
xmin=0
xmax=10
ymin=0
ymax=10
N=12 # iteration number
de(x)=a+b*x
su(x)=c+d*x
si(x)=(x-c)/d
set size square # x, y 축 길이가 같게 설정 
set xlabel "Q(quantity)"
set ylabel "P(price)"
set label "demand" at 6,de(6)
set label "supply" at 6,su(6)
set label sprintf("%1.0f",start) at start-0.1,-0.4
set title "demand-supply cobweb diagram"
xa=start

# Specifying nohead produces an arrow drawn without a head -- a line segment
# lc : line color. 1이면 빨간색. 3이면 프른색. lt : line type
# http://www2.yukawa.kyoto-u.ac.jp/~akira.ohnishi/Lib/gnuplot.html 참조 

set arrow from xa,0 to xa,de(xa) lc 1 
i=1
load 'C:\workspace\cobweb\iter' # iter file load
plot [xmin:xmax] [ymin:ymax] de(x) with lines lc 3
plot [xmin:xmax] [ymin:ymax] su(x) with lines lc 3
unset multiplot
reset