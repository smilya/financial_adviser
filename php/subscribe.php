<?php

$newMail = file_get_contents('php://input');
$allMails = file_get_contents("../data/subscription.dat");
$allNewMails = $allMails.$newMail.",";
$ifSuccess = file_put_contents("../data/subscription.dat", $allNewMails);

$date = date ("Y-m-d H:i:s");
$fromLog = file_get_contents("../data/subscription.log");
$toMail = $date.": ".$newMail."\r\n";
$toLog = $fromLog.$toMail;
$ifLogSuccess = file_put_contents("../data/subscription.log", $toLog);

mail('smilya@yandex.ru', "Site: Новая подписка на рассылку", $toMail);

echo ($ifSuccess && $ifLogSuccess);

?>