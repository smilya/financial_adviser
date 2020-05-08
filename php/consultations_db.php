<?php
require('../../dbc_finance.php');
if (!mysqli_ping($dbc)) {
  echo json_encode(false);
  die();
}
$name = $_POST['name'];
$name = mysqli_real_escape_string($dbc, $name);
$email = $_POST['email'];
$email = mysqli_real_escape_string($dbc, $email);
$question = $_POST['text'];
$question = mysqli_real_escape_string($dbc,$question);

$query = "INSERT INTO consultations (timestamp, name, email, question) VALUES (NOW(), '$name', '$email', '$question')";
$result = mysqli_query($dbc, $query);
if ($result) {
  $alertMails = json_decode(file_get_contents("../data/alert-mails.dat"));
  $query = "SELECT timestamp, name, email, question FROM consultations ORDER BY id DESC LIMIT 1";
  $queryResult = mysqli_query($dbc, $query);
  $lastData = mysqli_fetch_array($queryResult, MYSQLI_ASSOC);
  $mailBody = "На сайте сделан запрос на персональную консультацию\r\n---------------------\r\n";
  $mailBody = $mailBody."Время: ".$lastData['timestamp']."\r\n";
  $mailBody = $mailBody."Имя: ".$lastData['name']."\r\n";
  $mailBody = $mailBody."Эл.почта: ".$lastData['email']."\r\n";
  $mailBody = $mailBody."Вопрос: ".$lastData['question'];
  $mailBody = mb_convert_encoding($mailBody, "windows-1251", "auto");
  foreach ($alertMails as $alertMail) {
    mail($alertMail, "Site: Новая запись на персональную консультацию", $mailBody);
  }
}

echo json_encode($result);
mysqli_free_result($dbc);
mysqli_close($dbc);
?>