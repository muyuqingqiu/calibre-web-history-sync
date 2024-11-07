var setBookHistoryRemoteDebounce = debounce(setBookHistoryRemote, 1000)
function setBookHistoryRemote ({ historyKey, historyValue }) {
    const bookHistoryUrl = '/ajax/book/history'
    const { bookId, bookType } = window.calibre || {}
    var csrftoken = $("input[name='csrf_token']").val()
    $.ajax({
        method: 'post',
        url: bookHistoryUrl,
        contentType: 'application/json; charset=utf-8',
        // dataType: 'json',
        headers: { 'X-CSRFToken': csrftoken },
        data: JSON.stringify({
            bookId: bookId,
            bookType: bookType,
            historyKey: historyKey,
            historyValue: historyValue,
        }),
    })
        .done(function (res) {
            console.log('Success: ' + res)
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' ' + errorThrown)
        })
        .always(function () {})
}

function debounce (func, wait) {
    let timeout
    return function (...args) {
        const context = this
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(context, args), wait)
    }
}
