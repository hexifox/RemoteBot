<?php 
  $con = new mysqli("46.101.1.113", "RemoteBot_Admin", "ReMote_BOT_1302", "TH001");
 
  if($con->connect_errno > 0){
    die('Unable to connect to database [' . $con->connect_error . ']');
  }
?>