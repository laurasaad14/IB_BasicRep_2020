<?php
	if(!empty($_POST['data'])){
		$data = $_POST['data'];
		$fname = "results_questionaire.txt";
		
		if (file_exists($fname) == true) {
			$file = fopen($fname, 'a');
			fwrite($file, $data);
			fclose($file);
		}
		else {
			$file = fopen($fname, 'w');
			fwrite($file, $data);
			fclose($file);
		}
	}
?>
