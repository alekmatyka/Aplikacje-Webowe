const select = document.getElementById("temat")
const textarea = document.getElementById("textarea")
const form = document.querySelector("form")
const textinput = form.querySelector("textarea")
const emailinput = form.querySelector("input[name=email]")
const formMessage = form.querySelector(".form-message")

const placeholders={
    prayer:"Panie Boże Imperatorze",
    complaint:"Chciałbym się poskarżyć...",
    heresy: "Mój sąsiad zaczął zachowywać się dziwnie..."
}

textarea.setAttribute("placeholder",placeholders[select.value])

select.addEventListener("change",e=>{
    textarea.setAttribute("placeholder",placeholders[select.value])
})

//weryfikacja
const regEmail = /\S+@\S+\.\S+/;

form.addEventListener("submit",e => {
    e.preventDefault();

    let formErrors = [];
    if(textinput.value.length<=0){
        formErrors.push("Wypełnij poprawnie pole z wiadomością");
    }

    if (!regEmail.test(emailinput.value)) {
        formErrors.push("Wypełnij poprawnie pole z emailem");
    }

    if (!formErrors.length) {
        form.submit();
    } else {
        formMessage.innerHTML = `
            <h3 class="form-error-title">Przed wysłaniem proszę poprawić błędy:</h3>
            <ul class="form-error-list">
                ${formErrors.map(el => `<li>${el}</li>`).join("")}
            </ul>
        `;
    }

})