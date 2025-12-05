// ================= CONFIGURATION =================
const apiKey = config.apiKey; 
const perPage = 15;
let currentPage = 1;
let currentSearchTerm = null;

// ================= DOM ELEMENTS =================
const galleryGrid = document.getElementById("gallery");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const loadMoreBtn = document.getElementById("load-more-btn");
const loader = document.getElementById("loader");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const tagButtons = document.querySelectorAll(".tag-btn");
const resultsCount = document.getElementById("results-count");

// ================= EVENT LISTENERS =================

// 1. Search Functionality
searchBtn.addEventListener("click", () => handleSearch(searchInput.value));

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch(searchInput.value);
});

// 2. Load More Button
loadMoreBtn.addEventListener("click", () => {
    currentPage++;
    fetchImages(currentSearchTerm, currentPage);
});

// 3. Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

// 4. Tag Buttons (Trending)
tagButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const tag = btn.getAttribute("data-tag");
        searchInput.value = tag;
        handleSearch(tag);
    });
});

// ================= MAIN FUNCTIONS =================

function handleSearch(query) {
    if (!query) return;
    
    // Reset state
    currentSearchTerm = query;
    currentPage = 1;
    galleryGrid.innerHTML = "";
    loadMoreBtn.classList.add("hidden");
    
    // Fetch new data
    fetchImages(currentSearchTerm, currentPage);
}

async function fetchImages(query, page) {
    // Show loader
    loader.classList.remove("hidden");
    
    let url;
    if (query) {
        url = `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${perPage}`;
        resultsCount.innerText = `Searching for "${query}"`;
    } else {
        url = `https://api.pexels.com/v1/curated?page=${page}&per_page=${perPage}`;
        resultsCount.innerText = "Curated picks for you";
    }

    try {
        const response = await fetch(url, {
            headers: { Authorization: apiKey }
        });
        
        const data = await response.json();

        // Hide loader
        loader.classList.add("hidden");

        if (data.photos.length === 0) {
            if(page === 1) galleryGrid.innerHTML = `<p class="text-center col-span-full text-gray-500">No images found.</p>`;
            return;
        }

        displayImages(data.photos);
        
        // Show load more button if there are more results
        loadMoreBtn.classList.remove("hidden");

    } catch (error) {
        console.error("Error:", error);
        loader.classList.add("hidden");
        galleryGrid.innerHTML = `<p class="text-center col-span-full text-red-400">Error fetching images. Please check your API Key.</p>`;
    }
}

function displayImages(photos) {
    photos.forEach(photo => {
        const div = document.createElement("div");
        div.classList.add("relative", "group", "overflow-hidden", "rounded-xl", "aspect-[3/4]", "gallery-item-anim", "img-card", "shadow-xl");

        div.innerHTML = `
            <img 
                src="${photo.src.large}" 
                alt="${photo.alt}" 
                class="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            >
            
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 overlay">
                <p class="text-white font-bold text-lg truncate">${photo.photographer}</p>
                
                <div class="flex justify-between items-center mt-2">
                    <a href="${photo.src.original}" target="_blank" download class="bg-teal-500 hover:bg-teal-600 text-white text-xs px-3 py-1 rounded-full transition">
                        <i class="fas fa-download mr-1"></i> Download
                    </a>
                    <a href="${photo.url}" target="_blank" class="text-gray-300 hover:text-white text-xs">
                        <i class="fas fa-external-link-alt"></i> Pexels
                    </a>
                </div>
            </div>
        `;
        galleryGrid.appendChild(div);
    });
}

// ================= INITIAL LOAD =================
// Load Curated images on startup
fetchImages(null, 1);