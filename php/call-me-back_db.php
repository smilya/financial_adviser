<?php
require('../../dbc_finance.php');
if (!mysqli_ping($dbc)) {
  echo json_encode(false);
  die();
}
$name = $_POST['modal-name'];
$name = mysqli_real_escape_string($dbc, $name);
$phone = $_POST['modal-phone'];
$phone = mysqli_real_escape_string($dbc, $phone);

$query = "INSERT INTO call_requests (timestamp, name, phone) VALUES (NOW(), '$name', '$phone')";
$result = mysqli_query($dbc, $query);
if ($result) {
  $alertMails = json_decode(file_get_contents("../data/alert-mails.dat"));
  $query = "SELECT timestamp, name, phone FROM call_requests ORDER BY id DESC LIMIT 1";
  $queryResult = mysqli_query($dbc, $query);
  $lastData = mysqli_fetch_array($queryResult, MYSQLI_ASSOC);
  $mailBody = "На сайте сделан запрос на обратный звонок\r\n---------------------\r\n";
  $mailBody = $mailBody."Время: ".$lastData['timestamp']."\r\n"."Имя: ".$lastData['name']."\r\n"."Тел: ".$lastData['phone'];
  $mailBody = mb_convert_encoding($mailBody, "windows-1251", "auto");

  foreach ($alertMails as $alertMail) {
    mail($alertMail, "Site: Новая подписка на рассылку", $mailBody);
  }
}

echo json_encode($result);
mysqli_free_result($dbc);
mysqli_close($dbc);
?>