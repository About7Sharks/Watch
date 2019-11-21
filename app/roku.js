import document from "document";
import * as messaging from "messaging";
let playButton = document.getElementById("playButton");
let selectButton = document.getElementById("selectButton");
let upButton = document.getElementById("upButton");
let downButton = document.getElementById("downButton");
let leftButton = document.getElementById("leftButton");
let rightButton = document.getElementById("rightButton");
let backButton = document.getElementById("backButton");
let volUpButton = document.getElementById("volUpButton");
let volDownButton = document.getElementById("volDownButton");

playButton.onactivate = function(evt) {
  playRokuRemote()
}
selectButton.onactivate = function(evt) {
    selectRokuRemote()
}
upButton.onactivate = function(evt) {
  upRokuRemote()
}
downButton.onactivate = function(evt) {
  downRokuRemote()
}
leftButton.onactivate = function(evt) {
    leftRokuRemote()
  }
rightButton.onactivate = function(evt) {
    rightRokuRemote()
  }
  backButton.onactivate = function(evt) {
    backRokuRemote()
  }
  volUpButton.onactivate = function(evt) {
    volUpRokuRemote()
  }
  volDownButton.onactivate = function(evt) {
    volDownRokuRemote()
  }


function playRokuRemote(){
  console.log('sending play roku command to companion')
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the companion
    messaging.peerSocket.send({
      command: 'rokuPlay'
    });
  }
}
function selectRokuRemote(){
    console.log('sending select roku command to companion')
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Send a command to the companion
      messaging.peerSocket.send({
        command: 'rokuSelect'
      });
    }
  }
  function downRokuRemote(){
    console.log('sending down roku command to companion')
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Send a command to the companion
      messaging.peerSocket.send({
        command: 'rokuDown'
      });
    }
  }
  function upRokuRemote(){
    console.log('sending up roku command to companion')
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Send a command to the companion
      messaging.peerSocket.send({
        command: 'rokuUp'
      });
    }
  }
  function leftRokuRemote(){
    console.log('sending left roku command to companion')
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Send a command to the companion
      messaging.peerSocket.send({
        command: 'rokuLeft'
      });
    }
  }
  function rightRokuRemote(){
    console.log('sending right roku command to companion')
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Send a command to the companion
      messaging.peerSocket.send({
        command: 'rokuRight'
      });
    }
  }
  function backRokuRemote(){
    console.log('sending back roku command to companion')
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Send a command to the companion
      messaging.peerSocket.send({
        command: 'rokuBack'
      });
    }
  }
  function volUpRokuRemote(){
    console.log('sending back roku command to companion')
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Send a command to the companion
      messaging.peerSocket.send({
        command: 'rokuVolUp'
      });
    }
  }function volDownRokuRemote(){
    console.log('sending back roku command to companion')
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Send a command to the companion
      messaging.peerSocket.send({
        command: 'rokuVolDown'
      });
    }
  }
  


  export  {
    volUpRokuRemote,volDownRokuRemote,backRokuRemote,
    rightRokuRemote,leftRokuRemote,upRokuRemote,downRokuRemote,
    selectRokuRemote,playRokuRemote
};