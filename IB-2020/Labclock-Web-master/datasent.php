<?php
	//data to be filled
	//<configuration>
	$fromEmailAddress = "laura.saad14@gmail.com";
	$toEmailAddress = "laura.saad14@gmail.com";
	$experimentCode = "LIBET-001 - WEB";
	$subjectEmail = "EXPERIMENTAL DATA: " . experimentCode . " //" + date("Ymd");
	$domain = "gmail.com"; // does this need to be the server domain?
	//</configuration>

	//program variables
	$extraHeaders = "From: " . $fromEmailAddress . "\r\n" .
		"To: " . $toEmailAddress . "\r\n" .
		"Subject: " . $subjectEmail . "\r\n" .
		"X-Mailer: PHP " . $domain;

	$referer = $_SERVER['HTTP_REFERER'];
	if (getenv("HTTP_X_FORWARDED_FOR"))
	{
		$ipAddress = getenv("HTTP_X_FORWARDED_FOR");
	}
	else 
	{
		$ipAddress = getenv("REMOTE_ADDR");
	}

	$domainPolicy = strpos($referer, $domain);
	//if ($domainPolicy != false) 
	//{
		$bodyEmail = $experimentCode . "," . $ipAddress . "," . $_POST["experimentData"];

		if (mail($toEmailAddress, $subjectEmail, $bodyEmail, $extraHeaders)) 
		{
			echo("<p>Data sent!</p>");
		} 
		else 
		{
			echo("<p>Error sending data...</p>");
		}
	//}
	//else
	//{
	//	echo("<p>Domain policy error</p>");
	//}
?>
