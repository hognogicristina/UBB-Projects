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
    container.append($("<h1>", { text: "Success" }))
    container.append($("<p>", { text: message }))
}

function displayErrorMessage(message) {
    var container = $(".container")
    container.empty()
    container.append($("<h1>", { text: "Error" }))
    container.append($("<p>", { text: message }))
}

function displayCancelMessage(message) {
    var container = $(".container")
    container.empty()
    container.append($("<h1>", { text: "Canceled" }))
    container.append($("<p>", { text: message }))
}