$(document).ready(function () {
    $("#confirm-delete").on("click", function () {
        deleteEntry()
    })

    $("#cancel-delete").on("click", function () {
        displayCancelMessage("Delete operation canceled.")
        setTimeout(goBack, 2000)
    })
})

function deleteEntry() {
    $.ajax({
        url: "delete.php",
        type: "POST",
        data: { entryId: getEntryIdFromURL() },
        dataType: "json",
        success: function (response) {
            if (response.success) {
                displaySuccessMessage(response.message)
                setTimeout(goBack, 2000)
            } else {
                displayErrorMessage(response.message)
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            displayErrorMessage("Error deleting entry. Please try again.")
            setTimeout(goBack, 2000)
        }
    })
}

function goBack() {
    var previousPage = document.referrer
    window.location.replace(previousPage)
}

function getEntryIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get("id")
}

function displaySuccessMessage(message) {
    var container = $(".container")
    container.empty()
    container.append($("<h1>", { text: "Success", class: "success-title" }))
    container.append($("<p>", { text: message, class: "success-text" }))
}

function displayErrorMessage(message) {
    var container = $(".container")
    container.empty()
    container.append($("<h1>", { text: "Error", class: "error-title" }))
    container.append($("<p>", { text: message, class: "error-text" }))
}

function displayCancelMessage(message) {
    var container = $(".container")
    container.empty()
    container.append($("<h1>", { text: "Canceled", class: "cancel-title" }))
    container.append($("<p>", { text: message, class: "cancel-text" }))
}

