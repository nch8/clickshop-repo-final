// FetchData.js
const URI = 'https://jsonplaceholder.typicode.com';
export default {
async fetchUsers() {
try {
//let response = await fetch(URI + '/users');
let response = await fetch(URI+ '/users');
let responseJsonData = await response.json();
return responseJsonData;
}
catch(e) {
console.log(e)
}
}
}