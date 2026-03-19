<!-- Created by Adem AKKUŞ, remaked by kkmin -->

<!doctype html>
<html>
<head>
<title>Domain ve IP Address</title>
<meta charset="utf8">
<style>
body{
    background-color: #000000;
    color: #9f6e8d;
    /*text-align: center;*/
}
table{
    border:1px solid #abc;
    
}
td{
    width: 200px;
    text-align: center;
}
a{
    color: #8f3e4d;
}
div{
    background-color:pink;
    
    
}
</style>
</head>
<body>
<div>
<h1>웹주소 및 ip 주소표</h1>
<?php
$domains = ['memurlar.net', 'sololearn.com', 'youtube.com', 'gazi.edu.tr', 'w3schools.com', 'turkcell.com','stackoverflow.com','github.com','w3.org','apachefriends.org','codementor.io','iconfinder.com','codecourse.com','phpacademy.org','theonlytutorials.com','zeit.co','javascript.com','reactjs.org','webappers.com','windows.php.net','laracasts.com','try.jquery.com','pspad.com'];
sort($domains);
echo '<table border=1><th>웹주소</th><th>IP 주소</th>';
foreach($domains as $domain)
{
   $ip = gethostbyname($domain);
   echo '<tr><td><a href=http://.'.$domain. '>'.$domain.'</a></td><td>' . $ip .'</td></tr>';
}
echo '</table>';
?>
</div>


        <footer>
                    Created in HTML && CSS && PHP by &copy; Adem Akkus 2017 for <a href="https://www.sololearn.com">SOLOLEARN.COM</a>
        </footer>
        
        
        
</body>
</html>