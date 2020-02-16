<?php

$data = file_get_contents('php://input');
unlink ("../../images/publications/".$data);

?>