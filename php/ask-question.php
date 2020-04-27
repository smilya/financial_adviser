<?php

$name = $_POST['name'];
$email = $_POST['email'];
$question = $_POST['question'];
$date = date ("Y-m-d H:i:s");

$firstStr = "На сайте задан новый вопрос\r\n---------------------\r\n";
$str = "Имя: ".$name.", ".'эл. почта: '.$email."\r\n"."Вопрос: ".$question."\r\n";
$strForMail = $firstStr.$str;
$mailBody = mb_convert_encoding($strForMail, "windows-1251", "auto");

$logData = file_get_contents("../data/questions.log");
$newLogData = $logData.$date." ".$str."\r\n";
$ifSuccess = file_put_contents("../data/questions.log", $newLogData);

mail("smilya@yandex.ru", "Site: Задан новый вопрос", $mailBody);
echo json_encode((boolean) $ifSuccess);

?>