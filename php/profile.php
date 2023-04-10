<?php
    $type=$_POST['type'];
    if($type==0){
        $email='';
        $userid=$_POST['userid'];

        $redis=new Redis();
        $redis->connect('localhost',6379);
        
        $result=array();

        if($redis->exists($userid)==1){

            $conn= new mysqli("localhost","root","shuaibxampp","guvi");
    
            $check=$conn->prepare("SELECT * FROM registration WHERE id=?");
            $check->bind_param("i",$userid);
            $check->execute();
            $qdata=$check->get_result();
    
            if($qdata->num_rows>0){
                while($row=$qdata->fetch_assoc()){
                    $email=$row['email'];                
                }
            }   
    
            $m = new MongoDB\Driver\Manager("mongodb://localhost:27017");
            $filter = ['email' => $email];
            $options = ['limit' => 1];
            $query = new MongoDB\Driver\Query($filter,$options);
            $cursor=$m->executeQuery('Guvi.user', $query);
            
            
            foreach($cursor as $document){
                $document=(array) $document;
                $result['fname']=$document['fname'];
                $result['lname']=$document['lname'];
                $result['email']=$document['email'];
                $result['dob']=$document['dob'];
                $result['age']=$document['age'];
                $result['phone']=$document['phone'];
                $result['state']=$document['state'];
                $result['dept']=$document['dept'];
                $result['degree']=$document['degree'];
        }
        $result['session']=1;
        }
        else{
            $result['session']=0;
        }
    echo json_encode($result);
}
elseif($type==2){
    $redis=new Redis();
    $redis->connect('localhost',6379);
    if($redis){
        $redis->del($_POST['userid']);
    }
}
else 
{
    $email='';
    $userid=$_POST['userid'];
    $conn= new mysqli("localhost","root","shuaibxampp","guvi");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $check=$conn->prepare("SELECT * FROM `registration` WHERE id=?");
    $check->bind_param("i",$userid);
    $check->execute();
    $qdata=$check->get_result();

    if($qdata->num_rows>0){
        while($row=$qdata->fetch_assoc()){
            // echo $row['name'];
            // echo $row['email'];
            // echo $row['password'];
            $email=$row['email'];
        }
    }   
    $new_mail=$_POST['email'];
    $fname=$_POST['fname'];
    $lname=$_POST['lname'];
    $dob=$_POST["dob"];
    $age=$_POST['age'];
    $phone=$_POST['phone'];
    $state=$_POST['state'];
    $degree=$_POST['degree'];
    $dept=$_POST['dept'];

    $userid=$_POST['userid'];

    $m = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    $bulkWrite = new MongoDB\Driver\BulkWrite;

    $filter = ['email' => $email];

    $doc = ['fname' =>$fname, 'lname' =>$lname, 'phone'=>$phone, 'email'=>$new_mail, 'dob'=>$dob, 'age' =>$age,'state'=>$state,'degree'=>$degree,'dept'=>$dept];

    $update = ['$set' =>$doc];
    $options = ['multi' =>false, 'upsert' =>false];

    $bulkWrite->update($filter, $update, $options);
    $m->executeBulkWrite('Guvi.user', $bulkWrite); 



    $conn= new mysqli("localhost","root","shuaibxampp","guvi"); 
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $query=$conn->prepare('UPDATE registration SET `email`=?,`name`=? WHERE `id`=?');
    $query->bind_param("ssi",$new_mail,$name,$userid);
    $query->execute();
}
?>