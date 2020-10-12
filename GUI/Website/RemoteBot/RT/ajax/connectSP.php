<?php
header("Content-type: text/json");
header('Access-Control-Allow-Origin: *');  
$server = "46.101.1.113";
$user_name = "RemoteBot_Admin";
$password = "ReMote_BOT_1302";
$database = "RemoteBot";
$db_handle = mysql_connect($server, $user_name, $password);
$db_found = mysql_select_db($database, $db_handle);
if ($db_found) {
    $SQL = "Select * from Measurements ORDER BY id DESC LIMIT 0, 1";
    $result = mysql_query($SQL);
    while ( $db_field = mysql_fetch_assoc($result) ) {
            $y = (float)$db_field['Sea_Level_Pressure'];
        }
    mysql_close( $db_handle );
}
else {
    print "Database NOT Found " . $db_handle;
}
$x = time() * 1000; 
$ret = array($x, $y);
echo json_encode($ret);
?>