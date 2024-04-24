// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap' 

import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://ycflgvnjrstfwqyvblvq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZmxndm5qcnN0ZndxeXZibHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4MTQ1NzAsImV4cCI6MjAyODM5MDU3MH0.XbP_5oejRDnh81Um9DQE7POpi-SWLysvg_h9bDV_FTY')  

export { supabase };



/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// Get all navigation links
// Add a click event listener to all navigation links
document.querySelectorAll('.nav__menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Remove the 'active-link' class from all links
        document.querySelectorAll('.nav__menu a').forEach(link => {
            link.classList.remove('active-link');
        });
        
        // Add the 'active-link' class to the clicked link
        this.classList.add('active-link');

        // Highlight the correct navigation link based on the href attribute
        const currentHref = this.getAttribute('href');
        document.querySelectorAll('.nav__menu a').forEach(link => {
            if (link.getAttribute('href') === currentHref) {
                link.classList.add('active-link');
            }
        });
    });
});

