let sendRequestBtn = document.querySelector(".handle-atm-form .send-request-btn"),
    cardNumber = document.querySelector(".handle-atm-form .card-number"),
    secretNumber = document.querySelector(".handle-atm-form .secret-number")
balance = document.querySelector(".handle-atm-form .balance");

const cardsDetails = [
    {
        cardNumber: 1,
        secretNumber: 12345678,
        balance: 4000,
        validateDate: 2023,
        alowedBalance: 1000,
        isAlowedNegativeBalance: false,
        isBlocked: false,
    },
    {
        cardNumber: 2,
        secretNumber: 87654321,
        balance: 5000,
        validateDate: 2022,
        alowedBalance: 500,
        isAlowedNegativeBalance: true,
        isBlocked: false,
    },
    {
        cardNumber: 3,
        secretNumber: 11112222,
        balance: 2000,
        validateDate: 2024,
        alowedBalance: 700,
        isAlowedNegativeBalance: true,
        isBlocked: false,
    }
];

let inputAttemptsList = [0, 0, 0];

let blockedCardNumbers = [];

function handleRequest (e) {
    e.preventDefault();
    let result = document.querySelector(".result");
    if (!result) {
        result = document.createElement("p");
        result.classList.add("result");
        document.body.appendChild(result);
    }
    let card_details = cardsDetails.find((card_detail) => String(card_detail.cardNumber) == cardNumber.value);
    if (!card_details) {
        result.textContent = "عذراً لا توجد بطاقة بهذا الرقم ( تم إلغاء العملية وإعادة البطاقة )";
        return;
    }
    if (card_details.isBlocked) {
        result.textContent = "عذراً البطاقة محجوبة ولا يمكن السحب منها بسبب تجاوز الحد المسموح لإدخال الرقم السري";
        return;
    }
    if (card_details.validateDate <= 2022) {
        result.textContent = "عذراً البطاقة لم تعد صالحة بسبب تاريخها القديم ( تم إلغاء العملية وإعادة البطاقة )";
        return;
    }
    if (String(card_details.secretNumber) != secretNumber.value) {
        result.textContent = "عذراً الرقم السري الذي أدخلته خاطئ ، الرجاء إعادة إدخاله من جديد";
        inputAttemptsList[card_details.cardNumber - 1] += 1;
        if (inputAttemptsList[card_details.cardNumber - 1] > 3) {
            result.textContent = "عذراً لقد تجاوزت الحد الأقصى لعدد مرات أدخال الرقم السري لهذه البطاقة ، لذلك سوف يتم إلغاء العملية وحجب البطاقة";
            cardsDetails[card_details.cardNumber - 1].isBlocked = true;
        }
        return;
    }
    if (Number(balance.value) > card_details.alowedBalance) {
        result.textContent = "عذراً المبلغ المراد سحبه غير مسموح ( تم إلغاء العملية وإعادة البطاقة )";
        return;
    }
    if (Number(balance.value) > card_details.balance) {
        if (!card_details.isAlowedNegativeBalance) {
            result.textContent = "عذراً لا يمكنك السحب من البطاقة لأن رصيد الزبون غير كافي وغير مسموح الاستدانة ( تم إلغاء العملية وإعادة البطاقة )";
            return;
        }
        cardsDetails[card_details.cardNumber - 1].balance -= Number(balance.value);
        result.textContent = `تمّ سحب المبلغ بنجاح لكن بالاستدانة وتم إعادة البطاقة ( رصيدك الحالي: ${cardsDetails[card_details.cardNumber - 1].balance} )`;
        return;
    }
    cardsDetails[card_details.cardNumber - 1].balance -= Number(balance.value);
    result.textContent = `تمّ سحب المبلغ بنجاح وتم إعادة البطاقة ( رصيد الحالي : ${cardsDetails[card_details.cardNumber - 1].balance} )`;
}