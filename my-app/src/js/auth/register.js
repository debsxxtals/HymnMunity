import { supabase,successNotification, errorNotification } from "../main";

const register = document.getElementById("register");

register.onsubmit = async (e) => {
    e.preventDefault();

    
    //disable button
    document.querySelector("#register button").disabled = true;
    document.querySelector(
        "#register button"
    ).innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
     <span role="status">Loading...</span>`;

    //get all values from input, select, textarea form tag
    const formData = new FormData(register);
    //password confirmation
    if (formData.get("password") == formData.get("password_confirmation")){
        
        //Supabase SignUp
        const { data, error } = await supabase.auth.signUp({
            email: formData.get("email"),
            password: formData.get("password"),
        });
        //Store into variable the ser
        let user_id = data.user.id

      
        //Check if user_id does exist; registered
        if (user_id != null) {
            
            const { data, error } = await supabase
                .from('profiles')
                .insert([
                    {
                        first_name: formData.get("first_name"),
                        last_name: formData.get("last_name"), cellphone_no: formData.get("cellphone_no"), auth_id: user_id,
                    },
                ])
                .select();
            
            //Show notification
            if (error == null)
                successNotification("Registered Successfully <a href = './index.html'>  Click here to Login </a>", 20);
            else {
                errorNotification("Something wrong happened. Cannot register account.", 10);
                console.log(error);
            }

            //reset form
            register.reset();

             // Enable Submit Button
            document.querySelector("#register button").disabled = false;
            document.querySelector("#register button").innerHTML = `Register`;
            
            
        
        }
        
    } else {
       // Show password mismatch error
       errorNotification("Passwords do not match.", 10);
       // Reset only password and password_confirmation fields
       register.querySelector("input[name=password]").value = "";
       register.querySelector("input[name=password_confirmation]").value = "";
       // Enable submit button and reset its content
       document.querySelector("#register button").disabled = false;
       document.querySelector("#register button").innerHTML = `Register`;
                
    }
    
    
    
};