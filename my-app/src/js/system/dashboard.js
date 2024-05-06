import { toggleButtonVisibility, supabase } from "../main";

getDatas();
document.addEventListener("DOMContentLoaded", async () => {
    const userRole = localStorage.getItem("role");

    // Find all button elements with the "dashboardButton" class
    const dashboardButtons = document.querySelectorAll(".adminButton");

    // Call toggleButtonVisibility function for each button with user role
    dashboardButtons.forEach(button => {
        toggleButtonVisibility(button, userRole);
    });
});

const form_announcement = document.getElementById("editForm");

form_announcement.onsubmit = async (e) => {
    e.preventDefault();
    
};

async function getDatas() {
    //get all rows
    
    let { data: announcements, error } = await supabase
        .from('announcements')
        .select('*');
    let container = "";
    announcements.forEach((element) => {
        container += ` <div class="carousel-item active ">
        <!-- Card Announcement for Slide 1 -->
        <div class="card text-light position-relative theme" data-id = "${element.id}">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.body}</p>
            </div>
            <!-- Dropdown menu positioned relative to the card -->
            <div class="dropdown position-absolute top-0 end-0">
              <button class="btn dashboardButton" type="button"  data-bs-toggle="dropdown" aria-expanded="false">
                <span class="bi bi-three-dots text-white" aria-hidden="true"></span>
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#" data-bs-toggle="modal" id="btn_edit" data-bs-target="#editModal" data-id = "${element.id} ">Edit</a></li>
                <li><a class="dropdown-item" href="#"  data-id = "${element.id}">Hide</a></li>
              </ul>
            </div>
            
        </div>
    </div>`
        
    });

  
    
    // Assign click event on Edit Btns
    document.querySelectorAll("#btn_edit").forEach((element) => {
        element.addEventListener("click", editAction);
    });
};


const editAction = async (e) => {
    const id = e.target.getAttribute("data-id");

    let { data: announcements, error } = await supabase
        .from('announcements')
        .select('*')
        .eq("id", id);
    
    console.log(announcements);
    if (error == null) {
        document.getElementById("title").value = announcements[0].title;
        document.getElementById("body").value = announcements[0].body;
    }
    
   // Show the modal
   const editModal = new bootstrap.Modal(document.getElementById("editModal"));
   editModal.show();

    

        
};
