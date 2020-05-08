<?php
require('../../dbc_finance.php');
if (!mysqli_ping($dbc)) {
  echo json_encode(false);
  die();
}
$query = "SELECT title, answer, videoText, videoLink, tags FROM faqs ORDER BY id";
$result = mysqli_query($dbc, $query);
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
  $row['tags'] = explode(',', $row['tags']);
  $stringsArr[] = $row;
}
echo json_encode($stringsArr);
?>