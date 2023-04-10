//Validating Credentials
function validate(username, email, password, confirmPassword){
    let username_flag=validate_name(username)
    let email_flag=validate_email(email)
    let password_flag=validate_password(password)
    let confirmPassword_flag=validate_confirmPassword(password,confirmPassword)

    if(username_flag && email_flag && password_flag && confirmPassword_flag){
        console.log("VALID");   
        return true;
    }
    else{
        alert("Enter Valid Details");
        return false;
    }
}

//Validate Username
function validate_name(username){
    if(username==""){
        alert("Name is required");
        return false;
    }
    else if( /^[a-zA-Z]+$/.test(username)==false){
        alert("Enter valid name");
        return false;
    }
    else{
        return true;
    }

}

//Validate Email
function validate_email(email){
    if(email==""){
        alert("Email is required");
        return false;             
    }
    else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)==false){
        alert("invalid email");
        return false;
    }
    else{
        return true;
    }
}

//Validate Password
function validate_password(password){
    if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,15}$/.test(password)==false){
        alert("Password should contain atleast one upper-case letter, one lower-case letter, a number, a special character, should be of 4-15 characters. Please try again.")
        return false;
    }
    else{
        return true;
    }
}


//Validate Confirm-Password
function validate_confirmPassword(confirmPassword,password){
    if(confirmPassword!=password){
        alert("Passwords don't Match");
        return false;
    }
    else{
        return true;
    }
}

//jQuery ajax
$(document).ready(function(){
    $("#Register").click(function(){
        let username=document.getElementById("userName").value;
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;
        let confirmPassword=document.getElementById("confirmPassword").value;

        if(validate(username, email, password, confirmPassword)){
            console.log("YES");
            $.post("http://localhost/GuviTask/php/register.php",{username:username, email:email, password:password},function(data,status){
                    console.log(status);
                    console.log(data);
                    if(data=="EXISTS"){
                        alert("This Email Already Exists!");
                    }
                    else{
                        alert("User Registered.");
                        // document.getElementById("userName").value="";
                        // document.getElementById("email").value="";
                        location.href="http://localhost/GuviTask/login.html";
                    }
                }
            )
        }   
    });
});