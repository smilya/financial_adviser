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
$question = $_POST['question'];
$question = mysqli_real_escape_string($dbc,$question);

$query = "INSERT INTO questions (timestamp, name, email, question) VALUES (NOW(), '$name', '$email', '$question')";
$result = mysqli_query($dbc, $query);
if ($result) {
  $query = "SELECT timestamp, name, email, question FROM questions ORDER BY id DESC LIMIT 1";
  $queryResult = mysqli_query($dbc, $query);
  $newData = mysqli_fetch_array($queryResult, MYSQLI_ASSOC);
  $mailBody = "На сайте задан новый вопрос\r\n---------------------\r\n";
  $mailBody = $mailBody."Время: ".$newData['timestamp']."\r\n";
  $mailBody = $mailBody."Имя: ".$newData['name']."\r\n";
  $mailBody = $mailBody."Эл.почта: ".$newData['email']."\r\n";
  $mailBody = $mailBody."Вопрос: ".$newData['question'];
  $mailBody = mb_convert_encoding($mailBody, "windows-1251", "auto");
  $alertMails = json_decode(file_get_contents("../data/alert-mails.dat"));
  foreach ($alertMails as $alertMail) {
    mail($alertMail, "Site: Задан новый вопрос", $mailBody);
  }
}

echo json_encode($newData);
mysqli_free_result($dbc);
mysqli_close($dbc);
?>