export class User{

    validateUser(element)
    {
        let regex = 
        {
            //regext for user name that special chars and numbers are not allowed
            userName: /^[a-zA-Z]+$/,
            userEmail: /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/,//regex for email
            userPhone: /^[0-9]{10}$/,//regex for phone number
            userAge: /^[0-9]+$/,//this regex will allow only numbers
            //regex for password at least eight chars, at least one letter and one number
            userPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        };
        if(element.id === "passwordConfirmation")
        {
            return this.checkPassword($("#userPassword")[0].value, element.value);
        }
        else if(regex[element.id].test(element.value))
        {
            this.removeAlert(element.id);
            return true;
        }
        else
        {
            this.showAlert(element.id);
            return false;
        }
    }
    showAlert(elementId)
    {
        const alerts = {
            userName: "Special characters and numbers not allowed",
            userEmail: "Email not valid *exemple@yyy.zzz",
            userPhone: "Enter valid Phone Number",
            userAge : "Enter valid Age",
            userPassword : "Enter valid password *Minimum eight characters, at least one letter and one number:*",
            passwordConfirmation : "Enter valid repassword"
        }
        this.removeAlert(elementId);
        let alert = `<div class="alert text-red-500 bg-red-200 rounded mt-1 p-2">${alerts[elementId]}</div>`;
        console.log("alert is added", alert);
        $(`#${elementId}`).after(alert);
    }

    removeAlert(elementId)
    {
        $(`#${elementId}`).next(".alert").remove();
    }


    // -----------
    checkPassword(password, confirmPassword)
    {
        if(password === confirmPassword)
        {
            this.removeAlert("passwordConfirmation");
            return true;
        }
        else
        {
            this.showAlert("passwordConfirmation");
            return false;
        }
    }

    validatefields()
    {
        const userName = $("#userName");
        const userEmail = $("#userEmail");
        const userPhone = $("#userPhone");
        const userAge = $("#userAge");
        const userPassword = $("#userPassword");
        const passwordConfirmation = $("#passwordConfirmation");

        console.log(userName);
        console.log(userEmail);
        console.log(userPhone);
        console.log(userAge);
        console.log(userPassword);
        console.log(passwordConfirmation);

        let valid = true;
        if (userName.hasClass("active") && !this.validateUser(userName[0])) valid = false;
        if (userEmail.hasClass("active") && !this.validateUser(userEmail[0])) valid = false;
        if (userPhone.hasClass("active") && !this.validateUser(userPhone[0])) valid = false;
        if (userAge.hasClass("active") && !this.validateUser(userAge[0])) valid = false;
        if (userPassword.hasClass("active") && !this.validateUser(userPassword[0])) valid = false;
        if (passwordConfirmation.hasClass("active") && !this.checkPassword(userPassword[0].value, passwordConfirmation[0].value)) valid = false;


        return valid;

    }
    

}