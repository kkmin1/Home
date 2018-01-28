import java.awt.*;
import java.awt.event.*;

public class Button1 implements ActionListener{     // ActionEvent를 처리한다.
  int count=0;                            // 버튼 클릭 회수를 위한 변수
  Button button=new Button("더하기");     // 버튼 객체
  Label label=new Label("0",Label.CENTER);    // 버튼 클릭 회수를 보여주기 위한 변수. 가운데 정렬
  Frame frame=new Frame("Button");
  
  public Button1(){                          // 생성자
    button.addActionListener(this);        // 이벤트 리스너를 등록한다.
    frame.add(button, "Center");
    frame.add(label,"South");
    frame.pack();
    frame.setSize(200,100);             // 윈도우 f의 크기는 폭 200, 높이 100.
    frame.setVisible(true);
  }

  public void actionPerformed(ActionEvent ae){   // 버튼을 누르면 호출된다.
    count++;                                      // 카운트 증가
    label.setText(String.valueOf(count));            // 카운트를 label에 표시한다.
  }

  public static void main(String[] args){
    Button1 but=new Button1();
    

  }
}
