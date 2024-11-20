const gameScreen = document.getElementById("gamescreen")
const game = document.getElementById("game")
const hearts=document.getElementsByClassName("heart")
const score = document.getElementById("points")
const resetButton = document.createElement("div")
const crosshair = document.createElement("div")
crosshair.classList="crosshair"

let gameWidth=1680
let gameOver=false
let lives=3

let mobSpawner

let points = 0

const fullHeart = 'images/full_heart.png'
const emptyHeart = 'images/empty_heart.png'

function updatePoints(){
    score.innerHTML=points
}

class zombie {
    animationID
    constructor() {
        this.zombieDiv = document.createElement("div")
        this.zombieDiv.classList="zombie"
        this.x = 1480
        this.spriteX=0
        const scalefactor=Math.random();
        this.frameDelay = scalefactor*50+20;
        this.accumulatedTime = 0;
        this.zombieDiv.style.top=`${Math.random()*800}px`
        this.zombieDiv.style.scale=`${scalefactor*1.25+0.25}`

        gameScreen.appendChild(this.zombieDiv) 
        this.step=this.step.bind(this)
        this.kill=this.kill.bind(this) 
        this.eliminate=this.eliminate.bind(this) 
        this.zombieDiv.addEventListener('click',this.eliminate)  
    }


    eliminate(event){
        event.stopPropagation()
        points+=10
        updatePoints()
        this.kill()
    }

    kill(event){
        
        this.zombieDiv.removeEventListener("click",this.kill)
        cancelAnimationFrame(this.animationID)
        gameScreen.removeChild(this.zombieDiv)
    }

    //animacja
    run(){
        this.lastTime=performance.now()
        this.animationID=requestAnimationFrame(this.step)
    }

    step(timestamp) {

        const deltaTime = timestamp-this.lastTime
        this.lastTime = timestamp

        this.accumulatedTime += deltaTime
        if (this.accumulatedTime >= this.frameDelay){

            this.accumulatedTime -= this.frameDelay

            this.x=this.x-10
            if(this.x<=0 || gameOver){
                this.kill()
                hit()
                return
            }
            this.spriteX=(this.spriteX+200)%2000
            this.zombieDiv.style.left = `${this.x}px`
            this.zombieDiv.style.backgroundPositionX = `-${this.spriteX}px`
        }

        this.animationID=requestAnimationFrame(this.step)
    }

}

function miss(){
    points-=15
    updatePoints()
}

game.addEventListener("click",miss)

function moveAim(event){
    const mouseX = event.clientX;
    const mouseY = event.clientY;
  
    crosshair.style.transform = `translate(${mouseX-100}px, ${mouseY-100}px)`;
}



function reset(event){
    event.stopPropagation()
    gameScreen.removeChild(resetButton)
    startGame()
}


function endGame(){
    gameScreen.removeChild(crosshair)
    document.removeEventListener('mousemove',moveAim)
    gameOver=true
    clearInterval(mobSpawner)

    
    resetButton.classList="reset"
    resetButton.innerHTML = "zagraj ponownie"
    resetButton.addEventListener("click",reset)
    gameScreen.appendChild(resetButton)
}

function hit(){
    lives--
    if(lives>=0){
        hearts[lives].src=emptyHeart
    }
    if(lives<=0){
        endGame()
    }
}



function spawn(){
    // zom = new zombie()
    // zom.run()  
    new zombie().run()
}

function startGame(){
    gameScreen.appendChild(crosshair)
    gameOver=false
    points=0
    lives=3
    updatePoints()
    for(let i =0 ;i< 3;i++){
        hearts[i].src=fullHeart
    }
    mobSpawner = setInterval(spawn,2000)
    document.addEventListener('mousemove',moveAim)
}

startGame()


