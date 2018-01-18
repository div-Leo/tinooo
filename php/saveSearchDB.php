<?
	include "db.php";
	include "functionBrowser.php";
	include "functionIPinfo.php";
	
	$q = $_GET["query"];
	$searchEngine = $_GET["searchEngine"];
	$language = strtoupper(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2));
	$country = ip_info("Visitor", "Country") . " - " . ip_info("Visitor", "City");
	$date = date("Y-m-j, G:i:s");
	$ip = $_SERVER["REMOTE_ADDR"];
	$browser = browser();
	
	$query = mysql_query("INSERT INTO querySearchTinooo (Query, SearchEngine, Language, Country, Date, IP, Browser) VALUES ('$q','$searchEngine','$language','$country','$date','$ip','$browser')");
?>