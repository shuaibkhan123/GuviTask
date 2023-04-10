<?php 
//create connection
$conn= new mysqli("localhost","root","shuaibxampp","guvi");

//check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//echo "connected";

$username=$_POST['username'];
$email=$_POST['email'];
$password=$_POST['password'];

//hash the password for security
$password=hash("md5",$password);

//check if email aready exists
$check=$conn->prepare("SELECT * FROM registration WHERE email=?");
$check->bind_param("s",$email);
$check->execute();
$result=$check->get_result();
if($result->num_rows>0){
    echo "EXISTS";
}
else{
$stmt = $conn->prepare("INSERT INTO registration (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $password);
$stmt->execute();
//echo "INSERTED";

//mongoDB implementation - initializing document containing user input during registration 
$m = new MongoDB\Driver\Manager("mongodb://localhost:27017");
$bulkWrite = new MongoDB\Driver\BulkWrite;
$doc = ['fname' =>"",'lname'=>"", 'phone'=>"", 'email'=>$email, 'dob'=>"", 'age' => '', 'state'=>'', 'degree'=>"", 'dept'=>""];
$bulkWrite->insert($doc);
$m->executeBulkWrite('Guvi.user', $bulkWrite);
}
// $stmt->close();
// $conn->close();
?>