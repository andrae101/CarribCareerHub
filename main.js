// ----------------------------
// MAIN.JS - Fully ready
// ----------------------------

// 1️⃣ Supabase Setup
const SUPABASE_URL = "https://fpytvfhynleaivkvuedt.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZweXR2Zmh5bmxlYWl2a3Z1ZWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzU1OTAsImV4cCI6MjA3MTI1MTU5MH0.Q7UHLIA_3_o7zCdV-IOthWOYGVVlINDXjp1uF4sdBRk";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2️⃣ Login Button
const loginButton = document.getElementById("login-btn");

loginButton.addEventListener("click", async () => {
    try {
        // Redirect user to Supabase Auth login (can be email/password)
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google" // You can change this to email/password if needed
        });

        if (error) {
            console.error("Login error:", error.message);
            alert("Login failed. Check console for details.");
            return;
        }

        console.log("Login success:", data);
        // Redirect to dashboard
        window.location.href = "/dashboard.html"; 
    } catch (err) {
        console.error(err);
    }
});

// 3️⃣ AI-Ready Placeholders
// These are functions that can later integrate AI features like suggestions, search autocomplete, or job recommendations.

function aiSuggestJobs(userInput) {
    // Placeholder: later we will call AI API to suggest jobs
    console.log(`AI would suggest jobs based on: ${userInput}`);
}

function aiHelpUser(actionType) {
    // Placeholder for AI pop-up help
    console.log(`AI would assist user for: ${actionType}`);
}

// Example usage:
// aiSuggestJobs("developer");
// aiHelpUser("fill CV form");
