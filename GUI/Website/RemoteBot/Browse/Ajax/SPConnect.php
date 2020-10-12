<?php
header("Content-type: text/json");
$server = "46.101.1.113";
$user_name = "RemoteBot_Admin";
$password = "ReMote_BOT_1302";
$database = "RemoteBot";
$db_handle = mysql_connect($server, $user_name, $password);
$db_found = mysql_select_db($database, $db_handle);
if ($db_found) {
    $SQL="SELECT UNIX_TIMESTAMP(CONVERT_TZ(time,'+00:00', @@session.time_zone))*1000,Sea_Level_Pressure FROM Measurements order by time";
    $res=mysql_query($SQL);

    $rows=array();

    while($row=mysql_fetch_row($res))
    {
        $rows[]="[".implode(',',$row)."]";

    }
    echo "[".implode(',', $rows)."]";
}
else {
    print "Database NOT Found " . $db_handle;
}

?>
