//Validating Credentials
function validate(email, password){
    var email_flag=validate_email(email)
    var password_flag=validate_password(password)

    if(email_flag && password_flag){
        console.log("VALID");
        return true;
    }
    else{
        alert("Enter Valid Credentials");
        return false;
    }
}

//Validate Email
function validate_email(email){
    if(email==""){
        document.getElementById("s1").innerHTML="Email should not be empty";
        return false;             
    }
    else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false){
        document.getElementById("s1").innerHTML="Enter Valid Email";
        return false;
    }
    else{
        document.getElementById("s1").innerHTML="";
        return true;
    }
}

//Validate Password
function validate_password(password){
    if(password==""){
        document.getElementById("s2").innerHTML="Password should not be empty";
        return false;
    }
    else{
        document.getElementById("s2").innerHTML="";
        return true;
    }
}

//jQuery ajax
$(document).ready(function(){
    $("#Login").click(function(){
        var email=document.getElementById("email").value;
        var password=document.getElementById("password").value;

        if(validate(email, password)){
            console.log("YES");
            $.post("http://localhost/GuviTask/php/login.php",{email:email, password:password},function(data,status){
                console.log(status);
                console.log(data);

                var response_data=JSON.parse(data);
                console.log(response_data);

                if(response_data.status=="-1"){
                    alert("This Email Does Not Exist. Please Register Again.");
                    
                }
                else if(response_data.status=="0"){
                    alert("Passwords Do Not Match");
                }
                else{
                    //alert("lol");
                    document.getElementById("email").value="";
                    localStorage.setItem(response_data.id, response_data.id);
                    var url_str="http://localhost/GuviTask/profile.html?id"+"="+response_data.id;
                    location.href=url_str;
                    // location.href="http://localhost/GuviTask/profile.html";
                }
            })
        }
    });
});