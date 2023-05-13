$(document).ready(function () {
    function showSuccessMessage(message) {
        $('#message').text(message).addClass('success').removeClass('error').show()
        $('.field-error').text('').removeClass('error').hide()
    }

    function showErrorMessage(message, field) {
        $('#' + field).addClass('error')
        $('#' + field + '-error').text(message).addClass('error').show()
        $('#message').text('').removeClass('success').hide()
    }

    function clearErrorMessages() {
        $('input').removeClass('error')
        $('.field-error').text('').removeClass('error').hide()
    }

    $('form').submit(function (event) {
        event.preventDefault()
        clearErrorMessages()

        var formData = $(this).serialize()

        $.ajax({
            url: 'add.php',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function (response) {
                if (response.hasOwnProperty('errors')) {
                    var errors = response.errors
                    for (var field in errors) {
                        showErrorMessage(errors[field], field)
                        $('#' + field).addClass('error')
                    }
                } else if (response.hasOwnProperty('success')) {
                    showSuccessMessage(response.success)
                    $('form')[0].reset()
                } else if (response.hasOwnProperty('error')) {
                    showErrorMessage(response.error, 'author')
                    $('#author').addClass('error')
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                showErrorMessage('Error adding guest entry: ' + textStatus, 'author')
                $('#author').addClass('error')
            }
        })
    })

    $('input, textarea').on('input', function () {
        $(this).removeClass('error')
        var fieldErrorId = '#' + $(this).attr('id') + '-error'
        $(fieldErrorId).text('').removeClass('error').hide()
    })
})
