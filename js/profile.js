function validate(fname,lname,dob,phone,email,state,degree,dept){
let fname_flag=name_validation(fname);
let lname_flag=name_validation(lname);
let dob_flag=dob_validation(dob);
let phone_flag=phone_validation(phone)
let email_flag=email_validation(email)
let state_flag=validate_state(state)
let degree_flag=validate_degree(degree);
let dept_flag=validate_dept(dept);

if(fname_flag && lname_flag && dob_flag && phone_flag && email_flag && state_flag && degree_flag && dept_flag){
    console.log("VALID");
    return true;
}
else{
    alert("Enter Valid Credentials");
    return false;
}

}

//validate Name
function name_validation(fname){
    if(fname==""){
        return false;
    }
    else if( /^[a-zA-Z]+$/.test(fname)==false){
        return false;
    }
    else{
        return true;
    }
}
function name_validation(lname){
    if(lname==""){
        return false;
    }
    else if( /^[a-zA-Z]+$/.test(lname)==false){
        return false;
    }
    else{
        return true;
    }
}

//validate Phone
function phone_validation(phone){
    if(phone==""){
        return false;
        }
    else if(/^[0-9]+$/.test(phone)==false  || phone.length!=10){
            alert("invalid mobile number")
            return false;
        }
    else{
        return true;
        }
}
//validate email
function email_validation(email){
    var flag=true;
    if(email==""){
        document.getElementById("p4").innerHTML="Email is required";
        flag=false;
        return false;             
    }
    else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false){
        document.getElementById("p4").innerHTML="invalid email";
        flag=false;
        return false;
    }
    else{
        document.getElementById("p4").innerHTML="";
        return true;
    }
}




//Validate DOB
function dob_validation(dob){
    if(!dob){
        return false;
    }
    else if(!(parseInt(dob.slice(0,4))>=1970 && parseInt(dob.slice(0,4))<=2005)){
        alert("user must be born between 1970 and 2005");
        return false;
    }
    else{
        return true;
    }
}

//Validate state
function validate_state(state){
    if(state==""){
        return false;
    }
    else{
        return true;
    }
} 

//validate Degree
function validate_degree(degree){
    if(degree==""){
        return false;
    }
    else{
        return true;
    }
}

//Validate Department
function validate_dept(dept){
    if(dept==""){
        return false;
    }
    else{
        return true;
    }
}

//jQuery Ajax
$(document).ready(function(){
    //console.log(window.location.href);
    //console.log("TEST");
    let current_url=window.location.href;
    let query_array=current_url.split("=")
    //console.log(query_array[1]);
    let userid=query_array[1];
    //let temp_mail="shuaiboltgoku19706@gmail.com"

    //Session
    console.log("USERID");
    console.log(localStorage.getItem("USERID"));

    if(localStorage.getItem(userid)==userid){
    console.log("SESSION THERE");

    $.post("http://localhost/GuviTask/php/profile.php",{userid:userid,type:0},function(data,status){
    console.log(status);
    console.log(data);
    
    // console.log(typeof data);
    let user_data=JSON.parse(data);
    console.log(user_data.name)

    if(user_data.session==1){
        document.getElementById("firstName").value=user_data.fname;
        document.getElementById("lastName").value=user_data.lname;
        document.getElementById("dob").value=user_data.dob; 
        document.getElementById("age").value=user_data.age;
        document.getElementById("phone").value=user_data.phone;
        document.getElementById("email").value=user_data.email;
        document.getElementById("state").value=user_data.state;
        document.getElementById("degree").value=user_data.degree;
        document.getElementById("dept").value=user_data.dept;
    }
    else{
        alert("Log in Session Expired.Please Log In."); 

        //let session_values=[]
        for(let key in localStorage){
            //  session_values.push[key];
            if(userid==key){
                localStorage.removeItem(userid);
            }   
        }
        location.href="http://localhost/GuviTask/login.html";  
    }
})
}
else{
    console.log("SESSION NOT");
    alert("Invalid Session.Please Login");
    location.href="http://localhost/GuviTask/login.html";
}

$("#edit").click(function(){
    document.getElementById("firstName").disabled=false;
    document.getElementById("lastName").disabled=false;
    document.getElementById("dob").disabled=false;
    //document.getElementById("age").disabled=false;
    document.getElementById("phone").disabled=false;
    document.getElementById("email").disabled=false;
    document.getElementById("state").disabled=false;
    document.getElementById("degree").disabled=false;
    document.getElementById("dept").disabled=false;
    document.getElementById("save").disabled=false;
    document.getElementById("edit").disabled=true;
});

$("#save").click(function(){
    let fname=$("#firstName").val();
    let lname=$("#lastNname").val();
    let dob=$("#dob").val();
    //let age=$("#age").val();
    let phone=$("#phone").val();
    let email=$("#email").val();
    let state=$("#state").val();
    let degree=$("#degree").val();
    let dept=$("#dept").val();

    console.log(fname); 
    console.log(dob.slice(0,4));

    if(validate(fname,lname,dob,phone,email,state,degree,dept)){
        document.getElementById("firstName").disabled=true;
        document.getElementById("lastName").disabled=true;
        document.getElementById("dob").disabled=true;
        //document.getElementById("age").disabled=true;
        document.getElementById("phone").disabled=true;
        document.getElementById("email").disabled=true;
        document.getElementById("state").disabled=true;
        document.getElementById("degree").disabled=true;
        document.getElementById("dept").disabled=true;
        document.getElementById("save").disabled=true;
        document.getElementById("edit").disabled=false;

        let current_url=window.location.href;
        let query_array=current_url.split("=")
        console.log(query_array[1]);
        let userid=query_array[1];

        let current_year=new Date().getFullYear();
        let age=parseInt(current_year)-parseInt(dob.slice(0,4));
        document.getElementById("age").value=age;

        //console.log(fname,lname,dob,age,phone,email,state,degree,dept);
        
        $.post("http://localhost/GuviTask/php/profile.php",{type:1,fname:fname,lname:lname,phone:phone,email:email,dob:dob,age:age,state:state,degree:degree,dept:dept,userid:userid},function(data,status){
                console.log(status);
                console.log(data);
                alert("Profile Saved Succesfully");
            }
        )
    }
});

$("#logout").click(function(){
    let current_url=window.location.href;
    let query_array=current_url.split("=")
    //console.log(query_array[1]);
    let userid=query_array[1];
    
    localStorage.removeItem(userid);
    alert("Logged Out");
    
    $.post("http://localhost/GuviTask/php/profile.php",{type:2,userid:userid},function(data,status){
        //console.log(status);
        //console.log(data);
    });
    location.href="http://localhost/GuviTask/login.html";
});
});