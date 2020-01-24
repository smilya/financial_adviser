<?php

copy($_FILES['uploadfile']['tmp_name'],"../../images/publications/".basename($_FILES['uploadfile']['name']));

echo("<script>window.close()</script>");

?>