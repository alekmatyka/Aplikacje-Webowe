let table = document.getElementById("table")
let orderSelect = document.querySelector("select")
let wordSelect = document.querySelector("input")

// document.addEventListener("DOMContentLoaded",(e)=>{
    
// })

function loadElements(p,order){
    table.replaceChildren("")
    switch (order) {
        case "org":
            p.sort((a, b) => a.id-b.id)
            break;

        case "desc":
            p.sort((a, b) => a.title.localeCompare(b.title))
            break;

        case "asc":
            p.sort((a, b) => b.title.localeCompare(a.title))
            break;
    
        default:
            break;
    }

    p.forEach((element)=>{
        const row = document.createElement("tr")
        const imgCon = document.createElement("td")
        const title = document.createElement("td")
        const desc = document.createElement("td")
        const img = document.createElement("img")
        
        img.setAttribute("src",element.images[0])
        img.classList="productImage"
        imgCon.appendChild(img)

        title.innerHTML = element.title
        desc.innerHTML = element.description

        row.appendChild(imgCon)
        row.appendChild(title)
        row.appendChild(desc)

        table.appendChild(row)
    })

    

}

fetch(`https://dummyjson.com/products`)
    .then((res) => res.json())
    .then((data)=>{
        const products = data.products

        loadElements(products,orderSelect.value)

        wordSelect.addEventListener("change",(e)=>{
            const regex = new RegExp(wordSelect.value,"i")
            loadElements(products.filter((element)=>regex.test(element.title) || regex.test(element.description)),
                orderSelect.value)
        })

        wordSelect.addEventListener("keyup",(e)=>{
            const regex = new RegExp(wordSelect.value,"i")
            loadElements(products.filter((element)=>regex.test(element.title) || regex.test(element.description)),
                orderSelect.value)
        })

        orderSelect.addEventListener("change",(e)=>{
            const regex = new RegExp(wordSelect.value,"i")
            loadElements(products.filter((element)=>regex.test(element.title) || regex.test(element.description)),
                orderSelect.value)
        })

    })
