function monitorEvents(element) {
var log = function(e) { 
    document.getElementById("monitor").innerHTML = e;
    console.log(e);
    };
var events = [];

for(var i in element) {
    if(i.startsWith("on")) events.push(i.substr(2));
}
events.forEach(function(eventName) {
    element.addEventListener(eventName, log);
});
}

let consoleID;
const clearConsole = () => {
    clearTimeout(consoleID);
    consoleID = setTimeout( () => {console.clear()}, 10002);
    console.log(`Console will clear in 10 seconds.`);
}
