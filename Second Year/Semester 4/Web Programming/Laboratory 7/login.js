document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("login-form")
    var errorContainer = document.querySelector(".error-container")
    var messageContainer = document.getElementById("message-container")
    var showPasswordBtn = document.getElementById("show-password-btn")
    var passwordInput = document.getElementById("password")

    showPasswordBtn.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text"
            showPasswordBtn.innerHTML = '<i class="fa fa-eye-slash" id="password-icon"></i>'
        } else {
            passwordInput.type = "password"
            showPasswordBtn.innerHTML = '<i class="fa fa-eye" id="password-icon"></i>'
        }
    })

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault()

        var usernameInput = document.getElementById("username")
        var passwordInput = document.getElementById("password")

        var username = usernameInput.value
        var password = passwordInput.value

        var data = {
            username: username,
            password: password
        }

        var xhr = new XMLHttpRequest()
        xhr.open("POST", "login.php", true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText)
                if (response.success) {
                    window.location.href = response.redirect
                } else {
                    errorContainer.innerHTML = '<i class="fa fa-exclamation-circle"></i> ' + response.message
                    errorContainer.classList.add("error")
                    errorContainer.classList.add("show")
                }
            }
        }

        xhr.send("username=" + encodeURIComponent(data.username) + "&password=" + encodeURIComponent(data.password))
    })
})
