
import { supabase, successNotification, errorNotification, toggleButtonVisibility } from "../main";

document.addEventListener("DOMContentLoaded", async () => {
    const userRole = localStorage.getItem("role");

    // Find all button elements with the "adminButton" class
    const adminButtons = document.querySelectorAll(".adminButton");

    // Call toggleButtonVisibility function for each button with user role
    adminButtons.forEach(button => {
        toggleButtonVisibility(button, userRole);
    });
});


getDatas();

//search form
const form_search = document.getElementById("form_search");

form_search.onsubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form_search);
    getDatas(formData.get("keyword"));

    form_search.reset();
}

const form_song = document.getElementById("form_song");

form_song.onsubmit = async (e) => {
    e.preventDefault();

     //disable button
     document.querySelector("#form_song button[type='submit']").disabled = true;
     document.querySelector(
         "#form_song button[type='submit']"
     ).innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span role="status">Loading...</span>`;
    const formData = new FormData(form_song);

    // //input data supabase
    const { data, error } = await supabase
    .from('songs')
    .insert([
        {
            title: formData.get("title"),
            key: formData.get("key"),
            
        },
    ])
    .select()
        
    //Show notification
    if (error == null) {
        successNotification("Song Added!", 5);
        //modal close
        document.getElementById("modal_close").click();
        //reload datas
        getDatas();
    }
    else {
        errorNotification("Something wrong happened. Cannot add song.", 15);
        console.log(error);
    }

    //reset form
    form_song.reset();

    document.querySelector("#form_song button[type='submit']").disabled = false;
    document.querySelector(
        "#form_song button[type='submit']"
    ).innerHTML = `Add Song`;

}

async function getDatas(keyword = "") {
    //get all rows
    
    
    let { data: songs, error } = await supabase
        .from('songs')
        .select('*')
        .or("title.ilike.%" + keyword + "%, key.ilike.%" + keyword + "%");
        
        
    //temporary storage for html elements and each item
    let container = "";
    //get each item and interpolate with html elements
    songs.forEach((item) => {
    container += ` <tr style="max-width: 100% !important; class="mx-5" data-id = "${item.id}">
    <td style="max-width: 95%  !important;" class="text-start p-2">${item.title}</td>
    <td style="max-width: 5%  !important;" class="text-center  " >${item.key}</td>
  </tr>`
        
    });
    //assign container to the element to be displayed
    document.getElementById("get_data").innerHTML = container;
    
    
   
}