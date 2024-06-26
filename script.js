document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if(!cityName){
        document.querySelector('#weather').classList.remove('show');
        showAlert('Digite uma cidade...');
        let app = document.querySelector('.app');
        app.style.backgroundImage = '';
        return;
        
    }

    const apiKey = '42a9499c1e896fff5a2e282c5447a296'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl);
    const json = await results.json();

    if(json.cod === 200){
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        })
    }else{
        document.querySelector('#weather').classList.remove('show');
        showAlert(`
        Não foi possível localizar...

        <img src="img/search-animate.svg">
        `)

        let app = document.querySelector('.app');
        app.style.backgroundImage = '';
    }
});

function showInfo(json){
    showAlert('');

    document.querySelector('#weather').classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;
    
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.' , ',')} <sup>C°</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src' , `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.' , ',')} <sup>C°</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.' , ',')} <sup>C°</sup>`;

    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;

    let app = document.querySelector('.app');

    switch(json.tempIcon){
        case '01d':
            app.style.backgroundImage = `url(img/dia-céu-limpo.jpg)`;
            break;
        case '01n':
            app.style.backgroundImage = `url(img/noite-céu-limpo.jpg)`;
            break;
        case '02d':
        case '03d':
        case '04d':
            app.style.backgroundImage = `url(img/dia-nuvens.jpg)`;
            break;
        case '02n':
        case '03n':
        case '04n':
            app.style.backgroundImage = `url(img/noite-nuvens.jpg)`;
            break;
        case '09d':
        case '10d':
            app.style.backgroundImage = `url(img/dia-chuva.jpg)`;
            break;
        case '09n':
        case '10n':
            app.style.backgroundImage = `url(img/noite-chuva.jpg)`;
            break;
        case '11n':
            app.style.backgroundImage = `url(img/tempestade.jpg)`;
            break;
        case '13n':
            app.style.backgroundImage = `url(img/neve.jpg)`;
            break;
        case '50n':
            app.style.backgroundImage = `url(img/névoa.jpg)`;
            break;
    }

}

function showAlert(msg){
    document.querySelector('#alert').innerHTML = msg;
}