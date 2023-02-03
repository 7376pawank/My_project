const WeatherApi={
	api_key: "287e284309931ea986910326c896b5a7",
	baseurl: "https://api.openweathermap.org/data/2.5/weather?"
}



//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//Event listener function on keypress
const SearchInputCity = document.getElementById('input-city');

SearchInputCity.addEventListener('keypress', (event) => {
	if(event.keyCode==13){
		console.log(SearchInputCity.value);
		getWeatherReport(SearchInputCity.value);
		document.querySelector('.weather-body').style.display = "block";
	}
});

//Get weather report
function getWeatherReport(city){
	fetch(`${WeatherApi.baseurl}q=${city}&appid=${WeatherApi.api_key}&units=metric`)
	.then(weather => {
		return weather.json();
	}).then(ShowWeatherReport);

}

//Show weather report

function ShowWeatherReport(weather){
	console.log(weather);

	let city = document.getElementById('city');
	city.innerText = `${weather.name}, ${weather.sys.country}`

	let temp = document.getElementById('temp');
	temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`

	let min_max = document.getElementById('min-max'); 
	min_max.innerHTML= `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`

	let weathertype = document.getElementById('status');
	weathertype.innerText = `${weather.weather[0].main}`

	let humidity = document.getElementById('humidity');
	humidity.innerText = `Humidity : ${weather.main.humidity}% `

	let date = document.getElementById('date');
	let todaydate = new Date();
	date.innerText = dateManage(todaydate);

	if(weathertype.textContent == 'Clear'){
		document.body.style.backgroundImage = "url('Images/clear.jpg')"
	}
	else if(weathertype.textContent == 'Haze'){
		document.body.style.backgroundImage = "url('Images/haze.jpg')"
	}
	else if(weathertype.textContent == 'Clouds'){
		document.body.style.backgroundImage = "url('Images/cloudy.jpg')"
	}
	else if(weathertype.textContent == 'Rain'){
		document.body.style.backgroundImage = "url('Images/rainy.jpg')"
	}
	else if(weathertype.textContent == 'Snow'){
		document.body.style.backgroundImage = "url('Images/snow.jpg')"
	}
	else if(weathertype.textContent == 'Thunderstorm'){
		document.body.style.backgroundImage = "url('Images/clear.jpg')"
	}
	else if(weathertype.textContent == 'Mist'){
		document.body.style.backgroundImage = "url('Images/mist.jpg')"
	}
}

function dateManage(datearg){
	let days =['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday']

	let months =['January','February','March','April','May','June','July','August','September','October','November','December']

	let year = datearg.getFullYear();
	let month = months[datearg.getMonth()];
	let date = datearg.getDate();
	let day = days[datearg.getDay()];

	return `${date} ${month} (${day}), ${year} `
}