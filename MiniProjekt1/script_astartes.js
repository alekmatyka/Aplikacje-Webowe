let buttontext=["Po herezji","Przed herezją"]
let blegion=["<h1>XVI<br>WILKI LUNY / SYNOWIE HORUSA</h1>","<h1>CZARNY LEGION</h1>"]

const loreblocks=document.getElementsByClassName("legionlore")

const loredivs=document.getElementsByClassName("loreblock")

let legionclass=[
    ["caliban","caliban"],
    ["nothere","nothere"],
    ["fulgrim","slaneesh"],
    ["perturabo","perturabo"],
    ["khan","khan"],
    ["fenris","fenris"],
    ["dorn","dorn"],
    ["nostramo","nostramo"],
    ["baal","baal"],
    ["ferrus","ferrus"],
    ["scp","scp"],
    ["angron","khorne"],
    ["ultra","ultra"],
    ["mortarion","nurgle"],
    ["magnus","arhiman"],
    ["horus","abbadon"],
    ["lorgar","lorgar"],
    ["vulcan","vulcan"],
    ["corvus","corvus"],
    ["alpha","alpha"]
]

let counter=[]
for(let i=0;i<20;i++){
    counter.push(0)
}

console.log(legionclass[2][1])

for(let i=0;i<20;i++){
    loreblocks[i].innerHTML=legionclass[i][0]
}
//--------------------------------------------------
// const buttonEC = document.getElementById("button_EC")

// buttonEC.addEventListener("click", (e)=>{

//     legioncounter[2]=(legioncounter[2]+1)%2
//     loreblocks[2].innerHTML=legioncontent[2][legioncounter[2]]
//     buttonEC.innerHTML=buttontext[legioncounter[2]]
// })

const bts = document.getElementsByClassName("button")

for(let i=0;i<20;i++){
    bts[i].addEventListener("click",(e)=>{
        counter[i] = (counter[i]+1)%2
        loreblocks[i].innerHTML=legionclass[i][counter[i]]
        loredivs[i].classList="loreblock "+legionclass[i][counter[i]]
        
        bts[i].innerHTML=buttontext[counter[i]]

        if(i==15){
            //horus
            let title = document.getElementById("blegion")
            title.innerHTML=blegion[counter[i]]
        }
    })
}