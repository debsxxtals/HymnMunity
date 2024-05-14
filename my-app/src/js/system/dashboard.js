import { toggleButtonVisibility, supabase, errorNotification, successNotification } from "../main";

getDatas();

const form_announcement = document.getElementById("editForm");

form_announcement.onsubmit = async (e) => {
    e.preventDefault();

     //disable button
     document.querySelector("#editForm button[type='submit']").disabled = true;
     document.querySelector(
         "#editForm button[type='submit']"
     ).innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span role="status">Loading...</span>`;
    
    const userId = localStorage.getItem('userId');
    let { data: profiles, errorer } = await supabase
    .from('profiles')
    .select('id')
    .eq("auth_id",userId)
        
    const id = profiles[0].id; 

    // Get All values from input, select, textarea under form tag
    const formData = new FormData(form_announcement);
  
    const { data, error } = await supabase
      .from("announcements")
        .update({
    
        title: formData.get("title"),
        body: formData.get("body"),
        user_id: id
        
        })
        

      

        
      .eq("id", for_update)
      .select();

    if (error == null) {
      successNotification("Announcement Successfully Updated!", 5);

      // Reset storage id
      for_update = "";

      // Reload Datas
      getDatas();
    } else {
      errorNotification("Something wrong happened. Cannot edit announcement.", 10);
      console.log(error);
    }

    // Modal Close
    document.getElementById("modal_close").click();
    // Reset Form
    form_announcement.reset();

    // Enable Submit Button
    document.querySelector("#editForm button[type='submit']").disabled = false;
    document.querySelector(
        "#editForm button[type='submit']"
    ).innerHTML = `Save Changes`;
    
};

async function getDatas() {
    // Get user role from localStorage
    const userRole = localStorage.getItem("role");

    // Check if the user has admin role
    const isAdmin = userRole === "admin";

    //get all rows
    let { data: announcements, error } = await supabase
        .from('announcements')
        .select('*');
    let container = "";
    announcements.forEach((element) => {
        container += `<div class="carousel-item active">
        <!-- Card Announcement for Slide 1 -->
        <div class="card text-light position-relative theme" data-id="${element.id}">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.body}</p>
            </div>
            <!-- Dropdown menu positioned relative to the card -->
            <div class="dropdown position-absolute top-0 end-0">
                <button class="btn adminButton" type="button"  data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="bi bi-three-dots text-white" aria-hidden="true"></span>
                    <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editModal" data-id="${element.id}">Edit</a></li>
                </ul>
            </div>
        </div>
    </div>`;
    });
    
    //assign container to the element to be displayed
    document.getElementById("get_data").innerHTML = container;
    
    // Disable buttons if user is not an admin
    if (!isAdmin) {
        const adminButtons = document.querySelectorAll(".adminButton");
        adminButtons.forEach(button => {
            toggleButtonVisibility(button, userRole);
        });
    }
    
    // Assign click event on Edit Btns
    document.querySelectorAll(".dropdown-item").forEach((element) => {
        element.addEventListener("click", editAction);
    });
}


//storage of id of chosen data to update
let for_update = "";


const editAction = async (e) => {
    const id = e.target.getAttribute("data-id");
// supabase show by id
    let { data: announcements, error } = await supabase
        .from('announcements')
        .select('*')
        .eq("id", id);
    
    console.log(announcements);
    if (error == null) {
        //store id to a variable, id will be utilize for update
        for_update = announcements[0].id;

        document.getElementById("title").value = announcements[0].title;
        document.getElementById("body").value = announcements[0].body;
    } else {
        errorNotification("Something wrong happened. Cannot edit announcement", 15);
        console.log(error);
    }
    
//    // Show the modal
//    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
//    editModal.show();

    

        
};
