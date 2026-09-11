/* =========================================
   PAGE ELEMENTS
========================================= */

const invitationPage =
    document.getElementById("invitationPage");

const datePage =
    document.getElementById("datePage");

const letterPage =
    document.getElementById("letterPage");


/* =========================================
   BUTTONS
========================================= */

const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const dateButton =
    document.getElementById("dateButton");


/* =========================================
   FORM ELEMENTS
========================================= */

const dateInput =
    document.getElementById("date");

const timeInput =
    document.getElementById("time");


/* =========================================
   FINAL SCREEN
========================================= */

const finalDate =
    document.getElementById("finalDate");

const finalTime =
    document.getElementById("finalTime");


/* =========================================
   MESSAGES
========================================= */

const sendingMessage =
    document.getElementById("sendingMessage");

const errorMessage =
    document.getElementById("errorMessage");


/* =========================================
   FORMspree endpoint
========================================= */

/*
    IMPORTANT:

    Replace this URL with YOUR
    Formspree endpoint.

    Example:

    https://formspree.io/f/abcd1234
*/

const FORMSPREE_ENDPOINT =
    "https://formspree.io/f/xppznnrr";


/* =========================================
   PAGE SWITCHING
========================================= */

function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(function(pageElement) {

            pageElement.classList.remove(
                "active"
            );

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

yesButton.addEventListener(
    "click",
    function() {

        showPage(datePage);

    }
);


/* =========================================
   NO BUTTON
========================================= */

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


    noButton.style.position =
        "fixed";


    noButton.style.left =
        `${x}px`;


    noButton.style.top =
        `${y}px`;


    noButton.style.zIndex =
        "9999";

}


/* Desktop */

noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


/* Mobile */

noButton.addEventListener(
    "touchstart",
    function(event) {

        event.preventDefault();

        moveNoButton();

    },
    {
        passive: false
    }
);


/* =========================================
   MINIMUM DATE
========================================= */

const today =
    new Date();


const year =
    today.getFullYear();


const month =
    String(
        today.getMonth() + 1
    ).padStart(2, "0");


const day =
    String(
        today.getDate()
    ).padStart(2, "0");


dateInput.min =
    `${year}-${month}-${day}`;


/* =========================================
   SEND INVITATION RESPONSE
========================================= */

dateButton.addEventListener(
    "click",
    async function() {


        /*
            Clear old errors
        */

        errorMessage.textContent =
            "";


        /* Check date */

        if (!dateInput.value) {

            errorMessage.textContent =
                "Please pick a day first 🌸";

            return;

        }


        /* Check time */

        if (!timeInput.value) {

            errorMessage.textContent =
                "Please pick a time too 🥹";

            return;

        }


        /*
            Prevent accidental
            double submissions
        */

        dateButton.disabled =
            true;


        sendingMessage.classList.add(
            "show"
        );


        /*
            Convert date into
            beautiful text
        */

        const selectedDate =
            new Date(
                dateInput.value +
                "T12:00:00"
            );


        const formattedDate =
            selectedDate.toLocaleDateString(
                "en-US",
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );


        const selectedTime =
            timeInput.value;


        /*
            Prepare data for Formspree
        */

        const formData =
            new FormData();


        formData.append(
            "answer",
            "YES ❤️"
        );


        formData.append(
            "date",
            formattedDate
        );


        formData.append(
            "time",
            selectedTime
        );


        formData.append(
            "message",
            `❤️ Invitation accepted!

Date: ${formattedDate}

Time: ${selectedTime}`
        );


        formData.append(
            "_subject",
            "❤️ Your invitation was accepted!"
        );


        try {

            /*
                SEND TO FORMSPREE
            */

            const response =
                await fetch(
                    FORMSPREE_ENDPOINT,
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Submission failed"
                );

            }


            /*
                Show selected
                date/time on final screen
            */

            finalDate.textContent =
                formattedDate;


            finalTime.textContent =
                selectedTime;


            /*
                Show final page
            */

            showPage(letterPage);


        }

        catch (error) {

            console.error(error);


            errorMessage.textContent =
                "Something went wrong. Please try again ❤️";


            dateButton.disabled =
                false;

        }


        finally {

            sendingMessage.classList.remove(
                "show"
            );

        }

    }
);
