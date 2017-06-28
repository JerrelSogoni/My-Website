<?php
include "./class/project.php";
header('Access-Control-Allow-Origin: *');  
date_default_timezone_set('America/New_York');


$servername = "127.0.0.1";
$username = "jerrkfcd_jerrel";
$password = "root123";
$dbname = "jerrkfcd_website";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
/* Select queries return a resultset */


/* Get names of the contributes to project */
if (!($contributers_list_prepstmt = $conn->prepare("
	SELECT CONCAT( N.first_name,  ' ', N.last_name ) AS full_name
		FROM names N
		WHERE N.id IN ( SELECT 
			C.name_id	
			FROM contributers C
			WHERE C.project_id = (?)
			)"))){
     echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
	}
if (!($idea_creator_list_prepstmt = $conn->prepare("
	SELECT CONCAT( N.first_name,  ' ', N.last_name ) AS full_name
		FROM names N
		WHERE N.id IN ( SELECT 
			I.name_id	
			FROM idea_creator I
			WHERE I.project_id = (?)
			)"))){
     echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
	}
if (!($image_info = $conn->prepare("
	SELECT 
		img_path,
		img_description
  		FROM images I
  			WHERE I.id = (?)"))){
     echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
	}
if (!($project_info = $conn->prepare("
	SELECT *
  		FROM project P
  			WHERE P.id = (?)"))){
     echo "Prepare failed: (" . $conn->errno . ") " . $conn->error;
	}

$projects = array();
if ($order_result = $conn->query("SELECT * FROM ordering")) {
    while ($order_row = $order_result->fetch_assoc()) {
    	$project_id = $order_row['project_id'];
    	if (!$project_info->bind_param("i", $project_id)) {
    		echo "Binding parameters failed: (" . $project_info->errno . ") " . $project_info->error;
		}
		if (!$project_info->execute()) {
    		echo "Execute failed: (" . $project_info->errno . ") " . $project_info->error;
		}
		$project_result = $project_info->get_result();
		$project_row = $project_result->fetch_assoc();
		$image_id = $project_row['img_id'];
		$project = new Project();
		$project->name = $project_row['name'];
		$project->description = $project_row['description'];
		$project->link = $project_row['link'];
		$project->repo_link = $project_row['repo_link'];
		$project->blog_link = $project_row['blog_link'];
		if (!$image_info->bind_param("i", $image_id)) {
    		echo "Binding parameters failed: (" . $image_info->errno . ") " . $image_info->error;
		}
		if (!$image_info->execute()) {
    		echo "Execute failed: (" . $image_info->errno . ") " . $image_info->error;
		}
		$image_result = $image_info->get_result();
		$image_row = $image_result->fetch_assoc();
		$project->image_path = $image_row['img_path'];
		$project->image_description = $image_row['img_description'];
		if (!$contributers_list_prepstmt->bind_param("i", $project_id)) {
    		echo "Binding parameters failed: (" . $contributers_list_prepstmt->errno . ") " . $contributers_list_prepstmt->error;
		}
		if (!$contributers_list_prepstmt->execute()) {
    		echo "Execute failed: (" . $contributers_list_prepstmt->errno . ") " . $contributers_list_prepstmt->error;
		}
		$contribution_result = $contributers_list_prepstmt->get_result();
		while ( $contribution_row = $contribution_result->fetch_assoc()){
			$project->collaborators[] = $contribution_row['full_name'];
		}
		if (!$idea_creator_list_prepstmt->bind_param("i", $project_id)) {
    		echo "Binding parameters failed: (" . $idea_creator_list_prepstmt->errno . ") " . $idea_creator_list_prepstmt->error;
		}
		if (!$idea_creator_list_prepstmt->execute()) {
    		echo "Execute failed: (" . $idea_creator_list_prepstmt->errno . ") " . $idea_creator_list_prepstmt->error;
		}
		$ideas_result = $idea_creator_list_prepstmt->get_result();
		while ( $ideas_row = $ideas_result->fetch_assoc()){
			$project->idea_creators[] = $ideas_row['full_name'];
		}

		$startDate = new DateTime($project_row['start_date']);
		$endDate = new DateTime($project_row['end_date']);
		$startDateConversion = $startDate->format("m/d/Y");
		$endDateConversion = $endDate->format("m/d/Y");
		$project->start_date = $startDateConversion;
		$project->end_date = $endDateConversion;

		$projects[] = $project;

		$project_result->close();

    }

    /* free result set */

    echo json_encode($projects);

    $order_result->close();
    $conn = null;
}

?>