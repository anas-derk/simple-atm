// الوصول لعناصر النموذج المطلوبة لمعالجة عملية السحب 
let sendRequestBtn = document.querySelector(".handle-atm-form .send-request-btn"),
    cardNumber = document.querySelector(".handle-atm-form .card-number"),
    secretNumber = document.querySelector(".handle-atm-form .secret-number")
balance = document.querySelector(".handle-atm-form .balance");

// تعريف مصفوفة من بيانات البطاقات المسبقة لاستخدامها في اختبار عملية السحب
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

// تعريف مصفوفة عدد المحاولات لإدخال الرقم السري

let inputAttemptsList = [0, 0, 0];

// تعريف الدالة المسؤولة عن معالجة طلب السحب
function handleRequest (e) {
    // منع إعادة تحميل صفحة الويب
    e.preventDefault();
    // الوصول للعنصر ذو ال class： result من أجل وضع النتيجة بداخله
    let result = document.querySelector(".result");
    // التحقق إن كان العنصر موجود مسبقاً كيف لا يتم إعادة إنشاء وإضافته لجسم الصفحة
    if (!result) {
        // في حال كان غير موجود ننشأه
        result = document.createElement("p");
        result.classList.add("result");
        document.body.appendChild(result);
    }
    // البحث عن البطاقة التي لديها الرقم المدخل
    let card_details = cardsDetails.find((card_detail) => String(card_detail.cardNumber) == cardNumber.value);
    //  في حالة لم يكن هنالك بطاقة لديها الرقم المدخل ، إلغاء العملية
    if (!card_details) {
        result.textContent = "عذراً لا توجد بطاقة بهذا الرقم ( تم إلغاء العملية وإعادة البطاقة )";
        return;
    }
    // التحقق من كون البطاقة محظورة أم لا
    if (card_details.isBlocked) {
        result.textContent = "عذراً البطاقة محجوبة ولا يمكن السحب منها بسبب تجاوز الحد المسموح لإدخال الرقم السري";
        return;
    }
    // التحقق من تاريخ صلاحية البطاقة
    if (card_details.validateDate <= 2022) {
        result.textContent = "عذراً البطاقة لم تعد صالحة بسبب تاريخها القديم ( تم إلغاء العملية وإعادة البطاقة )";
        return;
    }
    // التحقق من الرقم السري
    if (String(card_details.secretNumber) != secretNumber.value) {
        result.textContent = "عذراً الرقم السري الذي أدخلته خاطئ ، الرجاء إعادة إدخاله من جديد";
        // في حالة كان الرقم السري خاطئ ، بالتالي زيادة عدد محاولات الإدخال في عنصر المصفوفة الخاص بالبطاقة
        inputAttemptsList[card_details.cardNumber - 1] += 1;
        // التحقق من كون المستخدم تجاوز العدد المسموح للإدخال
        if (inputAttemptsList[card_details.cardNumber - 1] > 3) {
            result.textContent = "عذراً لقد تجاوزت الحد الأقصى لعدد مرات أدخال الرقم السري لهذه البطاقة ، لذلك سوف يتم إلغاء العملية وحجب البطاقة";
            cardsDetails[card_details.cardNumber - 1].isBlocked = true;
        }
        return;
    }
    // التحقق من كون الرصيد المدخل أكبر من الرصيد المسموح للسحب
    if (Number(balance.value) > card_details.alowedBalance) {
        result.textContent = "عذراً المبلغ المراد سحبه غير مسموح ( تم إلغاء العملية وإعادة البطاقة )";
        return;
    }
    // في حالة الرصيد مسموح ، التحقق من كون الرصيد أكبر من الرصيد الموجود في البطاقة
    if (Number(balance.value) > card_details.balance) {
        // التحقق من أن البطاقة تسمح بالاستدانة 
        if (!card_details.isAlowedNegativeBalance) {
            result.textContent = "عذراً لا يمكنك السحب من البطاقة لأن رصيد الزبون غير كافي وغير مسموح الاستدانة ( تم إلغاء العملية وإعادة البطاقة )";
            return;
        }
        // في حالة البطاقة تسمح بالاستدانة ، سحب الرصيد وإعادة البطاقة
        cardsDetails[card_details.cardNumber - 1].balance -= Number(balance.value);
        result.textContent = `تمّ سحب المبلغ بنجاح لكن بالاستدانة وتم إعادة البطاقة ( رصيدك الحالي: ${cardsDetails[card_details.cardNumber - 1].balance} )`;
        return;
    }
    // في حالة الرصيد في البطاقة كافي ، سحب المبلغ وإعادة البطاقة
    cardsDetails[card_details.cardNumber - 1].balance -= Number(balance.value);
    result.textContent = `تمّ سحب المبلغ بنجاح وتم إعادة البطاقة ( رصيد الحالي : ${cardsDetails[card_details.cardNumber - 1].balance} )`;
}