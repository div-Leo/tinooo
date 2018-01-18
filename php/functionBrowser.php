<?
	function browser(){
		$user_agent = $_SERVER['HTTP_USER_AGENT'];
		$browsers = array('Chrome' => array('Google Chrome','Chrome/(.*)\s'),'MSIE' => array('Internet Explorer','MSIE\s([0-9\.]*)'),'Firefox' => array('Firefox', 'Firefox/([0-9\.]*)'),'Safari' => array('Safari', 'Version/([0-9\.]*)'),'Opera' => array('Opera', 'Version/([0-9\.]*)'));
		$browser_details = array();
		foreach ($browsers as $browser => $browser_info){
			if (preg_match('@'.$browser.'@i', $user_agent)){
				$browser_details['name'] = $browser_info[0];
					preg_match('@'.$browser_info[1].'@i', $user_agent, $version);
				$browser_details['version'] = $version[1];
					break;
			} else {
				$browser_details['name'] = 'Unknown';
				$browser_details['version'] = 'Unknown';
			}
		}
		return $browser_details['name'] . ' - ' . $browser_details['version'];
	}
?>