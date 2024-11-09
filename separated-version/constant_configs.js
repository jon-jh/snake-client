// Connect
let host = 'localhost';
let port = '50541';// Declare the host and port as variables so we can use them in strings if we want later.

const config = {
  host: `${host}`, // host is always a string ''
  port: `${port}` // listed on the running client
}; // Declare a config for the net.createConnection here instead of putting it in the start function.


// SET UP STDIN //
const setupInput = function() {
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true); // instead of waiting for enter to be pressed, process.stdin listens to each letter individually
  process.stdin.resume();
  return process.stdin;
};

module.exports = { config, host, port, setupInput };

