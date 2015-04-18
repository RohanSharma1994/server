/* The following javascript file controls behaviour
 * when signing up. Signing up is done using AJAX.
 */
function submit_form() {
	/* Get all the form input */
	var username = document.getElementById('username').value;
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var password2 = document.getElementById('re-password').value;
	/* Check if both passwords are the same */
	if(password != password2) {
		document.getElementById('password-message').innerHTML = "Passwords do not match";
		return;
	}
	/* Check with the server if this sign up is valid */
	var xmlhttp;
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	}
	else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4) {
			response = xmlhttp.responseText;
			var error = false;
			if(response.indexOf("emailExists") >= 0) {
				error = true;
				document.getElementById('email-message').innerHTML = "Email already in use";
			}
			if(response.indexOf("usernameExists") >= 0) {
				error = true;
				document.getElementById('username-message').innerHTML = "Username already exists";
			}
			if(error == false) {
				document.getElementById("sign_up").innerHTML = '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" style="background:DodgerBlue;">You have signed up</a>'
				setTimeout(function(){
    				document.getElementById("signup").innerHTML = '';
				}, 5000);
			}
		}

	}
	var request = "/sign_up?username="+username+"&password="+password+"&email="+email;
	xmlhttp.open("post", request, true);
	xmlhttp.send();
}

/* A function which clears all error divs. */
function clearMessages() {
	document.getElementById('email-message').innerHTML = "";
	document.getElementById('password-message').innerHTML = "";
	document.getElementById('email-message').innerHTML = "";
}