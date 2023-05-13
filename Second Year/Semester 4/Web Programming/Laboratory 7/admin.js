$(document).ready(function () {
    var currentPage = 1
    var totalPages = 0
    
    function loadAuthors() {
        $.ajax({
            url: 'admin.php',
            data: { authors: true },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var authorFilter = $('#author-filter')
                authorFilter.empty()
                authorFilter.append($('<option>', {
                    value: '',
                    text: 'All Authors'
                }))
                $.each(data.authors, function (i, author) {
                    authorFilter.append($('<option>', {
                        value: author,
                        text: author
                    }))
                })
            }
        })
    }

    function loadTitles() {
        $.ajax({
            url: 'admin.php',
            data: { titles: true },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var titleFilter = $('#title-filter')
                titleFilter.empty()
                titleFilter.append($('<option>', {
                    value: '',
                    text: 'All Titles'
                }))
                $.each(data.titles, function (i, title) {
                    titleFilter.append($('<option>', {
                        value: title,
                        text: title
                    }))
                })
            }
        })
    }

    function applyFilters() {
        var author = $('#author-filter').val()
        var title = $('#title-filter').val()
        var results = $('#results')

        results.empty()

        $.ajax({
            url: 'admin.php',
            data: { author: author, title: title, page: currentPage },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var entries = data.entries
                if (entries.length > 0) {
                    $.each(entries, function (i, entry) {
                        var div = $('<div>').addClass('entry')
                        div.append($('<h3>').text(entry.title))
                        div.append($('<p>').text(entry.comment))
                        div.append($('<p>').text('Author: ' + entry.author))
                        div.append($('<p>').text('Email: ' + entry.email))
                        div.append($('<p>').text('Date: ' + entry.date))
                        results.append(div)
                    })
                } else {
                    results.append($('<p>').text('No entries found'))
                }

                var pagination = data.pagination
                totalPages = pagination.totalPages
                updatePaginationButtons()
            }
        })

        $("#pagination").show()
    }

    function updatePaginationButtons() {
        var prevButton = $('#prev-page')
        var nextButton = $('#next-page')
        var lastButton = $('#last-page')

        prevButton.prop('disabled', currentPage === 1)
        nextButton.prop('disabled', currentPage === totalPages)
        lastButton.prop('disabled', currentPage === totalPages)

        prevButton.off('click').on('click', function () {
            if (currentPage > 1) {
                currentPage--
                applyFilters()
            }
        })

        nextButton.off('click').on('click', function () {
            if (currentPage < totalPages) {
                currentPage++
                applyFilters()
            }
        })

        lastButton.off('click').on('click', function () {
            if (currentPage < totalPages) {
                currentPage = totalPages
                applyFilters()
            }
        })
    }

    function goBack() {
        window.location.href = "index.html"
    }

    loadAuthors()
    loadTitles()

    $('#apply-filters').on('click', function () {
        currentPage = 1
        applyFilters()
    })

    $('#add-button').on('click', function () {
        window.location.href = 'add.html'
    })

    $('#list-button').on('click', function () {
        window.location.href = 'list.html'
    })

    $('#first-page').on('click', function () {
        if (currentPage > 1) {
            currentPage = 1
            applyFilters()
        }
    })

    $('#prev-page').on('click', function () {
        if (currentPage > 1) {
            currentPage--
            applyFilters()
        }
    })

    $('#next-page').on('click', function () {
        if (currentPage < totalPages) {
            currentPage++
            applyFilters()
        }
    })

    $('#last-page').on('click', function () {
        if (currentPage < totalPages) {
            currentPage = totalPages
            applyFilters()
        }
    })

    $('.go-back').on('click', goBack)
})