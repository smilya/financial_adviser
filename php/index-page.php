<?php
require('../../dbc_finance.php');
if (!mysqli_ping($dbc)) {
  echo json_encode(false);
  die();
}
$query = "SELECT src FROM videos ORDER BY id LIMIT 2";
$videoResult = mysqli_query($dbc, $query);
while ($row = mysqli_fetch_array($videoResult, MYSQLI_NUM)) {
  $videos[] = $row[0];
}
$result['videos'] = $videos;
// Еще тут взять данные о последних трех статьях и добавить их в $results
$query = "SELECT date, logo, title, synopsis, link, image FROM publications ORDER BY id DESC LIMIT 3";
$articlesResult = mysqli_query($dbc, $query);
while ($row = mysqli_fetch_array($articlesResult, MYSQLI_ASSOC)) {
  $publications[] = $row;  
}
$result['publications'] = $publications;
echo json_encode($result);
?>