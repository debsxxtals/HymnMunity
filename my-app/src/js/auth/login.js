import { supabase, successNotification, errorNotification } from "../main";

const form_login = document.getElementById("form_login");

form_login.onsubmit = async (e) => {
    e.preventDefault();
    
     //disable button
     document.querySelector("#form_login button").disabled = true;
     document.querySelector(
         "#form_login button"
     ).innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span role="status">Loading...</span>`;

    const formData = new FormData(form_login);
    //supabase sign in
    let { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    let session = data.session;
    let user = data.user;
    //Store into variable the ser
    let user_id = data.user.id

    const userId = user_id;

     
    //if user can be access means user is verified
    if (session != null) {
        //store token for api
        localStorage.setItem("access_token", session.access_token);
        localStorage.setItem("refresh_token", session.refresh_token);
        // Store user ID in local storage
         localStorage.setItem('userId', userId);
        
        let { data: profiles, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("auth_id", user.id);
        
        console.log(profiles);
        localStorage.setItem("role", profiles[0].role);
    

    } else {
        errorNotification("Something wrong happened. Cannot login account.", 10);
        console.log(error);
    }
    


    console.log(data);
    //Show notification
    if (error == null) {
        successNotification("Login Successfully");
        //redirect to dashboard
        window.location.pathname = '/dashboard.html';
    }
    else {
        errorNotification("Something wrong happened. Cannot login account.", 10);
        console.log(error);
    }

    //reset form
    form_login.reset();

    //Enable submit button
    document.querySelector("#form_login button").disabled = false;
    document.querySelector("#form_login button").innerHTML = `Login`;
    
    
  
    
};
