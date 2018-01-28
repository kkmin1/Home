<!DOCTYPE html> 
<meta charset="utf-8" />
 <?php
 $text = ''; 
if(isset($_POST['text']))
$text = $_POST['text']; 

//폼이 입력되었을 때 처리부 
if($text == 'form_submit')
 {
 echo '<xmp>'; 
print_r($_POST); 
echo '</xmp>'; 
exit; 
} 
?>
<form method="post" action="<?php echo $_SERVER['PHP_SELF']?>">   
<input type="hidden" name="text" value="form_submit" />
<textarea name="textarea1"></textarea>   
<input type="submit" value="제출하기" />
</form> 