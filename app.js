// const factPara=document.querySelector('#fact-para')
// const btn=document.querySelector('#button')
// const url="https://cat-fact.herokuapp.com/facts"

// // const getFacts= async()=>{
// //     const url="https://cat-fact.herokuapp.com/facts"
// //     console.log("Getting facts...");
// //     const promise = await fetch(url)
// //     console.log(promise)
// //     const data=await promise.json()
// //     factPara.innerText=data[1].text
// // }

// function getFacts(){
//  fetch(url).then((response)=>{
//         return response.json()
//     })
//     .then((data)=>{
//         console.log(data)
//         factPara.innerText=data[1].text
//     })
// }

// btn.addEventListener('click',getFacts);


const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg p")
const msgDiv = document.querySelector(".msg")
const amountMsg = document.querySelector(".result")
let msg2 = document.querySelector(".defaultValue2")


for (let select of dropdowns) {
    for (let currCode in currencyList) {
        // console.log(currCode,currencyList[currCode])
        let option = document.createElement('option');
        option.innerText = currCode;
        option.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            option.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            option.selected = "selected";
        }
        select.appendChild(option)
        // console.log(option)
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

function incrementValue() {
    let currentValue = parseInt(numberInput.value, 10);
    numberInput.value = currentValue + 1;
}

function decrementValue() {
    let currentValue = parseInt(numberInput.value, 10);
    numberInput.value = currentValue - 1;
}
const numberInput = document.getElementById('numberInput');

numberInput.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowUp') {
        event.preventDefault();
        incrementValue();
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        decrementValue();
    }
});


const updateFlag = (element) => {
    // console.log(element)
    let currCode = element.value;
    let countryCode = currencyList[currCode]
    // console.log(countryCode, countryCode)
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc

}

btn.addEventListener("click", async (evt) => {
    let fromCurrLower = fromCurr.value.toLowerCase()
    let toCurrLower = toCurr.value.toLowerCase()
    // console.log(toCurrLower,fromCurrLower,"thsihi")
    evt.preventDefault()
    let amount = document.querySelector(".amount input")
    let amtValue = amount.value
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1
        amount.value = "1"
    }
    console.log(amtValue)
    // console.log(fromCurr.value.toLowerCase(),toCurr.value.toLowerCase())

    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`

    let response = await fetch(URL)
    // console.log(response)
    let data = await response.json()
    const rate = data[fromCurrLower][toCurrLower]
    console.log(rate)
    msgDiv.classList.remove("hide")
    msg.innerText = `1 ${fromCurr.value} equals to`
    msg2.innerText = `${rate} ${toCurr.value}`
    let finalAmount = amtValue * rate
    amountMsg.innerText = `${amtValue} ${fromCurr.value} =${finalAmount} ${toCurr.value}`


    // console.log(data)
    // console.log(data[fromCurrLower][toCurrLower], "this is change")
    // console.log(data.fromCurrLower,"Will not work"); // Will not work, because it will look for fromCurrLower in the data

    // let rate=data.toCurr.value.toLowerCase()
    // console.log(rate,"this is rate")


})