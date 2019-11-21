// Import the messaging module
import * as messaging from "messaging";
import { me } from "companion"
require('env2')('.env');
// Helper
const MILLISECONDS_PER_MINUTE = 1000 * 60

// Wake the Companion after 30 minutes
me.wakeInterval = 30 * MILLISECONDS_PER_MINUTE
console.log('companion app loaded')


function getCoinMarketCap(){
  fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/').then(function(response){
    response.json().then(function(data){
      fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/').then(function(bresponse){
        bresponse.json().then(function(data2){
          data=[data,data2]
          returnCoinMarketData(data)
        })
      })
      
    })
  }).catch(e=>console.log('Error fetching coin data:'+e))
}
function returnCoinMarketData(data){
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the device
    messaging.peerSocket.send(['coin',data]);
  } else {
    console.log("Error: Connection is not open");
  }
}


// Fetch the weather from OpenWeather
function queryOpenWeather() {
  fetch(process.env.weatherAPI)
  .then(function (response) {
      response.json()
      .then(function(data) {
        // Send the weather data to the device
        returnWeatherData(data['main']);
      });
  })
  .catch(function (err) {
    console.log("Error fetching weather: " + err);
  });
}

// Send the weather data to the device
function returnWeatherData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the device
    messaging.peerSocket.send(['weather',data]);
  } else {
    console.log("Error: Connection is not open");
  }
}


function playRoku(){
  console.log('play roku funciton invocted');
  fetch('http://192.168.0.3:8060/keypress/play', {
    method: 'post',
    body: ''
  }).then(function(response) {
    console.log(response)
  }).catch(e=>console.log(e))
}

function selectRoku(){
  console.log('select roku funciton invocted');
  fetch('http://192.168.0.3:8060/keypress/select', {
    method: 'post',
    body: ''
  }).then(function(response) {
    console.log(response)
  }).catch(e=>console.log(e))
}

function downRoku(){
  console.log('down roku funciton invocted');
  fetch('http://192.168.0.3:8060/keypress/down', {
    method: 'post',
    body: ''
  }).then(function(response) {
    console.log(response)
  }).catch(e=>console.log(e))
}

function upRoku(){
  console.log('up roku funciton invocted');
  fetch('http://192.168.0.3:8060/keypress/up', {
    method: 'post',
    body: ''
  }).then(function(response) {
    console.log(response)
  }).catch(e=>console.log(e))
}

function leftRoku(){
  console.log('left roku funciton invocted');
  fetch('http://192.168.0.3:8060/keypress/left', {
    method: 'post',
    body: ''
  }).then(function(response) {
    console.log(response)
  }).catch(e=>console.log(e))
}
function rightRoku(){
  console.log('left roku funciton invocted');
  fetch('http://192.168.0.3:8060/keypress/right', {
    method: 'post',
    body: ''
  }).then(function(response) {
    console.log(response)
  }).catch(e=>console.log(e))
}
function backRoku(){
  console.log('left roku funciton invocted');
  fetch('http://192.168.0.3:8060/keypress/back', {
    method: 'post',
    body: ''
  }).then(function(response) {
    console.log(response)
  }).catch(e=>console.log(e))
}

function volUpRoku(){
  console.log('Volume Up roku funciton invocted');
  fetch('http://192.168.0.3:8060/keypress/VolumeUp', {
    method: 'post',
    body: ''
  }).then(function(response) {
    console.log(response)
  }).catch(e=>console.log(e))
}

function volDownRoku(){
  console.log('left roku funciton invocted');
  fetch('http://192.168.0.3:8060/keypress/VolumeDown', {
    method: 'post',
    body: ''
  }).then(function(response) {
    console.log(response)
  }).catch(e=>console.log(e))
}



// Listen for messages from the device
messaging.peerSocket.onmessage = function(evt) {
  console.log(evt)
  if (evt.data && evt.data.command == "weather") {
    // The device requested weather data
    queryOpenWeather();
  }
  evt.data && evt.data.command=='rokuPlay'?playRoku():''
  evt.data && evt.data.command=='coin'?getCoinMarketCap():''
  evt.data && evt.data.command=='rokuPlay'?playRoku():''
  evt.data && evt.data.command=='rokuSelect'?selectRoku():''
  evt.data && evt.data.command=='rokuUp'?upRoku():''
  evt.data && evt.data.command=='rokuDown'?downRoku():''
  evt.data && evt.data.command=='rokuLeft'?leftRoku():''
  evt.data && evt.data.command=='rokuRight'?rightRoku():''
  evt.data && evt.data.command=='rokuVolDown'?volDownRoku():''
  evt.data && evt.data.command=='rokuVolUp'?volUpRoku():''
  evt.data && evt.data.command=='rokuBack'?backRoku():''

}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}

