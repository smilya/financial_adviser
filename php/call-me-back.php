<?php

$name = $_POST['modal-name'];
$phone = $_POST['modal-phone'];
$date = date ("Y-m-d H:i:s");
$str = $date.", Имя: ".$name.", "."тел: ".$phone."\r\n";

$mailBody = mb_convert_encoding($str, "windows-1251", "auto");
mail('smilya@yandex.ru', "Site: Новый запрос на звонок", $mailBody);

$data = file_get_contents("../data/call-requests.log");
$newData = $data . $str;
$ifSuccess = file_put_contents("../data/call-requests.log", $newData);

echo $ifSuccess;

?>