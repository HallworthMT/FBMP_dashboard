export var apiUrl;
let hostname = window.location.hostname
switch (hostname) {
    case 'localhost':
        apiUrl = 'http://localhost:4005';
        break;
    case 'vtecostudies.org':
      apiUrl = `https://api.fbmp.vtatlasoflife.org`;
      break;
    default:
        apiUrl = `https://api.${hostname}`;
        break;
}
console.log('config.js | hostname:', hostname, 'apiUrl:', apiUrl);
let home_route = document.getElementById('home_route');
if (home_route) {
    home_route.href = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    console.log('config.js | set home_route.href to', home_route.href);
}