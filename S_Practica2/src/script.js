import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from './../images/icon-location.svg';

const searchInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');
const ip = document.querySelector('#ip');
const location = document.querySelector('#location');
const timezone = document.querySelector('#timezone');
const isp = document.querySelector('#isp');


btn.addEventListener('click', getData);
searchInput.addEventListener('keydown', handlerKey);
addEventListener('DOMContentLoaded', setData());


function setData() {
	fetch('https://api.ipify.org/')
		.then(res => res.text())
		.then(ipAddress => setDataInput(ipAddress));
}

function setDataInput(ipAddress) {
	searchInput.value = ipAddress;
	getData();
}

function getData() {
	const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_gGbfjnTBmYbGJqN&ipAddress=${searchInput.value}`;
	if (/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(searchInput.value)) {
		fetch(url)
			.then((responce) => responce.json())
			.then((data) => ipOnMap(data));
	} else {
		return alert('Wrong address entered. Please try again');
	}
}

function handlerKey(event) {
	if (event.key === 'Enter') getData();
}

function ipOnMap(data) {
	const { city, country, lat, lng, postalCode } = data.location;
	ip.innerText = data.ip;
	location.innerText = `${city}, ${country} ${postalCode}`;
	timezone.innerText = data.location.timezone;
	isp.innerText = data.isp;
	map.setView([lat, lng]);
	L.marker([lat, lng], { icon: L.icon({ iconUrl }) }).addTo(map);
}

const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution:
		'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="https://syhanoff.ru">Syhanoff</a>.',
}).addTo(map);
