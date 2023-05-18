$(document).ready(function () {
    var currentPage = 1
    var totalPages = 0
    $("#count-pages").show()

    function showErrorMessage(message) {
        var container = $(".container")
        container.empty()
        container.append($("<h1>", { text: "Error" }))
        container.append($("<p>", { text: message }))
    }

    function getData(page) {
        $.ajax({
            url: "list.php",
            type: "GET",
            dataType: "json",
            data: { page: page },
            success: function (data) {
                $("#guestbook tbody").empty()

                $.each(data, function (index, item) {
                    var row = $("<tr>")
                    $("<td>").text(item.author).appendTo(row)
                    $("<td>").text(item.email).appendTo(row)
                    $("<td>").text(item.title).appendTo(row)
                    $("<td>").text(item.comment).appendTo(row)
                    $("<td>").text(item.date).appendTo(row)
                    $("<td>").html(`<button class="modify-btn" data-entry-id="${item.id}">Modify</button><button class="delete-btn" data-entry-id="${item.id}">Delete</button>`).appendTo(row)
                    row.appendTo("#guestbook")
                })

                currentPage = page
                updatePagination()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                showErrorMessage("Error retrieving data from server: " + textStatus)
            }
        })
    }

    function updatePagination() {
        $("#pagination .page-number").text(currentPage + " / " + totalPages)

        if (currentPage === 1) {
            $("#prev-page").prop("disabled", true)
            $("#first-page").prop("disabled", true)
        } else {
            $("#prev-page").prop("disabled", false)
            $("#first-page").prop("disabled", false)
        }

        if (currentPage === totalPages) {
            $("#next-page").prop("disabled", true)
            $("#last-page").prop("disabled", true)
        } else {
            $("#next-page").prop("disabled", false)
            $("#last-page").prop("disabled", false)
        }

        $("#count-pages").text(currentPage + " / " + totalPages)
    }

    $.ajax({
        url: "list.php",
        type: "GET",
        dataType: "json",
        data: {
            page: currentPage, total:
                true
        },
        success: function (data) {
            totalPages = data.totalPages
            updatePagination()
            getData(currentPage)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            showErrorMessage("Error retrieving data from server: " + textStatus)
        }
    })

    $("#prev-page").on("click", function () {
        if (currentPage > 1) {
            getData(currentPage - 1)
            updatePagination()
        }
    })

    $("#next-page").on("click", function () {
        if (currentPage < totalPages) {
            getData(currentPage + 1)
            updatePagination()
        }
    })

    $(document).on("click", ".modify-btn", function () {
        var entryId = $(this).data("entry-id")
        var urlParams = new URLSearchParams(window.location.search)
        urlParams.set("id", entryId)
        var modifiedUrl = "modify.html?" + urlParams.toString()
        window.location.href = modifiedUrl
    })

    $(document).on("click", ".delete-btn", function () {
        var entryId = $(this).data("entry-id")
        var urlParams = new URLSearchParams(window.location.search)
        urlParams.set("id", entryId)
        var modifiedUrl = "delete.html?" + urlParams.toString()
        window.location.href = modifiedUrl
    })
})            