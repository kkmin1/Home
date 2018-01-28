import java.awt.*;
import javax.swing.*;

public class awtExam
{
 //    Frame f = new Frame("자바 GUI test");
	JFrame f = new JFrame("자바 GUI test");  // swing에서는 Frame대신 JFrame을 사용.
	Button button = new Button("button");
	
	public void createFrame()
	{
		//프레임에 컴포넌트 추가
		f.add(button);
		
		//프레임 크기 지정
		f.setSize(300, 600);
		
		//프레임 보이기
		f.setVisible(true);

             //swing에만 있는 X버튼 클릭시 종료
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

	public static void main(String[] args)
	{
		//프레임 열기
		awtExam frame = new awtExam();
		frame.createFrame();
        }
}
