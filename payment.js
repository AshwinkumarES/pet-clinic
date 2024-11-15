
document.getElementById('cardNumber').addEventListener('input', formatCardNumber);
document.getElementById('expiryMonth').addEventListener('input', formatMonth);
let payment = document.querySelector('#paymentForm');

//card - button payment switch
document.querySelector('.cardPayment').addEventListener('click',()=>{
  payment.innerHTML=`
          <div class="form-group">
              <label for="cardNumber">Card Number</label>
              <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" required>
          </div>
          <div class="form-group-inline">
            <div class="form-group">
                <label for="expiryMonth">Expiry Month / Expiry Year</label>
                <input type="text" id="expiryMonth" placeholder="MM / YY" maxlength="7" required>
            </div>

            <div class="form-group">
                <label for="cvv">CVV</label>
                <input type="password" id="cvv" placeholder="123" maxlength="3" required>
            </div>
          </div>
          <div class="form-group">
              <label for="cardholderName">Cardholder's Name</label>
              <input type="text" id="cardholderName" placeholder="Leo Das" required>
          </div>
          <button type="button" onclick="processPayment()">Proceed With Payment </button> 
    `
    document.getElementById('cardNumber').addEventListener('input', formatCardNumber);
    document.getElementById('expiryMonth').addEventListener('input', formatMonth);
})

//card - button payment switch
document.querySelector('.upiPayment').addEventListener('click',()=>{
  payment.innerHTML=`
          <div class="form-group">
              <label for="upiId">UPI ID</label>
              <input type="text" id="upiId" placeholder="9483829210@oksbi" required>
          </div>

          <div class="form-group">
              <label for="accountHolderName">Account holder's Name</label>
              <input type="text" id="accountHolderName" placeholder="Leo Das" required>
          </div>
          <button type="button" onclick="processUpiPayment()">Proceed With Payment </button>
      `;
});

//payment validation card
function formatCardNumber() {
    const cardNumberInput = document.getElementById('cardNumber');
    let cardNumber = cardNumberInput.value.replace(/\D+/g, ''); // Remove spaces
    cardNumber = cardNumber.match(/.{1,4}/g)?.join(' ') || cardNumber; // Add space every 4 digits
    cardNumberInput.value = cardNumber;
}

function formatMonth() {
    let monthInput = document.getElementById('expiryMonth');
    let month = expMonth.value.replace(/\D/g, ''); // Remove non-digits
    month = month.match(/.{1,2}/g)?.join(' / ') || month; // Add space every 4 digits
    monthInput.value = month;
}


let cardNo = document.getElementById('cardNumber');
let expMonth = document.getElementById('expiryMonth');
let cvvNo =document.getElementById('cvv');
let holderName= document.getElementById('cardholderName');

let paymentStatus = document.querySelector('.paymentStatus');
function processPayment() {
    const cardNumber=cardNo.value;
    const expiryMonth = expMonth.value;
    const cvv = cvvNo.value;
    const cardholderName =holderName.value;

//payment status card
    if (validateCardNumber(cardNumber) && validateMonth(expiryMonth) && validateCVV(cvv) && cardholderName) {
        paymentStatus.innerHTML=`  
            <div class="paymentSucess">
                <img class="statusImg" src="icons/tick.jpg">
                <h1 class="statusText">Payment Succeeded!</h1>
                <p class="statusSubText">Your transaction was completed successfully. Thank you for your purchase!</p>
                <a href="index.html"><button class="backButton">OKAY</button></a>
            </div>`;
        cardNo.value=''; expMonth.value=""; cvvNo.value=''; holderName.value='';
    } 
    else {
        paymentStatus.innerHTML=`  
            <div class="paymentSucess">
                <img class="statusImg" src="icons/wrong.jpg">
                <h1 class="statusText">Payment Failed :(</h1>
                <p class="statusSubText">Invalid Data. Please Try Again!</p>
                <button class="tryAgainButton" onclick="paymentFailedClose()" >TRY AGAIN</button>
             </div>`;
    } 
}

function validateCardNumber(number) {
    const regex = /^\d{4} \d{4} \d{4} \d{4}$/;
    return regex.test(number);
}

function validateMonth(month) {
    const regex =/^(0[1-9]|1[0-2]) \/ \d{2}$/;;
    return regex.test(month);
}


function validateCVV(cvv) {
    const regex = /^\d{3}$/;
    return regex.test(cvv);
}



//payment validation upi
function processUpiPayment(){
    const upiId =document.querySelector('#upiId');
    const name = document.querySelector('#accountHolderName');
    if (upiId.value==='' || name.value==='') {
        paymentStatus.innerHTML=`  
        <div class="paymentSucess">
            <img class="statusImg" src="icons/wrong.jpg">
            <h1 class="statusText">Payment Failed :(</h1>
            <p class="statusSubText">Invalid Data. Please Try Again!</p>
            <button class="tryAgainButton" onclick="paymentFailedClose()" >TRY AGAIN</button>
        </div>`;
        
    } 
    else {
            paymentStatus.innerHTML=`  
            <div class="paymentSucess">
                <img class="statusImg" src="icons/tick.jpg">
                <h1 class="statusText">Payment Succeeded!</h1>
                <p class="statusSubText">Your transaction was completed successfully. Thank you for your purchase!</p>
                <a href="index.html"><button class="backButton">OKAY</button></a>
            </div>`;
            upiId.value=''; name.value='';
    } 
}

//closing payment status popup
function paymentFailedClose(){
    paymentStatus.innerHTML=``;
}


//order summary 

//amount
let costHtml = document.getElementById('amount');
let balanceHtml = document.getElementById('balance');
let totalHtml = document.getElementById('total');

let amount='';
let balance='';
let total='';

const doctorId =localStorage.getItem('doctorId');
details.forEach((detail)=>{
    if(detail.id===doctorId){
        amount=detail.price;
        costHtml.textContent=`₹ ${amount}`;
        balancecalculation(amount);
        totalamount(amount);
    }
});


function balancecalculation(amount){
    balance=amount-100;
    balanceHtml.textContent=`₹ ${balance}`;
}

function totalamount(amount){
    total=100;
    totalHtml.textContent=`₹ ${total}`;
}