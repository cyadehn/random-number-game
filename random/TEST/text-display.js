const speechBox = document.getElementById("speechBox");
let glitchTypewriterID;
let printLineID;
let glitchSpeed = 4;

let index = 0;
let lineIndex = 0;
const glitchTypewriter = (array, domVar) => {
    const printLine = () => {
        if ( lineIndex < array[index].length ) {
            if ( array[index]) {
                domVar.innerHTML += array[index].charAt(lineIndex);
                lineIndex += 1;
                console.log("line index increased to " + lineIndex);
                printLineID = setTimeout(printLine, glitchSpeed);
            }
        } else if ( index < array.length ) {
            domVar.innerHTML = "";
            index += 1;
            lineIndex = 0;
            glitchTypewriter(text, speechBox);
            console.log("restart");
        }
    }
    printLine();
}

// let index = 0;
// let restart = false;

// const glitchTypewriter = (array, domVar) => {
//     console.log("restart is " + restart);
//     const printLine = () => {
//         if ( restart = false ) {
//             domVar.innerHTML += array[index] + "<br>";
//             index += 1;
//             restart = true;
//             setTimeout(printLine(), glitchSpeed);
//         } else if ( index < array.length ) {
//             console.log("restarting");
//             setTimeout(glitchTypewriter(text, speechBox), glitchSpeed);
//             restart = false;
//         }
//     }
//     printLine();
// }

glitchTypewriter(text, speechBox);