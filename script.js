const addNewItem = document.getElementById('addNewItem');
const itemInput = document.getElementById('itemInput');
const itemList = document.getElementById('itemList');
const clearList = document.getElementById('clearList');

// Task #3: Build a small project that dynamically adds and removes list items 
// based on user input.
addNewItem.addEventListener('click', function() {
    const text = itemInput.value.trim();
    if (text !== '') {
        const li = document.createElement('li');
        li.textContent = text;
        itemList.appendChild(li);
        itemInput.value = '';
        itemInput.focus();
        console.log('User entered: ' + text);
    }
});

// Simulates 'click' when user presses "Enter" when entering text to add item to list
itemInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addNewItem.click();  
    }
});

// Action assigned to the clearList button
clearList.addEventListener('click', function() { 
    itemList.innerHTML = '';
    console.log('Clear List button was clicked');
});

// Task #4: Attach click and hover event listeners to buttons and log actions 
// to the console.
function createTooltip(text) {  // Function to create a tooltip which will be displayed when hovering over the buttons
    const tooltip = document.createElement('div');
    tooltip.textContent = text;
    tooltip.style.position = 'fixed';
    tooltip.style.background = '#222';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '6px 12px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '0.65em';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = '1000';
    tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    document.body.appendChild(tooltip);
    return tooltip;
}

let tooltip = null;

function showTooltip(e, text) {
    tooltip = createTooltip(text);
    moveTooltip(e);
}

function moveTooltip(e) {
    if (tooltip) {
        tooltip.style.left = (e.clientX + 10) + 'px';
        tooltip.style.top = (e.clientY + 5) + 'px';
    }
}

function hideTooltip() {
    if (tooltip) {
        tooltip.remove();
        tooltip = null;
    }
}

// Add to list tooltip
addNewItem.addEventListener('mouseover', function(e) {
    showTooltip(e, 'Clicking this will add your text to this list');
});
addNewItem.addEventListener('mousemove', moveTooltip);
addNewItem.addEventListener('mouseout', hideTooltip);

// Clear list tooltip
clearList.addEventListener('mouseover', function(e) {
    showTooltip(e, 'This will erase your list - this cannot be reversed');
});
clearList.addEventListener('mousemove', moveTooltip);
clearList.addEventListener('mouseout', hideTooltip);


// Task #2: Write scripts to update text, add/remove attributes, and apply inline styles.
// Task #6: Create a simple application that fetches and displays data dynamically.

const getWeatherBtn = document.getElementById('getWeatherBtn');
const zipInput = document.getElementById('zipInput');

// If weatherInfo div doesn't exist in the DOM, create it
let weatherInfo = document.getElementById('weatherInfo');
if (!weatherInfo) {
    weatherInfo = document.createElement('div');
    weatherInfo.id = 'weatherInfo';
    weatherInfo.style.color = '#ff4d4d';
    weatherInfo.style.fontSize = '0.9em';
    weatherInfo.style.marginTop = '6px';
    weatherInfo.style.display = 'none';
    getWeatherBtn.parentNode.appendChild(weatherInfo);
}

// If weatherTemp div doesn't exist in the DOM, create it
let weatherTemp = document.getElementById('weatherTemp');
if (!weatherTemp) {
    weatherTemp = document.createElement('div');
    weatherTemp.id = 'weatherTemp';
    weatherTemp.style.color = '#eaeaea';
    weatherTemp.style.fontSize = '1em';
    weatherTemp.style.marginTop = '6px';
    getWeatherBtn.parentNode.appendChild(weatherTemp);
}

// Add event listener to the getWeatherBtn
getWeatherBtn.addEventListener('click', function() {
    weatherInfo.style.display = 'none';
    weatherInfo.textContent = '';
    weatherTemp.textContent = '';
    const zip = zipInput.value.trim();
    if (!/^\d{5}$/.test(zip)) {  // Regex to check if zip code is 5 digits
        alert('Please enter a valid 5-digit zip code.');
        return;
    }
    const apiKey = 'e668921f547c80f850d9274b66d1a8f3'; // OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=${apiKey}`;  // API call to get weather data
    fetch(url)
        .then(response => {
            if (response.status === 401) {  // If the API token is invalid display an error message
                weatherInfo.textContent = 'Invalid API token - contact your administrator';
                weatherInfo.style.display = 'block';
                return Promise.reject('401 Unauthorized');
            }
            return response.json();
        })
        .then(data => {  // Process the data returned from the API, create variables for the data which will get displayed
            if (data && data.main && typeof data.main.temp === 'number') {
                const tempK = data.main.temp;
                const city = data.name;
                const country = data.sys.country;
                const tempF = ((tempK - 273.15) * 9/5 + 32).toFixed(1);  // Convert Kelvin to Fahrenheit
                weatherTemp.textContent = `${city}, ${country}: ${tempF} °F`;  // Display the city and temperature data
            } else if (data && data.message) {
                weatherTemp.textContent = '';
                weatherInfo.textContent = data.message;
                weatherInfo.style.display = 'block';
            }
        })
        .catch(error => {  // Log all API call errors to console unless it's a 401 error
            if (error !== '401 Unauthorized') {
                console.error('Error fetching weather data:', error);
            }
        });
});



