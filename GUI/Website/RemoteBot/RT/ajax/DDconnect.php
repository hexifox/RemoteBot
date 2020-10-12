<?php
header("Content-type: text/json");
$server = "46.101.1.113";
$user_name = "RemoteBot_Admin";
$password = "ReMote_BOT_1302";
$database = "TH001";
$db_handle = mysql_connect($server, $user_name, $password);
$db_found = mysql_select_db($database, $db_handle);
if ($db_found) {
    $SQL = "Select * from maps ORDER BY ID DESC LIMIT 0, 1";
    $result = mysql_query($SQL);
    while ( $db_field = mysql_fetch_assoc($result) ) {
            $y = (float)$db_field['centerLat'];
            $x = (float)$db_field['centerLong'];
        }
    mysql_close( $db_handle );
}
else {
    print "Database NOT Found " . $db_handle;
}
$ret = array($x, $y);
echo json_encode($ret);
?>