 

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

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("latest").addEventListener("click", () => sortData('desc'));
    document.getElementById("oldest").addEventListener("click", () => sortData('asc'));

    getDatas(); // Initial data load
});

getDatas();




const form_schedule = document.getElementById("form_schedule");

form_schedule.onsubmit = async (e) => {
    e.preventDefault();

    //disable button
    document.querySelector("#form_schedule button[type='submit']").disabled = true;
    document.querySelector(
        "#form_schedule button[type='submit']"
    ).innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
     <span role="status">Loading...</span>`;
    const formData = new FormData(form_schedule);


    const userId = localStorage.getItem('userId');
    let { data: profiles, errorer } = await supabase
    .from('profiles')
    .select('id')
    .eq("auth_id",userId)
        
    const id = profiles[0].id; 

    // //input data supabase
    const { data, error } = await supabase
        .from('schedules')
        .insert([
            {
                sched_date: formData.get("sched_date"),
                song_leader: formData.get("song_leader"),
                media: formData.get("media"),
                guitarist: formData.get("guitarist"),
                bassist: formData.get("bassist"),
                keyboardist: formData.get("keyboardist"),
                drummer: formData.get("drummer"),
                backup1: formData.get("backup1"),
                backup2: formData.get("backup2"),
                backup3: formData.get("backup3"),
                backup4: formData.get("backup4"),
                user_id: id
            },
        ])
        .select()
        
    //Show notification
    if (error == null) {
        successNotification("Schedule Successfully Set and Add!", 15);
        //modal close
        document.getElementById("modal_close").click();
        //reload datas
        getDatas();
    }
    else {
        errorNotification("Something wrong happened. Cannot add/set schedule.", 15);
        console.log(error);
    }

    //reset form
    form_schedule.reset();

    document.querySelector("#form_schedule button[type='submit']").disabled = false;
     document.querySelector(
       "#form_schedule button[type='submit']"
     ).innerHTML = `Add Schedule`;

};

async function getDatas(order = 'desc') {
    let { data: schedules, error } = await supabase
        .from('schedules')
        .select('*')
        .order('sched_date', { ascending: order === 'asc' });

    if (error) {
        console.error(error);
    } else {
        updateContainer(schedules);
    }
}const userRole = localStorage.getItem("role");

// Check if the user has admin role
const isAdmin = userRole === "admin";

function updateContainer(schedules) {
    let container = "";
    schedules.forEach((item) => {
        let schedDate = new Date(item.sched_date);
        let dayOfWeek = schedDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
        let formattedDate = schedDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

        container += `<div class="col-md-6">
            <div class="card theme text-light m-2" data-id="${item.id}">
                <div class="card-header d-flex align-items-center justify-content-between d-inline"> ${formattedDate} <span>|</span> ${dayOfWeek}
                   
                    <div class="dropdown float-end " >
                    <button class="btn dropdown-toggle text-light btn-sm adminButton" type="button"  data-bs-toggle="dropdown" aria-expanded="false">
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item " href="#" id="btn_delete" data-id="${item.id}">Delete</a></li>
                        </ul>
                    </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="card p-2 small">
                        <span class="card-text"><b>Song Leader : </b><span>${item.song_leader}</span></span>
                        <span class="card-text"><b>Media : </b><span>${item.media}</span></span>
                        <hr>
                        <div class="row d-flex justify-content-center align-items-center">
                            <div class="col-8">
                                <span class="card-text mb-2"><b>Musician : </b></span>
                                <p class="card-text ms-1 mb-0"><b>Guitarist : </b><span>${item.guitarist}</span></p>
                                <p class="card-text ms-1 mb-0"><b>Bassist : </b><span>${item.bassist}</span></p>
                                <p class="card-text ms-1 mb-0"><b>Keyboardist : </b><span>${item.keyboardist}</span></p>
                                <p class="card-text ms-1 mb-0"><b>Drummer : </b><span>${item.drummer}</span></p>
                            </div>
                            <div class="col-4 mycontent">
                                <span class="card-text mb-2"><b>Back-up</b></span>
                                <p class="card-text ms-2 mb-0">${item.backup1}</p>
                                <p class="card-text ms-2 mb-0">${item.backup2}</p>
                                <p class="card-text ms-2 mb-0">${item.backup3}</p>
                                <p class="card-text ms-2 mb-0">${item.backup4}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    document.getElementById("get_data").innerHTML = container;

     // Disable buttons if user is not an admin
     if (!isAdmin) {
        const adminButtons = document.querySelectorAll(".adminButton");
        adminButtons.forEach(button => {
            toggleButtonVisibility(button, userRole);
        });
    }


    // Add event listener for delete buttons
    document.querySelectorAll("#btn_delete").forEach((item) => {
        item.addEventListener("click", deleteAction);
    });
}

async function sortData(order) {
    getDatas(order);
}




const deleteAction = async (e) => {
    const id = e.target.getAttribute("data-id");
    // Change background color the card that you want to delete
    //document.querySelector(`.card[data-id="${id}"]`).style.backgroundColor = "red";
    //supabase delete row 
    const { error } = await supabase
        .from('schedules')
        .delete()
        .eq("id", id);
    //Show notification
    if (error == null) {
        successNotification("Schedule Successfully Deleted!", 15);
        // Remove the Card from the list
        const element = document.querySelector(`.card[data-id="${id}"]`);
        if (element) {
            element.remove();
            // Reload datas or perform any other actions
        } else {
            console.log(`Element with data-id="${id}" not found.`);
        }
        
        //reload datas
        getDatas();
    }
    else {
        errorNotification("Something wrong happened. Cannot delete schedule.", 15);
        console.log(error);
         
       // Change background color the card that you want to delete
    //document.querySelector(`.card[data-id="${id}"]`).style.backgroundColor = "white";
    }
        
};

