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
getDatas();
// const form_profile = document.getElementById("form_profile");

// form_profile.onsubmit = async (e) => {
//   e.preventDefault();

//   // Disable submit button and show loading indicator
//   const submitButton = document.querySelector("#form_profile button[type='submit']");
//   submitButton.disabled = true;
//   submitButton.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> <span role="status">Loading...</span>`;

//   const formData = new FormData(form_profile);

//   //console.log(formData.get("image_path"));

//   const image = formData.get("image_path");

//   // Upload image to Supabase storage
//   const { data, error } = await supabase
//       .storage
//       .from('profiles')
//       .upload('public/' + image.name, image, {
//           cacheControl: '3600',
//           upsert: true
//       });
//   const image_data = data;

// //   if (uploadError) {
// //       // Enable submit button and display error notification
// //       submitButton.disabled = false;
// //       submitButton.innerHTML = `Save Changes`;
// //       errorNotification("Error uploading image.", 15);
// //       console.error(uploadError);
// //       return;
// //   }

// //   const image_path = imageData.path;

// //   const userId = localStorage.getItem('userId');

//   // Insert or update profile data in Supabase
//   const { datas, errors } = await supabase
//     .from("profiles")
//     .upsert([
//       {
//         nickname: formData.get("nickname"),
//         email: formData.get("email"),
//         address: formData.get("address"),
//         image_path: image_data == null ? null : image_data.path,
//       }
//     ])
//     .select();

// //   if (!insertError) {
// //       successNotification("Profile Successfully Updated!", 15);
// //       getDatas(); // Reload profile data
// //   } else {
// //       errorNotification("Error updating profile.", 15);
// //       console.error(insertError);
// //   }

// //   // Close modal and reset form
// //   document.getElementById("modal_close").click();
// //   form_profile.reset();

//   // Enable submit button
//   submitButton.disabled = false;
//   submitButton.innerHTML = `Save Changes`;
// };

// async function getDatas() {
//   const userId = localStorage.getItem('userId');

//   // Fetch user's profile data from Supabase
//   let { data: profiles, error } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('auth_id', userId)
//       .single();

//   if (!error) {
//       // Set values to the corresponding elements
//       document.getElementById("first_name").textContent = profiles.first_name;
//       document.getElementById('last_name').textContent = profiles.last_name;
//       document.getElementById('nickname').textContent = profiles.nickname;
//       document.getElementById('address').textContent = profiles.address;
//       document.getElementById('email').textContent = profiles.email;
//       document.getElementById('cellphone_no').textContent = profiles.cellphone_no;
//   } else {
//       console.error(error);
//   }
// }

// // const form_profile = document.getElementById("form_profile");

// // form_profile.onsubmit = async (e) => {
// //   e.preventDefault();
// //   const userId = localStorage.getItem('userId');

// //   // //disable button
// //   // document.querySelector("#form_profile button[type='submit']").disabled = true;
// //   // document.querySelector(
// //   //     "#form_profile button[type='submit']"
// //   // ).innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
// //   //  <span role="status">Loading...</span>`;
// //   const formData = new FormData(form_profile);
   
    
    
// //   //     const image = formData.get("image_path")
// //   //   const { data, error } = await supabase
// //   //     .storage
// //   //     .from('profiles')
// //   //     .upload('public/' + image.name, image, {
// //   //       cacheControl: '3600',
// //   //       upsert: true
// //   //     });
    
    
// //   //     console.log(data);
// //   //      const image_data = data;
    
// //   //     const userId = localStorage.getItem('userId');
// //   //     // // if (for_update_id == "") {
// //   //     // //     // Supabase Create
// //   const { data, errorer } = await supabase
// //     .from("profiles")
            
// //     .upsert([
// //       {
// //         nickname: formData.get("nickname"),
// //         email: formData.get("email"),
// //         address: formData.get("address"),
// //         cellphone_no: formData.get("cellphone_no")
// //         //image_path: image_data == null ? null : image_data.path, // If you dont have uploading, you can comment this
// //       }, { onConflict: ['auth_id'] }
// //     ])
// //     .eq("auth_id", userId)
// //     .select();
// //   console.log(data);
// // }
    
// // //     //     if (error == null) {
// // //     //         successNotification("Item Successfully Added!", 15);
      
// // //     //         // Reload Datas
// // //     //         getDatas();
// // //     //       } else {
// // //     //         errorNotification("Something wrong happened. Cannot add item.", 15);
// // //     //         console.log(error);
// // //     //       }
    
    
// // //     //     if (error == null) {
// // //     //       successNotification("Profile Successfully Edited", 15);
    
// // //     //       // Reload Datas
// // //     //       getDatas();
// // //     //     } else {
// // //     //       errorNotification("Something wrong happened. Cannot edit profile.", 15);
// // //     //       console.log(error);
// // //     //     }
// // //     //   }
// // //     //   // for Update
// // //     //   else {
// // //     //     const { data, error } = await supabase
// // //     //       .from("profiles")
// // //     //       .update({
// // //     //         nickname: formData.get("nickname"),
// // //     //         email: formData.get("email"),
// // //     //           cellphone_no: formData.get("cellphone_no"),
// // //     //           address: formData.get(address),
// // //     //         image_path: image_data == null ? null : image_data.path, // If you dont have uploading, you can comment this
// // //     //       })
// // //     //       .eq("auth_id", userId)
// // //     //       .select();
    
// // //     //     if (error == null) {
// // //     //       successNotification("Item Successfully Updated!", 15);
    
// // //     //       // Reset storage id
// // //     //     //  for_update_id = "";
    
// // //     //       // Reload Datas
// // //     //       getDatas();
// // //     //     } else {
// // //     //       errorNotification("Something wrong happened. Cannot add item.", 15);
// // //     //       console.log(error);
// // //     //     }
// // //   //   }
  
    
// // //       // // Modal Close
// // //       // document.getElementById("modal_close").click();
    
// // //       // // Reset Form
// // //       // form_profile.reset();
    
// // //       // // Enable Submit Button
// // //       // document.querySelector("#form_profile button[type='submit']").disabled = false;
// // //       // document.querySelector(
// // //       //   "#form_profile button[type='submit']"
// // //       // ).innerHTML = `Save Changes`;
// // // }
// // // //     // //input data supabase
// // // //     const { data, error } = await supabase
// // // //         .from('profiles')
// // // //         .insert([
// // // //             {
// // // //                 nickname: formData.get("nickname"),
// // // //                 address: formData.get("address"),
// // // //                 description: formData.get("description"),
                
// // // //             },
// // // //         ])
// // // //         .select()
        
// // // //     //Show notification
// // // //     if (error == null) {
// // // //         successNotification("Profile Successfully Changed", 15);
// // // //         //modal close
// // // //         document.getElementById("modal_close").click();
// // // //         //reload datas
// // // //         getDatas();
// // // //     }
// // // //     else {
// // // //         errorNotification("Something wrong happened. Cannot edit profile.", 15);
// // // //         console.log(error);
// // // //     }

// // // //     //reset form
// // // //     form_profile.reset();

// // // //     document.querySelector("#form_profile button[type='submit']").disabled = false;
// // // //      document.querySelector(
// // // //        "#form_profile button[type='submit']"
// // // //      ).innerHTML = `Save Changes`;

// // // // };

// // // // // Fetch user profile information from Supabase
// // // // const fetchUserProfile = async () => {
// // // //     const user = supabase.auth.user();
// // // //     if (user) {
// // // //         const { data: profile, error } = await supabase
// // // //             .from('profiles')
// // // //             .select('first_name, email, cellphone_no')
// // // //             .eq('auth_id', user.id)
// // // //             .single();

// // // //         if (error) {
// // // //             console.error('Error fetching user profile:', error.message);
// // // //             return;
// // // //         }

// // // //         // Update HTML elements with user profile information
// // // //         document.getElementById('first_name').textContent = profile.first_name;
// // // //         document.getElementById('email').textContent = profile.email;
// // // //         document.getElementById('cellphone_no').textContent = profile.cellphone_no;
// // // //     }
// // // // };

// // // // // Call the fetchUserProfile function when the page loads
// // // // window.onload = fetchUserProfile;




// // // // // Call the fetchUserProfile function when the page loads
// // // // window.onload = fetchUserProfile;

async function getDatas() {
    // Get user ID from localStorage
    const userId = localStorage.getItem('userId');
    
    // Fetch user's profile data from Supabase
    let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('auth_id', userId)
        .single();

        
    if (error == null) {
        // Set values to the corresponding elements
        document.getElementById("first_name").textContent = profiles.first_name;
        document.getElementById('last_name').textContent = profiles.last_name;
        document.getElementById('get_nickname').textContent = profiles.nickname;
        document.getElementById('get_address').textContent = profiles.address;
        document.getElementById('get_email').textContent = profiles.email;
        document.getElementById('get_cellphone').textContent = profiles.cellphone_no;
    } else {
        console.log(error);
    }
}

// Submit Form Functionality; Both Functional for Create and Update
const form_profile = document.getElementById("form_profile");

form_profile.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button
  document.querySelector("#form_profile button[type='submit']").disabled = true;
  document.querySelector("#form_profile button[type='submit']").innerHTML = `
                      <span>Loading...</span>`;

  // Get All values from input, select, textarea under form tag
  const formData = new FormData(form_profile);
  const userId = localStorage.getItem('userId');
 // Supabase Image Upload
  const image = formData.get("image_path");
  const { data, error } = await supabase.storage
    .from("profiles_image")
    
    .upload("public/" + image.name, image, {
      cacheControl: "3600",
      upsert: true,
    });
  // Pass supabase image data to image_data
  const image_data = data;

  // Error notification for upload
  if (error) {
    errorNotification(
      "Something wrong happened. Cannot upload image, image size might be too big. You may update the item's image.",
      15
    );
    console.log(error);
  }

  if (userId != null) {
    
    const { datas, error } = await supabase
      .from('profiles')
      .update([ 
        {
          nickname: formData.get("nickname"),
          address: formData.get("address"),
          cellphone_no: formData.get("cellphone_no"),
          email: formData.get("email"),
          image_path: image_data == null ? null : image_data.path, // If you dont have uploading, you can comment this
        }
      ])
      .eq("auth_id", userId)
      .select();
    
      if (error == null) {
        successNotification("Item Successfully Updated!", 15);
    
        
    
        // Reload Datas
       getDatas();
      } else {
        errorNotification("Something wrong happened. Cannot add item.", 15);
        console.log(error);
      }
  }

  

  // Modal Close
  document.getElementById("modal_close").click();

  // Reset Form
  form_profile.reset();

  // Enable Submit Button
  document.querySelector("#form_profile button[type='submit']").disabled = false;
  document.querySelector(
    "#form_profile button[type='submit']"
  ).innerHTML = `Submit`;
};





