console.log('Привет ! шестеренка настроек немного глючит, запускается при втором клике, в плеере реализована функция включить песню кликнув на нее, туулист доделан не до конца, данные в локал сторадж не сохраняет, цитаты  беруться из апишки, ночью она иногда глючит, если цитаты не пришли проверьте позже ')
//HELPERS_______________________________________________________________________________________________________________
const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
}

const getRandomNumber = () => {
  return Math.floor(Math.random() * 20 + 1).toString();
}

const timeToShow = (number) => {
  let minutes = Math.floor(number / 60);
  let seconds = Math.floor(number % 60);
  return `${minutes < 10 ? `0${minutes}` : `${minutes}`}:${seconds < 10 ? `${`0${seconds}`}` : `${seconds}`}`
}


//HELPERS END___________________________________________________________________________________________________________
//DATE TIME ____________________________________________________________________________________________________________
const timeElement = document.querySelector('time');
const dateElement = document.querySelector('.date');

const showTime = () => {
  let date = new Date();
  let currentTime = date.toLocaleTimeString();
  timeElement.textContent = currentTime;
  showDate();
  setTimeout(showTime, 1000);
}

const showDate = () => {
  const date = new Date;
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-Gb', options);
  dateElement.textContent = currentDate;
}

showTime();
//DATE TIME END_________________________________________________________________________________________________________

//GREETING______________________________________________________________________________________________________________
const greetingElement = document.querySelector('.greeting');
const nameElement = document.querySelector('.name');

const getTimeOfTheDay = (hours) => {
  if (hours >= 6 && hours < 12) {
    return 'morning';
  } else if (hours >= 12 && hours < 18) {
    return 'afternoon';
  } else if (hours >= 18 && hours < 24) {
    return 'evening';
  } else {
    return 'night';
  }
}

const showGreeting = () => {
  let date = new Date;
  let hours = date.getHours()
  greetingElement.textContent = `Good ${getTimeOfTheDay(hours)}`
}
showGreeting();

nameElement.addEventListener('keypress', (e) => {
  let name = nameElement.value;
  let capitalizedName = capitalizeFirstLetter(name)
  if (e.key === 'Enter') {
    if (capitalizedName.trim().length > 0) {
      setLocalStorage();
      nameElement.value = capitalizedName;
      nameElement.blur();
    } else {
      nameElement.value = '';
    }
  }
})


//GREETING END__________________________________________________________________________________________________________

//BACKGROUND____________________________________________________________________________________________________________
const body = document.querySelector('body');
const slidePrevBtn = document.querySelector('.slide-prev');
const slideNextBtn = document.querySelector('.slide-next');

let randomNumber = getRandomNumber();

const setBgImage = () => {
  if (randomNumber > 20) {
    randomNumber = 1;
  }
  if (randomNumber === 0) {
    randomNumber = 20;
  }
  let date = new Date;
  let hours = date.getHours()
  let linkNumber = randomNumber.toString().padStart(2, '0');
  let bgLink = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfTheDay(hours)}/${linkNumber}.jpg`;
  const img = new Image();
  img.src = bgLink;
  img.onload = () => {
    body.style.backgroundImage = `url("${bgLink}")`;
  }
}

const changeSlide = (sign = '+') => {
  if (sign === '+') {
    randomNumber = +randomNumber + 1;
  } else {
    randomNumber = +randomNumber - 1;
  }
  setBgImage();
}

slidePrevBtn.addEventListener('click', () => changeSlide('-'));
slideNextBtn.addEventListener('click', () => changeSlide('+'));


setBgImage();
//BACKGROUND END________________________________________________________________________________________________________

//WEATHER WIDGET________________________________________________________________________________________________________

const temperatureElement = document.querySelector('.temperature');
const weatherDescriptionElement = document.querySelector('.weather-description');
const weatherIconElement = document.querySelector('.weather-icon');
const windElement = document.querySelector('.wind');
const humidityElement = document.querySelector('.humidity');
const weatherErrorElement = document.querySelector('.weather-error');
const cityElement = document.querySelector('.city');


const getWeather = async (city = 'Минск') => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (res.ok) {
    weatherIconElement.classList.add(`owf-${data.weather[0].id}`);
    temperatureElement.textContent = `${Math.round(data.main.temp)}°`;
    weatherDescriptionElement.textContent = data.weather[0].main;
    windElement.textContent = `Wind speed: ${data.wind.speed} m/s`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}`;
    cityElement.value = city;
  } else {
    weatherIconElement.classList.add('hideMe'); // use later to hide the icon
    weatherErrorElement.textContent = data.message;
    temperatureElement.textContent = '';
    weatherDescriptionElement.textContent = '';
    windElement.textContent = '';
    humidityElement.textContent = '';
  }
}

cityElement.addEventListener('keypress', (e) => {
  let city = cityElement.value;
  if (e.key === 'Enter') {
    if (city.trim().length > 0) {
      cityElement.value = capitalizeFirstLetter(city.trim());
      cityElement.blur();
      setLocalStorage();
      getWeather(city);
    } else {
      nameElement.value = 'Minsk';
    }
  }
})
const getCityFromLocalStorage = () => {
  if (localStorage.getItem('city')) {
    return localStorage.getItem('city');
  }
}
getWeather(getCityFromLocalStorage());
//WEATHER WIDGET END____________________________________________________________________________________________________

//QUOTES WIDGET_________________________________________________________________________________________________________
const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');
const changeQuoteBtn = document.querySelector('.change-quote');

const getQuote = async () => {
  const settings = {
    headers: {'X-Api-Key': 'VpNEFtPZNUdmS302Mfttkg==WbVNG0Mk9WeQOrWa'}
  }
  const url = 'https://api.api-ninjas.com/v1/quotes?category=learning';

  const response = await fetch(url, settings);
  const data = await response.json();

  quoteElement.textContent = data[0].quote;
  authorElement.textContent = data[0].author;
}
getQuote();

changeQuoteBtn.addEventListener('click', getQuote)
//QUOTES WIDGET END_____________________________________________________________________________________________________

//PLAYER________________________________________________________________________________________________________________
const playlist = [
  {
    id: 0,
    title: 'Aqua Caelestis',
    src: '../assets/sounds/Aqua Caelestis.mp3',
    duration: 39,
  },
  {
    id: 1,
    title: 'Ennio Morricone',
    src: '../assets/sounds/Ennio Morricone.mp3',
    duration: 97,
  },
  {
    id: 2,
    title: 'River Flows In You',
    src: '../assets/sounds/River Flows In You.mp3',
    duration: 97,
  },
  {
    id: 3,
    title: 'Summer Wind',
    src: '../assets/sounds/Summer Wind.mp3',
    duration: 110,
  },
];

const playlistElement = document.querySelector('.play-list');
const playPreviousBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playElement = document.querySelector('#play-element');
const progressElement = document.querySelector('#progress');
const timeUpdateElement = document.querySelector('.time-update');

let currentSong = 0;
let isPlaying = false;

const setPlayElement = () => {
  if (isPlaying) {
    playElement.classList.remove('play');
    playElement.classList.add('pause');
  } else {
    playElement.classList.remove('pause');
    playElement.classList.add('play');
  }
}
setPlayElement();

const audio = new Audio();
let stopTime = 0;

const playAudio = () => {
  isPlaying = true;
  setPlayElement();
  audio.currentTime = stopTime;
  audio.src = playlist[currentSong].src;
  audio.play();
}

const pauseAudio = () => {
  isPlaying = false;
  setPlayElement();
  audio.pause();
  stopTime = audio.currentTime;
}

const renderPlayList = () => {
  while (playlistElement.firstChild) {
    playlistElement.removeChild(playlistElement.firstChild);
  }
  playlist.forEach((el) => {
    const li = document.createElement('li');
    li.textContent = el.title;
    li.classList.add('playItem');
    li.classList.add(`${el.id}`);
    li.style.cursor = 'pointer';
    if (el.id === currentSong) {
      li.classList.add('is-playing');
    }
    li.addEventListener('click', () => {
      pauseAudio();
      currentSong = +li.classList[1];
      renderPlayList();
      playAudio();
    })

    playlistElement.appendChild(li)
  })
}

renderPlayList();


playPreviousBtn.addEventListener('click', () => {
  currentSong = currentSong - 1;
  if (currentSong < 0) {
    currentSong = Object.keys(playlist).length - 1;
  }
  renderPlayList();
  playAudio();
});

const playNext = () => {
  currentSong++;
  if (currentSong > Object.keys(playlist).length - 1) {
    currentSong = 0;
  }
  renderPlayList();
  playAudio();
}
playNextBtn.addEventListener('click', playNext);

playElement.addEventListener('click', () => {
  if (!isPlaying) {
    playAudio();
  } else {
    pauseAudio();
  }
})

audio.addEventListener('ended', playNext);
audio.addEventListener('timeupdate', () => {
  let duration = audio.duration;
  let currentTime = audio.currentTime;
  let percent = 0;
  if (isFinite(duration)) {
    percent = Math.floor((currentTime / duration) * 100);
  }
  progressElement.value = percent;

  let minutes = Math.floor(duration / 60);
  let seconds = Math.floor(duration % 60);

  timeUpdateElement.textContent = `${timeToShow(currentTime)} / ${`${minutes < 10 ? `0${minutes}` : `${minutes}`}:${seconds < 10 ? `${`0${seconds}`}` : `${seconds}`}`}`;

})


//PLAYER_END____________________________________________________________________________________________________________
//SETTINGS______________________________________________________________________________________________________________
const state = [
  {
    title: 'Player',
    isVisible: true,
    key: 'player'
  },
  {
    title: 'Weather',
    isVisible: true,
    key: 'weather'
  },
  {
    title: 'Time',
    isVisible: true,
    key: 'time'
  },
  {
    title: 'Greeting',
    isVisible: true,
    key: 'greeting-container'
  },
  {
    title: 'Quotes',
    isVisible: true,
    key: 'quotes-widget'
  },
  {
    title: 'Todolist',
    isVisible: true,
    key: 'todolist'
  },
];
const settingsList = document.querySelector('.settings-list')
const renderSettings = () => {
  state.forEach((el) => {
    let li = document.createElement('li');
    li.innerText = el.title;
    if (!el.isVisible) {
      li.classList.add('crossed');
    }
    li.addEventListener('click', (e) => {
      let clickedItem = e.currentTarget.textContent;
      state.forEach((el) => {
        if (el.title === clickedItem) {
          el.isVisible = !el.isVisible
          renderApp();
        }

      })
      while (settingsList.firstChild) {
        settingsList.removeChild(settingsList.firstChild);
      }
      renderSettings();
      renderApp();
    })
    settingsList.appendChild(li);

  });
}

const settingsBtn = document.querySelector('.gear');
settingsBtn.addEventListener('click', () => {
  settingsBtn.classList.toggle('rotate');
  if (settingsList.hasChildNodes()) {
    while (settingsList.firstChild) {
      settingsList.removeChild(settingsList.firstChild);
    }
  } else {
    renderSettings();
  }
});

const renderApp = () => {
  state.forEach((el) => {
    const element = document.querySelector(`.${el.key}`);
    if (el.isVisible) {
      element.classList.remove('hideMe');
    } else {
      element.classList.add('hideMe');
    }
  })
}


//SETTINGS_END__________________________________________________________________________________________________________

//TODOLIST______________________________________________________________________________________________________________
const myTasks = document.querySelector('.my-tasks');
const taskInputElement = document.querySelector('.task-input');
let tasks = [
  {
    taskTitle: 'Чтобы удалить меня просто кликни по мне',
  },
];


const saveTask = () => {
  let taskAsString = JSON.stringify(tasks);
  localStorage.setItem('todolist', taskAsString);
}

const showTasks = () => {
  let element = document.querySelector(".my-tasks");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  tasks.forEach((el) => {
    const li = document.createElement('li');
    li.textContent = el.taskTitle;
    myTasks.appendChild(li);
    li.addEventListener('click', () => removeTask(li.innerHTML));
  })
}

const removeTask = (title) => {
  tasks = tasks.filter((el) => {
    return el.taskTitle !== title;
  })
  taskInputElement.placeholder = 'add task';
  showTasks()
}


const createTask = (text) => {
  let taskObj = {
    taskTitle: text,
  }
  tasks.push(taskObj);
}

const addTask = () => {
  let text = taskInputElement.value;
  let element = document.querySelector(".my-tasks");
  if (tasks.length > 4) {
    taskInputElement.placeholder = 'Only five tasks ';
    taskInputElement.value = '';
    return;
  }
  if (!text.trim()) {
    taskInputElement.placeholder = 'неа ;) пусто'
  }
  if (text.trim()) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    taskInputElement.placeholder = 'add task';
    createTask(text);
    showTasks();
  }
  taskInputElement.value = '';
}
showTasks();
taskInputElement.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
//TODOLIST_END__________________________________________________________________________________________________________

//LOCAL STORAGE_________________________________________________________________________________________________________
const setLocalStorage = () => {
  localStorage.setItem('name', nameElement.value);
  localStorage.setItem('city', cityElement.value);
  saveTask();
}

const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    nameElement.value = localStorage.getItem('name');
  }
}


window.addEventListener('beforeunload', setLocalStorage); //saving to local storage
window.addEventListener('load', getLocalStorage); // extracting data from local storage
//LOCAL STORAGE END_____________________________________________________________________________________________________


