let sendRequestBtn = document.querySelector(".handle-atm-form .send-request-btn"),
    cardNumber = document.querySelector(".handle-atm-form .card-number"),
    secretNumber = document.querySelector(".handle-atm-form .secret-number")
    balance = document.querySelector(".handle-atm-form .balance");

let cardDetails = [
    {
        cardNumber: 1,
        secretNumber: "12345678",
        balance: 4000,
        validateDate: 2023,
        alowedBalance: 1000,
    },
    {
        cardNumber: 2,
        secretNumber: "87654321",
        balance: 5000,
        validateDate: 2022,
        alowedBalance: 500,
    },
    {
        cardNumber: 3,
        secretNumber: "a1n2a3s4",
        balance: 2000,
        validateDate: 2024,
        alowedBalance: 700,
    }
];

// let inputAttemptsList = [{ cardNumber, inputAttempts}];

let blockedCardNumbers = [];

const handleRequest = (e) => {
    e.preventDefault();
    let result = document.querySelector(".result");
    if (!result) {
        result = document.createElement("p");
        result.classList.add("result");
        document.body.appendChild(result);
    }
    result.textContent = "hhh";
}