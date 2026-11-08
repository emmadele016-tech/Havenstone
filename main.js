// MOBILE NAVIGATION MENU

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
});
// PROPERTY SEARCH TABS

const searchTabs = document.querySelectorAll(".search-tab");

searchTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        // Remove active class from all tabs
        searchTabs.forEach(function (item) {
            item.classList.remove("active");
        });

        // Activate the clicked tab
        tab.classList.add("active");

    });

});
// PROPERTY SEARCH FORM

const propertySearch = document.getElementById("propertySearch");

if (propertySearch) {
  
propertySearch.addEventListener("submit", function (event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get the visitor's search details
    const location = document.getElementById("location").value;
    const propertyType = document.getElementById("propertyType").value;
    const priceRange = document.getElementById("priceRange").value;

    // Get the selected search tab
    const activeTab = document.querySelector(".search-tab.active");
    const searchMode = activeTab.dataset.mode;

    // Display search information
    alert(
        "Search Details:\n" +
        "Category: " + searchMode.toUpperCase() + "\n" +
        "Location: " + (location || "Any location") + "\n" +
        "Property Type: " + (propertyType || "Any property") + "\n" +
        "Price Range: " + (priceRange || "Any price")
    );

});
}
// PROPERTIES PAGE FILTERS

const listingFilters = document.getElementById("listingFilters");
const propertyGrid = document.getElementById("propertyGrid");

if (listingFilters && propertyGrid) {

    listingFilters.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get the selected filter values
        const location = document
            .getElementById("listingLocation")
            .value.toLowerCase()
            .trim();

        const type = document.getElementById("listingType").value;

        const purpose = document.getElementById("listingPurpose").value;

        // Get all property cards
        const properties = propertyGrid.querySelectorAll(".property-card");

        let visibleCount = 0;

        properties.forEach(function (property) {

            const propertyLocation = property.dataset.location;
            const propertyType = property.dataset.type;
            const propertyPurpose = property.dataset.purpose;

            const matchesLocation = propertyLocation.includes(location);
            const matchesType = !type || propertyType === type;
            const matchesPurpose = !purpose || propertyPurpose === purpose;

            if (matchesLocation && matchesType && matchesPurpose) {

                property.style.display = "flex";
                visibleCount++;

            } else {

                property.style.display = "none";

            }

        });

        // Update the results counter
        document.getElementById("resultsCount").innerHTML =
            "Showing <strong>" + visibleCount + " properties</strong>";

        // Display a message if no properties match
        document.getElementById("noResults").hidden = visibleCount !== 0;

    });

}


// ========================================
// CONTACT PAGE FORM — EMAILJS
// ========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const feedback = document.getElementById("formFeedback");
    const submitButton = contactForm.querySelector(
        'button[type="submit"], input[type="submit"]'
    );

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();

        if (!fullName) {
            feedback.textContent = "Please enter your full name.";
            return;
        }

        feedback.textContent = "Sending your enquiry...";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        emailjs.sendForm(
            "service_rnmbdp9",
            "template_aq7ohtf",
            contactForm,
            {
                publicKey: "D24cvmYqYv1fHkdRe"
            }
        )
        .then(function () {

            feedback.textContent =
                "Thank you, " + fullName +
                ". Your enquiry has been sent successfully!";

            contactForm.reset();

        })
        .catch(function (error) {

            console.error("EmailJS Error:", error);

            feedback.textContent =
                "Sorry, your enquiry could not be sent. Please try again.";

        })
        .finally(function () {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            }

        });

    });

}


// PROPERTY DETAILS PAGE

const detailImage = document.getElementById("detailImage");

if (detailImage) {

    const properties = {
        azure: {
            title: "The Azure Residence",
            location: "Dubai, UAE",
            price: "$850,000",
            bedrooms: "4 Bedrooms",
            bathrooms: "3 Bathrooms",
            area: "320 m²",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
            description: "Discover elegant living at The Azure Residence. This spacious villa offers a welcoming atmosphere, modern architecture and comfortable living spaces designed for contemporary lifestyles."
        },

        meridian: {
            title: "The Meridian Suites",
            location: "London, UK",
            price: "£2,800/month",
            bedrooms: "2 Bedrooms",
            bathrooms: "2 Bathrooms",
            area: "115 m²",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
            description: "Experience comfortable city living at The Meridian Suites. This contemporary apartment combines thoughtful design, practical spaces and a convenient London location."
        },

        oakwood: {
            title: "The Oakwood Estate",
            location: "Toronto, Canada",
            price: "C$620,000",
            bedrooms: "3 Bedrooms",
            bathrooms: "3 Bathrooms",
            area: "245 m²",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
            description: "The Oakwood Estate offers a blend of comfort and contemporary style. With generous living areas and a welcoming design, it provides an appealing setting for everyday life."
        }
    };

    const selectedProperty = new URLSearchParams(window.location.search).get("property");
    const property = properties[selectedProperty];

    if (property) {
        document.getElementById("detailImage").src = property.image;
        document.getElementById("detailImage").alt = property.title;
        document.getElementById("detailLocation").textContent = property.location;
        document.getElementById("detailTitle").textContent = property.title;
        document.getElementById("detailPrice").textContent = property.price;
        document.getElementById("detailBedrooms").textContent = property.bedrooms;
        document.getElementById("detailBathrooms").textContent = property.bathrooms;
        document.getElementById("detailArea").textContent = property.area;
        document.getElementById("detailDescription").textContent = property.description;
    } else {
        document.querySelector(".property-details-container").innerHTML =
            "<h2>Property not found</h2><p>Please return to our properties page and select a property.</p>";
    }
}
