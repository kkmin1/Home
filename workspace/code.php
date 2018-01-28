<!-- Created by kkmin -->

	
<!DOCTYPE html>

<html>
<head>

<meta charset="utf8">
<script src=https://code.jquery.com/jquery-3.1.1.js>
</script>
<link rel="stylesheet" type="text/css" href="code.css">
</head>


<body>
<div style=margin:10px>
<h1>프로그래밍 언어별 "Hello World" 출력 문법</h1>
</div>

<ul>

<li id=0>C++</li>

<li id=1>C#</li>

<li id=2>Java</li>

<li id=3>Python</li>

<li id=4>Ruby</li>

<li id=5>PHP</li>

<li id=6>HTML</li>

<li id=7>CSS</li>

<li id=8>JavaScript</li>

</ul>


<div style=margin:10px>

<span id=code></span>

</div>

<script>
var codes=[
'<pre>#include &lt;iostream&gt;\nusing namespace std;\n\nint main() {\n    <b>cout &lt;&lt; "Hello World";</b>\n    return 0;\n}</pre>',
'<pre>using System;\nusing System.Collections.Generic;\nusing System.Linq;\nusing System.Text;\nusing System.Threading.Tasks;\n\nnamespace SoloLearn\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            <b>Console.WriteLine("Hello World");</b>\n        }\n    }\n}</pre>',
'<pre>public class Program\n{\n    public static void main(String[] args) {\n        <b>System.out.println("Hello World");</b>\n    }\n}</pre>','<pre><b>print("Hello World")</b></pre>','<pre><b>puts "Hello World"</b></pre>','<pre>&lt;?php\n    <b>echo "Hello World";</b>\n?&gt;</pre>',"<pre>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n    &lt;head&gt;\n        &lt;title&gt;Page Title&lt;/title&gt;\n    &lt;/head&gt;\n    &lt;body&gt;\n        <b>Hello World</b>\n    &lt;/body&gt;\n&lt;/html&gt;</pre>",'<pre><b>body:before {\n    content: "Hello World";\n}</b></pre>','<pre><b>document.write("Hello World");</b></pre>'];var parts=['    cout &lt;&lt; "Hello World";','            Console.WriteLine("Hello World");','        System.out.println("Hello World");','print("Hello World")','puts "Hello World"','    echo "Hello World";',"        Hello World",'body:before { content: "Hello World"; }','document.write("Hello World");'];
var current=null;
$(function()
{
$("li").click(function(b)
{
var a=b.target.id;
if(a<codes.length)
{
current=a;
$(b.target).siblings().removeClass("background_selected");
$(this).addClass("background_selected");
$("#code").html("");
$("#code").slideUp(200);
$("#code").html(codes[a]);
$("#code").fadeIn(500)
}
else
{
if(current!=null)
{
var c=$("<input>");
$("body").append(c);
var d=document.createElement("div");
d.innerHTML=parts[current];
c.val(d.innerText).select();
document.execCommand("copy");
c.remove()}}})
}
);
</script>

     
<footer>
      Created by &copy; kkmin 2018
</footer>
        
        
</body>

</html>

