package main 
import ("fmt")
 
func main() { 

var age  int // input에 55 입력. 
fmt.Println("What is your age?") 
fmt.Scan(&age) 
fmt.Println("당신의 나이는 ",age,"살입니다.")


var age2 string // input에 55살 입력
fmt.Println("What is your age?") 
fmt.Scan(&age2) 
fmt.Println("당신의 나이는 ", age2, "입니다.")

var name string 
fmt.Println("이름 :") 
fmt.Scan(&name)
fmt.Println("당신의 이름은 ", name, "입니다")
}
