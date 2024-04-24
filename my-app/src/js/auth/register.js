import { supabase } from "../main";

const register = document.getElementById("register");

register.onsubmit = async (e) => {
    e.preventDefault();

    //get all values from input, select, textarea form tag
    const formData = new FormData(register);
    if (formData.get("password") == formData.get("password_confirmation")){
        alert("Passwords does match");
        
    } else {
        alert("Password does not match");
    }
    
    
    const { data, error } = await supabase.auth.signUp({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    console.log(data);
    console.log(error);
};