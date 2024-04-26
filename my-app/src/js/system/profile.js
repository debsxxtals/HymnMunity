import { supabase, successNotification, errorNotification } from "../main";

const btn_logout = document.getElementById("btn_logout");
btn_logout.onclick = async () => {
    
    let { error } = await supabase.auth.signOut();

    localStorage.clear()

    if (error == null) {
        successNotification("Logout Successfully");
        //clear local storage
        localStorage.clear();

        //redirect to login page
        window.location.pathname = "/index.html"
    } else {
        errorNotification("Logout Failed", 15);
    }


    
}