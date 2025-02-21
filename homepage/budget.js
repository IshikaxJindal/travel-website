// script.js

// this has to be done tomorrow when name of all places available


const destinationsData = [
    { name: "Bhangarh fort", averageCost: 200, type: "Rajasthan" },
    { name: "Jaswant Thada", averageCost: 100, type: "Rajasthan" },
    { name: "Nelliyampathy", averageCost: 250, type: "Maharashtra"},
    { name: "Bekal Fort", averageCost: 150, type: "Maharashtra" },
    { name: "Guhagar", averageCost: 220, type: "Kerela" },
    { name: "Lonar Crater Lake", averageCost: 180, type: "Kerela" },
    { name: "Kuskem Waterfalls", averageCost: 180, type: "Goa" },
    { name: "Arvalem Caves", averageCost: 300, type: "Goa" }

];

function analyzeBudget() {
    // Get user input
    const budget = parseFloat(document.getElementById("budget").value);
    const duration = parseInt(document.getElementById("duration").value);
    const type = document.getElementById("type").value;

    // Calculate maximum daily cost allowed
    const maxDailyCost = budget / duration;

    // Filter destinations based on budget and type
    const suitableDestinations = destinationsData.filter(
        destination => destination.averageCost <= maxDailyCost && destination.type === type
    );

    // Display results
    const resultsContainer = document.getElementById("destinations");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (suitableDestinations.length > 0) {
        suitableDestinations.forEach(destination => {
            const destinationElement = document.createElement("p");
            destinationElement.textContent = `${destination.name} - Average Daily Cost: ₹${destination.averageCost}`;
            resultsContainer.appendChild(destinationElement);
        });
    } else {
        resultsContainer.innerHTML = "<p>No destinations match your budget and preferences.</p>";
    }
}
// script.js

// async function analyzeBudget() {
//     // Get user input
//     const budget = parseFloat(document.getElementById("budget").value);
//     const duration = parseInt(document.getElementById("duration").value);
//     const type = document.getElementById("type").value;

//     const budgetData = { budget, duration, type };

//     try {
//         const response = await fetch("http://localhost:5000/api/budget/analyze", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(budgetData),
//         });

//         const destinations = await response.json();
//         displayDestinations(destinations);
//     } catch (error) {
//         console.error("Error fetching budget analysis:", error);
//     }
// }

// function displayDestinations(destinations) {
//     const resultsContainer = document.getElementById("destinations");
//     resultsContainer.innerHTML = ""; // Clear previous results

//     if (destinations.length > 0) {
//         destinations.forEach(destination => {
//             const destinationElement = document.createElement("p");
//             destinationElement.textContent = `${destination.name} - Average Daily Cost: $${destination.averageCost}`;
//             resultsContainer.appendChild(destinationElement);
//         });
//     } else {
//         resultsContainer.innerHTML = "<p>No destinations match your budget and preferences.</p>";
//     }
// }

