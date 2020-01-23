<?php

  $data = file_get_contents('php://input');

  $fd = fopen("../video-data.js", 'w') or die("не удалось создать файл");
  fseek($fd, 0);
  fwrite($fd, "let videos = ".$data.";");
  fclose($fd);  

?>