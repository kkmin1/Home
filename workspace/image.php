<?php 
header("Content-Type:text/html;charset=utf-8"); 
$image = imagecreatetruecolor(200, 200); 
imagefill($image, 0, 0, imagecolorallocate($image, 255, 255, 0)); // yellow
$black = imagecolorallocate($image, 0, 0, 0);
// $text = "?";
// $text = iconv("EUC-KR","UTF-8",$text); 
$text = 'Testing...';
$font = 'arial.ttf';
// imagettftext($image, 4, 0, 50, 50, $grey, $font, $text);
imagestring($image, 4, 50, 50, $text, $black); 
Header("Content-type: image/png"); 
imagepng($image); 
imagedestroy($image); 
?>