<?php 
if ( $_POST["name"] || $_POST["age"] ) { 
if (preg_match("/[^A-Za-z'-]/",$_POST['name'] )) { 
die ("invalid name and name should be alpha"); 
}  
echo "Welcome ". $_POST['name']. "<br />"; 
echo "You are ". $_POST['age']. " years old.";  exit(); 
} 
?> 
