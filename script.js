let time = 0;
const boardLen = 15, HUNDRED = 100;
let linePlane = boardLen - 1, colPlane = linePlane / 2;
const randomNoOfObjects = Math.floor(Math.random() * boardLen + 1);
let colObject = [], lineObj = 0;
for (let i = 1; i <= randomNoOfObjects; ++i) {
    colObject[i] = Math.floor(Math.random() * boardLen);
    console.log("obiectele random sunt: " + colObject[i]);
}

generateButtons();

function generateButtons() {
    for (let i = 0; i < boardLen; ++i) {
        for (let j = 0; j < boardLen; ++j) {
            const button = document.createElement("button");
            button.type = "button";
            button.id = i * HUNDRED + j;
            button.innerText = button.id;
            document.body.appendChild(button);    
            if (i == boardLen - 1 && j == 7) {
                button.style.backgroundColor = "green";
            }
            for (let k = 1; k <= randomNoOfObjects; ++k) {
                if (i == 0 && j == colObject[k]) {
                    button.style.backgroundColor = "red";
                }
            }
            if (j == boardLen - 1 ) {
                document.body.appendChild(document.createElement("br"));
            }
        }  
    } 
}

function increaseTime() {
    for (let i = 1; i <= randomNoOfObjects; ++i) {
        if (linePlane < 0 || linePlane > 14 || colPlane < 0 || colPlane > 14 || (linePlane == lineObj && colPlane == colObject[i])) {
            return time;
        }
    }
    ++time;
    document.getElementById('Score-text').innerHTML = time;
}

function startStopWatch() {
    document.getElementById('Score-text').innerHTML = '0';
    setInterval(increaseTime, 1000);
    setInterval(moveAirplaneUp, 1000);
    setInterval(moveObjectDown, 1000);
}

function moveAirplaneUp() {
    for (let i = 1; i <= randomNoOfObjects; ++i) {
        if (linePlane == lineObj && colPlane == colObject[i]) {
            return;
        }
    }
    if (linePlane >= 0) {
        --linePlane;
        const airplane = document.getElementById(linePlane * HUNDRED + colPlane);
        airplane.style.backgroundColor = "green";
        const prevAirplane = document.getElementById((linePlane + 1) * HUNDRED + colPlane);
        prevAirplane.style.backgroundColor = "gray";
    }
}

function moveObjectDown() {
    for (let i = 1; i <= randomNoOfObjects; ++i) {
        if (linePlane == lineObj && colPlane == colObject[i]) {
            return;
        }
        const strangeObject = document.getElementById(lineObj * HUNDRED + colObject[i]);
        strangeObject.style.backgroundColor = "red";
        if (lineObj > 0) {
            const prevObject = document.getElementById((lineObj - 1) * HUNDRED + colObject[i]);
            prevObject.style.backgroundColor = "gray";
        }
    }
    ++lineObj;
}

airplaneMovesLeftRight();

function airplaneMovesLeftRight() {
    const input = document.querySelector("input");
    const log = document.getElementById("log");
    input.addEventListener("keydown", checkKey);

function checkKey(e) {
  textContent = e.code;
  let arrowIndicator;
  if (textContent == "ArrowRight") {
    arrowIndicator = -1;
    ++colPlane;
  } else if (textContent == "ArrowLeft") {
    arrowIndicator = 1;
    --colPlane;
  }
    const airplane = document.getElementById((linePlane) * HUNDRED + colPlane);
    airplane.style.backgroundColor = "green";
    const prevAirplane = document.getElementById((linePlane) * HUNDRED + colPlane + arrowIndicator);
    prevAirplane.style.backgroundColor = "gray";
}
}
