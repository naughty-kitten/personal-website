// Set up the image carousel
async function loadImages() {    
    // Try to parse JSON file and fetch images
    try {
        // Get JSON file and set up image container
        const response = await fetch("/images/images.json");
        const container = document.getElementById("image-container");
        
        // Throw an error if fetching or parsing fails
        if (!response.ok) {throw new Error("Failed to fetch images");}
        const images = await response.json();
        
        // Iterate through the folder of images
        for (i=1; i < images.length+1; i++) {
            // Add HTML tags to carousel container
            container.innerHTML += `<img src="./${images[i-1]}" id="img${i}">`;
        }
        return images;
    // Throw an error if the parsing or fetching fails
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}
