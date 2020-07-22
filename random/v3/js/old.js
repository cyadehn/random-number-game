// let glitchID;
// let glitchInterval = 1000;
// let glitchRepeat = 20;
// let interval;
// let repeat;
// let glitchStarted;

// const glitch = () => {
//     if (glitchStarted) {
//         interval = glitchInterval;
//         repeat = glitchRepeat;
//         glitchStarted = false;
//     }
//     if ( !app.classList.contains("glitch") && repeat ) {
//         app.classList.add("glitch");
//         console.log("Glitch added!");
//     } else {
//         app.classList.remove("glitch");
//         console.log("Glitch removed!");
//     }
//     if ( interval >= 250 ) {
//         interval -= 50;
//         console.log(interval);
//         glitchID = setTimeout(glitch, interval);
//         console.log("glitch increase");
//     } else if ( repeat ) {
//         glitchID = setTimeout(glitch, interval);
//         repeat -= 1;
//         console.log("glitch repeat");
//     }
// }

// const glitchStart = () => {
//     glitchStarted = true;
//     glitch();
// }