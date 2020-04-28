<?php

$alertMails = json_decode(file_get_contents("../data/alert-mails.dat"));
$firstStr = "На сайте сделан запрос на персональную консультацию\r\n---------------------\r\n";
$secondStr = "Имя: ".$_POST['name']."\r\n";
$thirdStr = "Эл. почта: ".$_POST['email']."\r\n";
$fourthStr = "Вопрос: ".$_POST['text'];
$finalStr = $firstStr.$secondStr.$thirdStr.$fourthStr;
$mailBody = mb_convert_encoding($finalStr, "windows-1251", "auto");

$date = date ("Y-m-d H:i:s");
$strForLog = $date."\r\n".$secondSrt.$thirdStr.$fourthStr."\r\n\r\n";
$file = fopen("../data/logs/consultation.log", "a");
$ifSuccess = fputs($file, $strForLog);
fclose($file); 

foreach ($alertMails as $alertMail) {
  mail($alertMail, "Site: Новая запись на персональную консультацию", $mailBody);
}
echo json_encode((boolean) $ifSuccess);

?>