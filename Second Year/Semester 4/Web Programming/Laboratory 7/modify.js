const urlParams = new URLSearchParams(window.location.search)
const entryId = urlParams.get('id')

function showErrorMessage(message, field) {
    $('#' + field).addClass('error')
    $('#' + field + '-error').text(message).addClass('error').show()
    $('#message').text('').removeClass('success').hide()
}

function clearErrorMessages() {
    $('input').removeClass('error')
    $('.field-error').text('').removeClass('error').hide()
}

function getEntryData() {
    $.ajax({
        url: `get_entry.php?id=${entryId}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#entryId').val(data.id)
            $('#author').val(data.author)
            $('#email').val(data.email)
            $('#title').val(data.title)
            $('#comment').val(data.comment)
            $('#date').val(data.date)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showErrorMessage('Error retrieving guest entry data from server: ' + textStatus)
        }
    })
}

function submitModifiedData() {
    const entryData = {
        id: $('#entryId').val(),
        author: $('#author').val(),
        email: $('#email').val(),
        title: $('#title').val(),
        comment: $('#comment').val(),
        date: $('#date').val()
    }

    $.ajax({
        url: 'modify_entry.php',
        type: 'POST',
        data: entryData,
        dataType: 'json',
        success: function (response) {
            if (response.hasOwnProperty('errors')) {
                var errors = response.errors
                for (const field in errors) {
                    showErrorMessage(response.errors[field], field)
                    $('#' + field).addClass('error')
                }
            } else if (response.hasOwnProperty('error')) {
                showErrorMessage(response.error, 'author')
                $('#author').addClass('error')
            } else if (response.hasOwnProperty('success')) {
                $('#message').text('Guest entry modified successfully!').removeClass('error').addClass('success').show()
                $('.field-error').text('').removeClass('error').hide()
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showErrorMessage('Error modifying guest entry: ' + textStatus, 'author')
        }
    })
}

function goBack() {
    var previousPage = document.referrer
    window.location.replace(previousPage)
}

$(document).ready(function () {
    getEntryData()
})

$('form').submit(function (event) {
    event.preventDefault()
    clearErrorMessages()
    submitModifiedData()

    $('input, textarea').on('input', function () {
        $(this).removeClass('error')
        var fieldErrorId = '#' + $(this).attr('id') + '-error'
        $(fieldErrorId).text('').removeClass('error').hide()
    })
})

$('.go-back').click(function () {
    goBack()
})
