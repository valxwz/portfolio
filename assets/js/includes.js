document.addEventListener("DOMContentLoaded", function() {
    console.log("Includes.js loaded, looking for elements with data-include");
    
    const elements = document.querySelectorAll("[data-include]");
    console.log(`Found ${elements.length} elements to include`);
    
    if (elements.length === 0) {
        console.log("No elements with data-include found");
        return;
    }
    
    let completedCount = 0;

    const markComplete = () => {
        completedCount += 1;
        if (completedCount === elements.length) {
            console.log("All includes loaded");
            window.dispatchEvent(new Event('includes:loaded'));
        }
    };

    elements.forEach((el, index) => {
        const file = el.getAttribute("data-include");
        console.log(`Processing include ${index + 1}: ${file}`);
        
        // Try to fetch the file
        console.log(`Attempting to fetch: ${file}`);
        
        fetch(file)
            .then(response => {
                console.log(`Response for ${file}:`, response.status, response.statusText);
                if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                return response.text();
            })
            .then(data => {
                console.log(`Successfully loaded ${file}, length: ${data.length}`);
                el.innerHTML = data;
                markComplete();
            })
            .catch(err => {
                console.error(`Failed to load ${file}:`, err.message);
                el.innerHTML = `<!-- Failed to load include: ${file} - ${err.message} -->`;
                
                // Show a helpful message for debugging
                if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                    console.log("This usually means you're opening the file directly in the browser.");
                    console.log("Try using a local web server instead.");
                    console.log("Run: python3 -m http.server 8000 in your project directory");
                }
                markComplete();
            });
    });
});