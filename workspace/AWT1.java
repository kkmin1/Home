import java.awt.*;                            // x1

public class AWT1{

  public static void main(String[] args){

    Frame f=new Frame("자바 GUI 연습");    // 전체창 윈도우(프레임 객체,f)를 만든다. 제목에 "자바 GUI 연습"라고 표시 
    Button b1=new Button("확인");   // 버튼을 만든다. 버튼에 "확인" 표기 
    
    f.add(new Button("NORTH"),BorderLayout.NORTH);  // 버튼 b1을 추가한다. 버튼의 위치는 북쪽.

    f.add(new Button("WEST"),BorderLayout.WEST);

    f.add(new Button("CENTER"),BorderLayout.CENTER);

    f.add(new Button("EAST"),BorderLayout.EAST);   // 버튼 b2를 추가한다. 버튼의 위치는 동쪽.
    Panel p=new Panel();                     // 패널 p를 만든다.

    p.setBackground(new Color(194,194,194));   // 패널 p의 배경색을 노란색으로
    

    p.add(b1); //패널 p에 버튼 b1 추가.
    p.add(new Button("취소"));  // 패널 p에 버튼 b2 추가. 직접 이런 식으로 해도 됨.
    
    
                                      
    f.add(p,BorderLayout.SOUTH);   // 윈도우 프레임 f 남쪽에 패널 p를 추가한다. 패널은 전체창 윈도우 프레임 안에 존재하는 작은 창을 의미 
    f.setSize(200,100);             // 윈도우 f의 크기는 폭 200, 높이 100.
    f.pack();
    f.setVisible(true);             // 윈도우 f를 보이게 한다.

  }

}
