<?php
require('../../dbc_finance.php');
if (!mysqli_ping($dbc)) {
  echo json_encode(false);
  die();
}
$query = "SELECT date, logo, title, synopsis, link, image FROM publications ORDER BY id DESC";
$result = mysqli_query($dbc, $query);
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
  $publications[] = $row;
}
echo json_encode($publications);
?>