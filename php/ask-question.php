<?php

$name = $_POST['name'];
$email = $_POST['email'];
$question = $_POST['question'];
$date = date ("Y-m-d H:i:s");

$str = "Имя: ".$name.", ".'эл. почта: '.$email."\r\n"."Вопрос: ".$question."\r\n";

$mailBody = mb_convert_encoding($str, "windows-1251", "auto");
mail("smilya@yandex.ru", "Site: Задан новый вопрос", $mailBody);

$logData = file_get_contents("../data/questions.log");
$newLogData = $logData.$date." ".$str."\r\n";
$ifSuccess = file_put_contents("../data/questions.log", $newLogData);

echo $ifSuccess;

?>