<?php
require('../../dbc_finance.php');
if (!mysqli_ping($dbc)) {
  echo json_encode(false);
  die();
}
$newEmail = file_get_contents('php://input');
$newEmail = mysqli_real_escape_string($dbc, $newEmail);

$query = "INSERT INTO subscriptions (timestamp, email) VALUES (NOW(), '$newEmail')";
$result = mysqli_query($dbc, $query);
if ($result) {
  $alertMails = json_decode(file_get_contents("../data/alert-mails.dat"));
    
  $query = "SELECT timestamp, email FROM subscriptions ORDER BY number DESC LIMIT 1";
  $queryResult = mysqli_query($dbc, $query);
  $lastData = mysqli_fetch_array($queryResult, MYSQLI_NUM);

  $mailBody = "На сайте сделан новый запрос на подписку\r\n---------------------\r\n";
  $mailBody = $mailBody.$lastData[0]." ".$lastData[1];
  $mailBody = mb_convert_encoding($mailBody, "windows-1251", "auto");
  
  foreach ($alertMails as $alertMail) {
    mail($alertMail, "Site: Новая подписка на рассылку", $mailBody);
  }
}
else {
  if (mysqli_errno($dbc) == 1062) {
    $result = true;
  }
  else {
    $result = false;
  }
}


echo json_encode($result);

mysqli_free_result($dbc);
mysqli_close($dbc);

?>