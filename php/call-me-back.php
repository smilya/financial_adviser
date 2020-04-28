<?php

$name = $_POST['modal-name'];
$phone = $_POST['modal-phone'];
$date = date ("Y-m-d H:i:s");
$alertMails = json_decode(file_get_contents("../data/alert-mails.dat"));
$str = $date.", Имя: ".$name.", "."тел: ".$phone."\r\n";
$firstMailStr = "На сайте сделан запрос на обратный звонок\r\n---------------------\r\n";
$strForMail = $firstMailStr."Дата: ".$date."\r\n"."Имя: ".$name."\r\n"."Тел: ".$phone."\r\n";
$mailBody = mb_convert_encoding($strForMail, "windows-1251", "auto");

$data = file_get_contents("../data/logs/call-requests.log");
$newData = $data . $str;
$ifSuccess = file_put_contents("../data/logs/call-requests.log", $newData);

foreach ($alertMails as $alertMail) {
  mail($alertMail, "Site: Новый запрос на звонок", $mailBody);
}
echo json_encode((boolean) $ifSuccess);

?>