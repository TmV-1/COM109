$(document).ready(function () {

    // SHOW USER FROM COOKIE
let cookies = document.cookie;

if (cookies.includes("user=")) {
    let user = cookies.split("user=")[1];
    $("#welcomeUser").text("Welcome, " + user);
}

    // FADE IN PAGE
    $(".main").hide().fadeIn(800);

    // ===== BUILD DROPDOWN FROM AVAILABLE SLOTS =====
    $(".day").each(function () {
        let day = $(this).find("h5").text();
        let time = $(this).find(".slots").text();

        $("#timeSlot").append(
            `<option>${day} (${time})</option>`
        );
    });

    // ===== CLICK DAY → SHOW + SELECT =====
    $(".day").click(function () {
        $(this).find(".slots").slideToggle();

        let day = $(this).find("h5").text();
        let time = $(this).find(".slots").text();

        $("#timeSlot").val(`${day} (${time})`);

        $(".day").css("background", "#e6f0fa");
        $(this).css("background", "#bcdcff");
    });

    // FORM VALIDATION
    $("#bookingForm").submit(function (e) {
        e.preventDefault();

        let valid = true;

        $("input, select").css("border", "1px solid black");

        if ($("#name").val() === "") {
            $("#name").css("border", "2px solid red");
            valid = false;
        }

        if ($("#email").val() === "" || !$("#email").val().includes("@")) {
            $("#email").css("border", "2px solid red");
            valid = false;
        }

        if ($("#phone").val() === "") {
            $("#phone").css("border", "2px solid red");
            valid = false;
        }

        if ($("#service").val() === "") {
            $("#service").css("border", "2px solid red");
            valid = false;
        }

        if (valid) {
            $("#formMessage")
                .text("Booking successful!")
                .css("color", "green")
                .hide()
                .fadeIn();

            document.cookie = "username=" + $("#name").val();

            $("#bookingForm")[0].reset();
        } else {
            $("#formMessage")
                .text("Please complete all fields correctly")
                .css("color", "red");
        }
    });

    // REAL-TIME VALIDATION
    $("input, select").on("keyup change", function () {
        if ($(this).val() !== "") {
            $(this).css("border", "2px solid green");
        }
    });

    // HOVER IMAGE
    $(".garage-img").hover(
        function () {
            $(this).css("transform", "scale(1.05)");
        },
        function () {
            $(this).css("transform", "scale(1)");
        }
    );

    // INPUT FOCUS
    $("input, select").focus(function () {
        $(this).css("background", "#e6f0fa");
    }).blur(function () {
        $(this).css("background", "white");
    });

    // COOKIE BANNER
    if (document.cookie.includes("accepted=true")) {
        $("#cookieBanner").hide();
    }

    $("#acceptCookies").click(function () {
        document.cookie = "accepted=true";
        $("#cookieBanner").fadeOut();
    });

    $("#declineCookies").click(function () {
        document.cookie = "declined=false";
        $("#cookieBanner").fadeOut();
    });

});

// Login Page
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        let user = $("#username").val();
        let pass = $("#password").val();

        if (user === "" || pass === "") {
            $("#loginMessage")
                .text("Please enter username and password")
                .css("color", "red");
            shakeForm();
        }
        else if (!user.includes("@")) {
            $("#loginMessage")
                .text("Enter a valid email")
                .css("color", "red");
            shakeForm();
        }
        else if (pass.length < 4) {
            $("#loginMessage")
                .text("Password must be at least 4 characters")
                .css("color", "red");
            shakeForm();
        }
        else {
            $("#loginMessage")
                .text("Login successful!")
                .css("color", "green")
                .hide()
                .fadeIn();

            document.cookie = "user=" + user;

            setTimeout(function () {
                window.location.href = "index.html";
            }, 1000);
        }
    });

    // ===== GUEST BUTTON =====
    $("#guestBtn").click(function () {
        $("#loginMessage")
            .text("Continuing as guest...")
            .css("color", "blue");

        setTimeout(function () {
            window.location.href = "index.html";
        }, 1000);
    });

    // ===== HELP BUTTON =====
    $("#helpBtn").click(function () {
        alert("Enter your email and password (min 4 characters), or continue as guest.");
    });

    // ===== INPUT FOCUS =====
    $("input").focus(function () {
        $(this).css("background", "#e6f0fa");
    }).blur(function () {
        $(this).css("background", "white");
    });

    // ===== SHAKE ANIMATION =====
    function shakeForm() {
        $(".login-box")
            .animate({ marginLeft: "-10px" }, 100)
            .animate({ marginLeft: "10px" }, 100)
            .animate({ marginLeft: "0px" }, 100);
    }
