// This variable is used to communicate between the 2 functions
var imgArray;

// Set up the image carousel
async function setupCarousel() {    
    // Try to parse JSON file and fetch images
    try {
        // Get JSON file and set up carousel container
        const response = await fetch("/images/images.json");
        const carouselContainer = document.getElementById("image-carousel");
        
        // Throw an error if fetching or parsing fails
        if (!response.ok) throw new Error("Failed to fetch images");
        const images = await response.json();
        imgArray = images;
        
        // Iterate through the folder of images
        for (i=1; i < images.length+1; i++) {
            // Add HTML tags to carousel container
            carouselContainer.innerHTML += `<img src="${images[i-1]}" id="img${i}" style="display:none;">`
        }
        
        // Hide all images except for the first one
        document.getElementById("carousel-indicator").innerText = `1/${imgArray.length}`
        document.getElementById("img1").style.display = "block";
        return images;
    // Throw an error if the parsing or fetching fails
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}

// This variable is used to track carousel position
var currentSlide = 1;

// Step the carousel on user input
function stepSlide(amount) {
    var newSlide = currentSlide + amount;
    
    // If the carousel is on the first slide and the user steps it backwards, wrap it around
    if (currentSlide === 1 && amount === -1) {
        newSlide = imgArray.length;
    }
    
    // If the carousel is on the last slide and the user steps it forwards, wrap it around
    if (currentSlide === imgArray.length && amount === 1) {
        newSlide = 1;
    }
    
    // Update image visibility
    document.getElementById(`img${currentSlide}`).style.display = "none";
    document.getElementById(`img${newSlide}`).style.display = "block";
    
    // Update main page background
    document.querySelector("body").style.backgroundImage = `url(${imgArray[newSlide-1]})`
    
    // Update tracking variable
    currentSlide = newSlide;
    
    // Update slide index indicator
    document.getElementById("carousel-indicator").innerText = `${currentSlide}/${imgArray.length}`
}
