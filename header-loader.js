document.addEventListener("DOMContentLoaded", () => {
    // 1. Locate the header target placeholder on the webpage
    const headerTarget = document.getElementById("main-header");
    if (!headerTarget) return;

    // 2. Fetch and render the header file
    fetch("header.html")
        .then(response => {
            if (!response.ok) throw new Error("Header file missing");
            return response.text();
        })
        .then(htmlData => {
            headerTarget.innerHTML = htmlData;
            
            // 3. Run Session Check Authentication
            const userUid = localStorage.getItem("gm_user_uid");
            const isLoggedIn = (userUid !== null && userUid !== undefined);

            const loggedInNav = document.getElementById("nav-logged-in");
            const loggedOutNav = document.getElementById("nav-logged-out");

            if (isLoggedIn) {
                if (loggedInNav) loggedInNav.style.display = "flex";
                if (loggedOutNav) loggedOutNav.style.display = "none";
            } else {
                if (loggedInNav) loggedInNav.style.display = "none";
                if (loggedOutNav) loggedOutNav.style.display = "flex";
            }
        })
        .catch(error => console.error("Error loading component:", error));
});
