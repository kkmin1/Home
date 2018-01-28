<?php
class Books {
/* Member variables */
var $price;
var $title;

/* Member functions */
function setPrice($par){
$this->price = $par;
}

function getPrice(){
echo "가격 : ".$this->price ."원<br/>";
}

function setTitle($par){
$this->title = $par;
}

function getTitle(){
echo "제목 : ". $this->title ."<br/>";
}
}

$physics = new Books;
$maths = new Books;
$chemistry = new Books;

$physics->setTitle( "Physics for High School" );
$chemistry->setTitle( "Advanced Chemistry" );
$maths->setTitle( "Algebra" );

$physics->setPrice(100000 );
$chemistry->setPrice(150000);
$maths->setPrice(70000);

$physics->getTitle();
$physics->getPrice();
$chemistry->getTitle();
$chemistry->getPrice();
$maths->getTitle();
$maths->getPrice();
?>