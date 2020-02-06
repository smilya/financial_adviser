<?php

$firstStr = "На сайте сделан запрос на персональную консультацию\r\n---------------------\r\n";
$secondStr = "Имя: ".$_POST['name']."\r\n";
$thirdStr = "Эл. почта: ".$_POST['email']."\r\n";
$fourthStr = "Вопрос: ".$_POST['text'];
$finalStr = $firstStr.$secondStr.$thirdStr.$fourthStr;

$mailBody = mb_convert_encoding($finalStr, "windows-1251", "auto");

mail('smilya@yandex.ru', "Site: Новая запись на персональную консультацию", $mailBody);

?>