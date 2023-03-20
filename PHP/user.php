<?php
//imports db instance.
require_once("./sql.php");
$db = sql();
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');
header("HTTP/1.1 200 OK");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$_GET = json_decode($rest_json, true);
$_DELETE = json_decode($rest_json, true);

    if ($_SERVER['REQUEST_METHOD'] === "POST")
	{
        //Upsert
        if (empty($_POST['name']) && empty($_POST['surname'])&& empty($_POST['age'])&& empty($_POST['nationality'])){
            echo json_encode(['Error' => 'Failed to add new record']);
            http_response_code(500);
        } 
        try {
            if(!isset($_POST['ID'])){
               $tempID = rand(1,999);
            }else{
                $tempID = $_POST['ID'];
            }

            $sql = "INSERT INTO users2 (ID,name,surname,age,nationality) VALUES (".$tempID.",'".$_POST['name']."','".$_POST['surname']."',".(int)$_POST['age'].",'".$_POST['nationality']."');";
            $db->exec($sql);
            echo json_encode(['Success' => "Success"]);
            http_response_code(200);
        } catch (Throwable $th) {
            echo json_encode(['Error' => 'Failed to add new record']);
            http_response_code(500);
        }
	}
    else if($_SERVER['REQUEST_METHOD'] === "GET"){
        try {
            $sql = "SELECT * FROM users2";

            if(isset($_POST['ID'])){
               $sql.=" WHERE ID=".$_POST['ID'];
            }
            
            $response = $db->query($sql);
            $data = [];
            while($row = $response->fetchArray(SQLITE3_ASSOC)) array_push($data,$row);
            echo json_encode($data);
            http_response_code(200);
        } catch (Throwable $th) {
            echo json_encode(['Error' => 'Failed to retrive data']);
            http_response_code(500);
        }
    }
    else if($_SERVER['REQUEST_METHOD'] === "DELETE"){
        try {
            $sql = "DELETE FROM users2";

            if(isset($_POST['ID'])){
               $sql.=" WHERE ID=".$_POST['ID'];
            }
            
            $response = $db->exec($sql);

            echo json_encode(['Success' => 'True']);
            http_response_code(200);
        } catch (Throwable $th) {
            echo json_encode(['Error' => 'Failed to delete record']);
            http_response_code(500);
        } 
    }
    else{
	echo json_encode(["sent" => false, "message" => "Something went wrong"]);
	}
    exit();
?>