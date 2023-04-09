<?php 
$conn= new mysqli("localhost","root","shuaibxampp","guvi");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$username=$_POST['username'];
$email=$_POST['email'];
$password=$_POST['password'];

$check=$conn->query("SELECT * FROM registration WHERE username='$username'")->num_rows;
if($check>0){
    $err="the username is already taken.";
}
else{
$stmt = $conn->prepare("INSERT INTO 'registration' ('username', 'email', 'password') VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $password);
$stmt->execute();
$stmt->close();
$conn->close();
}
?>