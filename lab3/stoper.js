
const stCon = document.getElementById("stopercontainer")
const stoper = document.getElementById("stoper")

let time = 0
let interval


function parseTime(t){
    if(t>=60){
        return (Math.floor(t/60))+"min "+(t%60)+"s"
    }
    else{
        return (t%60)+"s"
    }
}

function updateStoper(){
    time++
    stoper.innerHTML = parseTime(time) 
}

stoper.innerHTML = parseTime(time) 

const startButton = document.createElement("button")
const stopButton = document.createElement("button")
const contButton = document.createElement("button")
const resetButton = document.createElement("button")

startButton.innerHTML = "Start"
stopButton.innerHTML = "Stop"
resetButton.innerHTML = "Reset"
contButton.innerHTML = "Continue"

stCon.appendChild(startButton)

startButton.addEventListener("click", (e)=>{
    interval=setInterval(updateStoper,1000)
    stCon.removeChild(startButton)
    stCon.appendChild(resetButton)
    stCon.appendChild(stopButton)
})

resetButton.addEventListener("click",(e)=>{
    clearInterval(interval)
    time=0
    stoper.innerHTML = parseTime(time) 
    stCon.replaceChildren(stoper)
    stCon.appendChild(startButton)
})

stopButton.addEventListener("click",(e)=>{
    clearInterval(interval)
    stCon.removeChild(stopButton)
    stCon.appendChild(contButton)
})

contButton.addEventListener("click",(e)=>{
    interval=setInterval(updateStoper,1000)
    stCon.removeChild(contButton)
    stCon.appendChild(stopButton)
})
