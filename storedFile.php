<?php
$fileName = $_FILES['sFile']['name'];
$tmpName = $_FILES['sFile']['tmp_name'];

move_uploaded_file($tmpName,$fileName);

echo("File uploaded successfuly");
echo($tmpName);


?>