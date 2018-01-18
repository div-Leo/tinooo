<?
	$username="username";
	$password="password";
	$database="database";
	$db = mysql_connect('localhost',$username,$password);
	mysql_select_db($database) or die("Database Error.");
	$query = "SET NAMES utf8";
	$utf = mysql_query($query);
?>
