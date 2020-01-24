<?php

  $data = file_get_contents('php://input');

  $fd = fopen("../publications-data.js", 'w') or die("не удалось создать файл");
  fseek($fd, 0);
  fwrite($fd, "let publications = ".$data.";");
  fclose($fd);  

?>