// Write your code here...
fetch("http://localhost:3000/menu")
.then(res => res.json())
.then(resConverted => resConverted.forEach(menuItem =>{
    const spanElement = document.createElement("span")
    const menu = document.querySelector("#menu-items")
    spanElement.innerText = menuItem.name
    menu.append(spanElement)
})
)

async function getItem() {
    const response = await fetch("http://localhost:3000/menu")
    const convertedResponse = await response.json()
    return convertedResponse
}

async function displayFirstItem(){
    const firstItem = await getItem();
    
    const name = document.querySelector("#dish-name")
    name.innerText = firstItem[0].name

    const description = document.querySelector("#dish-description")
    description.innerText = firstItem[0].description

    const image = document.querySelector("#dish-image")
    image.src = firstItem[0].image

    const price = document.querySelector("#dish-price")
    price.innerText = "$"+firstItem[0].price
    
}

async function displayItem(e){
    const items = await getItem();
    const displayItem = items.find( item =>{
        return e === item.name;
    })

    const name = document.querySelector("#dish-name") 
    name.innerText= displayItem.name

    const description = document.querySelector("#dish-description")
    description.innerText = displayItem.description

    const image = document.querySelector("#dish-image")
    image.src = displayItem.image

    const price = document.querySelector("#dish-price")
    price.innerText = "$"+displayItem.price

    return displayItem;
}

document.querySelector("#menu-items").addEventListener("click", async e =>{
    const item = await displayItem(e.target.innerText)
})

let totalPrice = 0;

document.querySelector("form").addEventListener("submit", e =>{
    e.preventDefault();
    const cartAmmount = document.querySelector("#cart-amount")
    const numInCart = document.querySelector("#number-in-cart")

    //get number in Cart:0 to update everytime

    currentCartAmmount = parseInt(cartAmmount.value)
    numInCart.innerText = parseInt(numInCart.innerText) + currentCartAmmount
    
    // get total to reflect 

    const total = document.querySelector("#total-amount")
    const dishPrice = document.querySelector("#dish-price")

    totalPrice += parseFloat(dishPrice.innerText.split("").splice(1).join("")) * currentCartAmmount
    

    total.innerText = "$"+totalPrice


    // total.innerText = totalPrice + 

    // const total = document.querySelector("#total-ammount")
    // total.innerText = itemPrice

})


const main = () =>{
    displayFirstItem()
}

main()

