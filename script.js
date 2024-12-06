// API URL http://api.weatherapi.com/v1/current.json?key=7438fe30f0964b6daf391826240612&q=chennai&aqi=no

const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

// Debugging the selected DOM elements
console.log({
    temperatureField,
    locationField,
    dateandTimeField,
    conditionField,
    searchField
});

form.addEventListener('submit', searchForLocation);

let target = 'Lucknow';

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=7438fe30f0964b6daf391826240612&q=${targetLocation}&aqi=no`;

    console.log("Fetching data for:", targetLocation); // Debugging the location being fetched

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("City not found");
        }
        const data = await res.json();
        console.log("API Response:", data); // Debugging API response

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching the weather data:", error);
    }
};

function updateDetails(temp, locationName, time, condition) {
    if (!temperatureField || !locationField || !dateandTimeField || !conditionField) {
        console.error("One of the DOM elements is not found");
        return;
    }

    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];

    let currentDay = getDayName(new Date(splitDate).getDay());

    console.log("Updating details with:", temp, locationName, currentDay, splitTime, condition); // Debugging the update function

    temperatureField.innerText = `${temp}°C`;
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();

    target = searchField.value;
    console.log("User searched for:", target); // Debugging search input
    fetchResults(target);
}

fetchResults(target); // Initial fetch for default target (Lucknow)

function getDayName(number) {
    switch (number) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
    }
}

