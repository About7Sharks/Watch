import { display } from "display";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import clock from "clock";
import { battery } from "power";
import { me as appbit } from "appbit";
import { today } from "user-activity";
import  { playRokuRemote } from './roku.js';
import * as messaging from "messaging";
let health=document.getElementById('health')
let hideHealth=document.getElementById('hideHealth')
let time=document.getElementById('clock')
let vitalsData=document.getElementById('vitalsData')
let distance=document.getElementById('distance')
let fullDate=document.getElementById('fullDate')
let weather=document.getElementById('weather')
let coinETH=document.getElementById('coinETH')
let coinBTC=document.getElementById('coinBTC')
let playButton = document.getElementById("playButton");
let mybutton2 = document.getElementById("mybutton2");
let watchFace= document.getElementsByClassName('watchFace')
let rokuRemoteEl=document.getElementsByClassName('rokuRemote')
let watchButton = document.getElementById("watchButton");
let calories = document.getElementById("calories");

playButton.onactivate = function(evt) {
  playRokuRemote()
}
mybutton2.onactivate = function(evt) {
  showRokuRemote()
}
health.onactivate = function(evt) {
  watchFace.forEach(el=>{
    el.style.display='none'
  });
  hideHealth.style.display='inline'
}
hideHealth.onactivate=function(evt){
  hideRokuRemote()
  hideHealth.style.display='none'
}

watchButton.onactivate=function(evt){
  hideRokuRemote()
}
function showRokuRemote(){
  console.log('showing remote control')
  watchFace.forEach(el=>{
    el.style.display='none'
  })  
  rokuRemoteEl.forEach(el=>{
    el.style.display = "inline";
  })
}
function hideRokuRemote(){
  console.log('showing watch')
  watchFace.forEach(el=>{
    el.style.display='inline'
  })  
  rokuRemoteEl.forEach(el=>{
    el.style.display = "none";
  })
}


// Request weather data from the companion
function fetchWeather() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the companion
    messaging.peerSocket.send({
      command: 'weather'
    });
  }
}

// Display the weather data received from the companion
function processWeatherData(data) {
    weather.text=`${data.temp.toFixed(0)}&deg;F`
}
function processCoinData(data) {
  console.log(JSON.stringify(data[0][0]))
  console.log(JSON.stringify(data[1][0]))

  coinETH.text=`ETH: ${(data[0][0].price_usd*1).toFixed(0)}`
  coinBTC.text=`BTC: ${(data[1][0].price_usd*1).toFixed(0)}`

}
function fetchCoin(){
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the companion
    messaging.peerSocket.send({
      command: 'coin'
    });
  }
}

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
    console.log('open')
  // Fetch weather when the connection opens
  fetchWeather();
  fetchCoin()
}

// Listen for messages from the companion
messaging.peerSocket.onmessage = function(evt) {
  console.log(JSON.stringify(evt))
  evt.data[0]=='coin'?processCoinData(evt.data[1]):''
  evt.data[0]=='weather'?processWeatherData(evt.data[1]):''
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}
// set initial values 
fetchWeather()
getCalYDist()
// update every 10 minutes
setInterval(function(){
  console.log('updating values')
  fetchWeather()
  getCalYDist()
  fetchCoin()
}, 10 * 1000 * 60);
const sensors = [];

//set distance traveled in and convert to meters=>miles
//get calories
function getCalYDist(){
  if (appbit.permissions.granted("access_activity")) {
    distance.text=(`${(today.adjusted.distance*0.000621371192).toFixed(2)} Miles`)
    console.log(today.adjusted.calories)
    calories.text=(`${today.adjusted.calories} Cal`)
 }
}


//set date
let date=new Date()
var months = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
let dayOfWeek=['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
fullDate.text=`Today is ${dayOfWeek[date.getDay()]}, ${months[date.getMonth()]} ${[date.getDate()]}`

//get battery element and set text to current status
let batteryData=document.getElementById('batteryValue')
batteryData.text=(Math.floor(battery.chargeLevel) + "%")



if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    vitalsData.text=`${hrm.heartRate ? hrm.heartRate : 0}`;
  });
  sensors.push(hrm);
  hrm.start();
}


display.addEventListener("change", () => {
  // Automatically stop all sensors when the screen is off to conserve battery
  display.on ? sensors.map(sensor => sensor.start()) : sensors.map(sensor => sensor.stop());
});





clock.granularity = 'seconds'; // seconds, minutes, hours
let lastTime='00:00'
clock.ontick = function(evt) {
  let hours=evt.date.getHours()
  console.log(hours)
  if(hours>12){
    hours=hours-12
  }
  time.text=("0" + hours).slice(-2) + ":" +("0" + evt.date.getMinutes()).slice(-2);
  console.log(time.text)
};
