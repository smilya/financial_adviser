<?php

$newMail = file_get_contents('php://input');
$alertMails = json_decode(file_get_contents("../data/alert-mails.dat"));
//$allMails = file_get_contents("../data/subscription.dat");
//$allNewMails = $allMails.$newMail.",";
//$ifSuccess = file_put_contents("../data/subscription.dat", $allNewMails);
$date = date ("Y-m-d H:i:s");
$fromLog = file_get_contents("../data/logs/subscription.log");

$toMail = $date.": ".$newMail."\r\n";
$toLog = $fromLog.$toMail;
$ifSuccess = file_put_contents("../data/logs/subscription.log", $toLog);
$toMail = "На сайте сделан новый запрос на подписку\r\n---------------------\r\n".$toMail;
$mailBody = mb_convert_encoding($toMail, "windows-1251", "auto");

foreach ($alertMails as $alertMail) {
  mail($alertMail, "Site: Новая подписка на рассылку", $mailBody);
}
echo json_encode((boolean) $ifSuccess);

?>