const letters= "qwertyuiopasdfghjklzxcvbnm"
const capitals="QWERTYUIOPASDFGHJKLZXCVBNM"
const specials="1234567890-=!@#$%^&*()_+?|"


const form = document.querySelector("form")
const minLen=form.querySelector("input[name=minLen]")
const maxLen=form.querySelector("input[name=maxLen]")
const hasCap=form.querySelector("input[name=hasCapital]")
const hasSpe=form.querySelector("input[name=hasSpecial]")
const formMessage = form.querySelector(".form-message")

function getRandomIntFrom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function scrambleString(str) {
    const arr = str.split("");
    let scrambled = str;

    while (scrambled === str) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      scrambled = arr.join("");
    }

    return scrambled;
  }

  

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const minLength = parseInt(minLen.value)
    const maxLength = parseInt(maxLen.value)

    let formErrors = [];

    if(!minLength || minLength<1){
      formErrors.push("Podaj wartość minLen")
    }
    if(!maxLength || maxLength<1){
      formErrors.push("Podaj wartość maxLen")
    }
    if(minLength>maxLength){
      formErrors.push("minLen nie może być większe od maxLen")
    }
    if(hasCap.checked && hasSpe.checked && minLength<2){
        formErrors.push("hasło długości co najmniej 2")
    }


    if(!formErrors.length)
    {
      let passLen=getRandomIntFrom(minLength,maxLength)
      let passwordCharacters = letters
      let password=""
      if(hasCap.checked){
        password+=capitals[getRandomIntFrom(0,25)]
        passwordCharacters+=capitals
        passLen--
      }
      if(hasSpe.checked){
        password+=specials[getRandomIntFrom(0,25)]
        passwordCharacters+=specials
        passLen--
      }
      for(let i=0;i<passLen;i++){
        password+=passwordCharacters[getRandomIntFrom(0,passwordCharacters.length-1)]
      }
      alert("Twoje hasło: "+scrambleString(password))
    }
    else{
      formMessage.innerHTML=
            `<ul>
                ${formErrors.map(el => `<li>${el}</li>`).join("")}
            </ul>`
    }
    
})