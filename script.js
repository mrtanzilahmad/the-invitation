/* =========================================
   GET ELEMENTS
========================================= */

const invitationPage = document.getElementById("invitationPage");
const datePage = document.getElementById("datePage");
const letterPage = document.getElementById("letterPage");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");

const dateButton = document.getElementById("dateButton");

const finalDate = document.getElementById("finalDate");
const finalTime = document.getElementById("finalTime");

const restartButton = document.getElementById("restartButton");


/* =========================================
   PAGE SWITCHING
========================================= */

function showPage(page) {

    document.querySelectorAll(".page").forEach(function (p) {

        p.classList.remove("active");

    });

    page.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   YES BUTTON
========================================= */

yesButton.addEventListener("click", function () {

    showPage(datePage);

});


/* =========================================
   NO BUTTON
========================================= */

/*
    The NO button runs away when the user
    tries to click it.
*/

function moveNoButton() {

    const padding = 20;

    const maxX =
        window.innerWidth -
        noButton.offsetWidth -
        padding;

    const maxY =
        window.innerHeight -
        noButton.offsetHeight -
        padding;

    const x =
        Math.max(
            padding,
            Math.random() * maxX
        );

    const y =
        Math.max(
            padding,
            Math.random() * maxY
        );

    noButton.style.position = "fixed";

    noButton.style.left = `${x}px`;

    noButton.style.top = `${y}px`;

    noButton.style.zIndex = "1000";

}


/*
    Desktop
*/

noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


/*
    Mobile
*/

noButton.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveNoButton();

    },
    { passive: false }
);


/*
    If they somehow click NO anyway,
    move it again.
*/

noButton.addEventListener(
    "click",
    function () {

        moveNoButton();

    }
);


/* =========================================
   DATE VALIDATION
========================================= */

/*
    Prevent selecting a date in the past.
*/

const today = new Date();

const year = today.getFullYear();

const month = String(
    today.getMonth() + 1
).padStart(2, "0");

const day = String(
    today.getDate()
).padStart(2, "0");

const todayString =
    `${year}-${month}-${day}`;

dateInput.min = todayString;


/* =========================================
   DATE BUTTON
========================================= */

dateButton.addEventListener(
    "click",
    function () {

        const selectedDate =
            dateInput.value;

        const selectedTime =
            timeInput.value;


        if (!selectedDate) {

            alert(
                "Pick a day first 🌸"
            );

            return;

        }


        if (!selectedTime) {

            alert(
                "Pick a time too 🥹"
            );

            return;

        }


        /*
            Convert YYYY-MM-DD into
            a nicer format.
        */

        const dateObject =
            new Date(
                selectedDate + "T12:00:00"
            );


        const formattedDate =
            dateObject.toLocaleDateString(
                "en-US",
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );


        finalDate.textContent =
            formattedDate;

        finalTime.textContent =
            selectedTime;


        showPage(letterPage);

    }
);


/* =========================================
   RESTART
========================================= */

restartButton.addEventListener(
    "click",
    function () {

        dateInput.value = "";

        timeInput.value = "";

        showPage(invitationPage);

    }
);
