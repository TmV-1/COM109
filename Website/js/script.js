// ================= COOKIE FUNCTIONS(OPEN IN LIVE SERVER) =================
function setCookie(name, value, days) {
    let exp = new Date();
    exp.setTime(exp.getTime() + (days * 86400000));
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toUTCString() + ";path=/";
}

function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

$(document).ready(function () {

    // ================= WELCOME USER (FIXED) =================
    let savedUser = getCookie("user");

    if (savedUser && savedUser !== "") {
        $("#welcomeText").text("Welcome " + savedUser);
    } else {
        $("#welcomeText").text("Welcome");
    }

    // ================= LIVE CLOCK =================
    function updateClock() {
        let now = new Date();
        $("#liveClock").text(now.toLocaleString());
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ================= PAGE FADE =================
    $(".main").hide().fadeIn(700);

    // ================= BUILD TIME SLOTS =================
    $(".day").each(function () {
        let day = $(this).find("h5").text();
        let time = $(this).find(".slots").text();
        $("#timeSlot").append(`<option>${day} (${time})</option>`);
    });

    // ================= SLOT CLICK =================
    $(".day").click(function () {
        $(".slots").slideUp();
        $(this).find(".slots").slideToggle();

        $(".day").css("background", "#e6f0fa");
        $(this).css("background", "#bcdcff");

        let day = $(this).find("h5").text();

        $("#timeSlot option").each(function () {
            if ($(this).text().includes(day)) {
                $(this).prop("selected", true);
            }
        });
    });

    // ================= DATE LIMIT =================
    let today = new Date().toISOString().split("T")[0];
    $("#date").attr("min", today);

    // ================= REAL-TIME VALIDATION =================
    $("input, select").on("input", function () {
        if ($(this).val().trim() !== "") {
            $(this).css("border", "2px solid green");
        } else {
            $(this).css("border", "2px solid red");
        }
    });

    $("#email").on("input", function () {
        let valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($(this).val());
        $(this).css("border", valid ? "2px solid green" : "2px solid red");
    });

    // ================= FORM SUBMIT =================
    $("#bookingForm").submit(function (e) {
        e.preventDefault();

        let valid = true;

        let name = $("#name").val().trim();
        let email = $("#email").val().trim();
        let phone = $("#phone").val().trim();
        let service = $("#service").val();
        let date = $("#date").val();

        if (name.length < 2) valid = false;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) valid = false;
        if (phone.length < 7 || !/^[0-9+\s()-]+$/.test(phone)) valid = false;
        if (!service) valid = false;
        if (!date || date < today) valid = false;

        if (valid) {
            if (getCookie("cookieConsent") === "accepted") {
                setCookie("user", name, 30);
                setCookie("email", email, 30);
            }

            $("#formMessage")
                .text("✔ Booking confirmed!")
                .css("color", "green")
                .hide()
                .fadeIn();

            setTimeout(() => {
                $("#bookingForm")[0].reset();
                $("#formMessage").fadeOut();
            }, 3000);

        } else {
            $("#formMessage")
                .text("✖ Please fix the highlighted fields")
                .css("color", "red")
                .hide()
                .fadeIn();
        }
    });

    // ================= IMAGE HOVER =================
    $(".garage-img").hover(
        function () { $(this).css("transform", "scale(1.05)"); },
        function () { $(this).css("transform", "scale(1)"); }
    );

    // ================= INPUT FOCUS =================
    $("input, select").focus(function () {
        $(this).css("background", "#e6f0fa");
    }).blur(function () {
        $(this).css("background", "white");
    });

    // ================= COOKIE BANNER =================
   if (!getCookie("cookieConsent")) {
    $("#cookieBanner").show();
} else {
    $("#cookieBanner").hide();
}

$("#acceptCookies").click(function () {
    setCookie("cookieConsent", "accepted", 30);
    $("#cookieBanner").fadeOut(1000);
});

$("#declineCookies").click(function () {
    setCookie("cookieConsent", "declined", 30);
    $("#cookieBanner").fadeOut(1000);
});
    // ================= LOGIN PAGE =================
    $(".login-box").hide().fadeIn(600);
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        let user = $("#username").val().trim();
        let pass = $("#password").val().trim();

        if (user === "" || pass === "") {
            showMsg("Enter email and password", "red");
            shake();
        }
        else if (!user.includes("@")) {
            showMsg("Enter valid email", "red");
            shake();
        }
        else if (pass.length < 4) {
            showMsg("Password too short", "red");
            shake();
        }
        else {
            setCookie("user", user, 30); // READS GUEST USER FOR LOADING HOMPAGE
            window.location.href = "index.html";
        }
    });

    $("#guestBtn").click(function () {
        setCookie("user", "Guest", 1); // READS GUEST USER FOR LOADING HOMPAGE
        window.location.href = "index.html";
    });

    $("#helpBtn").click(function () {
        alert("Enter your email and password (min 4 characters)");
    });

    function showMsg(msg, color) {
        $("#loginMessage").text(msg).css("color", color).hide().fadeIn();
    }

    function shake() {
        $(".login-box")
            .animate({ marginLeft: "-10px" }, 100)
            .animate({ marginLeft: "10px" }, 100)
            .animate({ marginLeft: "0px" }, 100);
    }

});
