// We are only making the 'client' part of this game. the 'server' part is already running, as Snek.js.

// ADD BUILT IN NODE PACKAGES //
const net = require('net');
const readline = require('readline').emitKeypressEvents(process.stdin);
// readline is an event listener for the terminal. we need it to read the 'keypress' node function in process.stdin.on('keypress').

// SET UP CONNECTION //
let host = 'localhost';
let port = '50541';// Declare the host and port as variables so we can use them in strings if we want later.

const config = {
  host: `${host}`, // host is always a string ''
  port: `${port}` // listed on the running client
}; // Declare a config for the net.createConnection here instead of putting it in the start function.

// CALL net.createConnection AS AN OBJECT WE CAN USE
const start = function() {
  const gameConnection = net.createConnection(config);
  gameConnection.setEncoding('utf8'); // Translate data to english
  console.log(`Joining server`);

  // ON CONNECT, SEND NAME TO SERVER //
  gameConnection.on('connect', () => {
    gameConnection.write('Name: BOB'); // the Snek server is coded to listen for a name in this format.

    // CONSOLE.LOG CONNECTION AND CONTROLS //
    console.log(`Joined ${host}: ${port}`);
    console.log('Move: WASD - Send message: t or g'); // let you know the game has started
  });
  // ON RECIEVING DATA, DISPLAY THE DATA //
  gameConnection.on('data', (data) => {
    console.log('Message from server:', data);
  });
  
  /* The SERVER responds to these messages (.write) - "Move: up", "Move: down", etc. bind WASD keys to automatically send these messages when pressed.
wrap it in a function called setupInput */

  // SET UP STDIN //
  const setupInput = function() {
    process.stdin.setEncoding('utf8');
    process.stdin.setRawMode(true); // instead of waiting for enter to be pressed, process.stdin listens to each letter individually
    process.stdin.resume();
    return process.stdin;
  };

  /* server also resposnds to (.write) 'Say: Some Message' , so we will bind that to a few keys and add it to the initial instructions. */

  // ON KEYPRESS (readline), SEND THE COMMANDS //
  
  process.stdin.on('keypress', (key) => {
    if (key === 'w') {
      gameConnection.write('Move: up');
    } else if (key === 'a') {
      gameConnection.write('Move: left');
    } else if (key === 's') {
      gameConnection.write('Move: down');
    } else if (key === 'd') {
      gameConnection.write('Move: right');
    
      // Add a 'Say: ___ ' key binding or 2 //
    } else if (key === 't') {
      gameConnection.write('Say: Woohoo');
    } else if (key === 'g') {
      gameConnection.write('Say: Hi');

      // Need to include an exit key press //

    } else if (key === '\u0003') { // ctrl+c in unicode
      process.exit();
    }
  });
  
  // CALL setupInput //
  setupInput();

};

start();


// PROCESS.STDIN.ON('KEYPRESS') USE! //

/* It requires this module from readline in order to work:

const readline = require('readline').emitKeypressEvents(process.stdin);

// Then

process.stdin.on('keypress', (key) => {
  // Handle keypress events here
});

*/



