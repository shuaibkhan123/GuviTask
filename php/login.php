<?php
// create connection
$conn= new mysqli("localhost","root","shuaibxampp","guvi"); 

$output=array();

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// echo "connected";

$email=$_POST['email'];
$password=$_POST['password'];

//check if email exists - valid login
$check=$conn->prepare("SELECT * FROM registration WHERE email=?");
$check->bind_param("s",$email);
$check->execute();
$result=$check->get_result();
if($result->num_rows>0){
    while($row=$result->fetch_assoc()){
        // echo $row['name'];
        // echo $row['email'];
        // echo $row['password'];
        if(hash("md5",$password)==$row['password']){
            //echo "logged in";
            $output['status']="1";
            $output['id']=$row['id'];

            //implementing redis session
            $redis=new Redis();
            $redis->connect('localhost',6379);

            //the user is logged in and expiration is 3600 seconds(1hr)
            if($redis){
                $redis->setex($row['id'],30,1);
            }
        }
        else{
            //echo "wrong password";
            $output['status']='0';
        }
    }
}   
else{
    //echo "does not exist";
    $output['status']="-1";
}
echo json_encode($output);
?>