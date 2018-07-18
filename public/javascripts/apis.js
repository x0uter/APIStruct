/**
 * table filter
 */
$(document).ready(function () {
    $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
            $('.table tr').css('display', 'none');
            $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
            $('.table tr').css('display', 'none').fadeIn('slow');
        }
    });

});

/**
 * delete route endpoint
 */
function deleteRoute(method, route) {
    const data = {
        method: method,
        route: route
    }
    ajaxRequest('DELETE', '/deleteroute', JSON.stringify(data)).then(window.location.href='/');
}

function ajaxRequest(meth, path, data) {
    return fetch(path, {
        method: meth,
        headers: { 'Content-Type': 'application/json' },
        body: data,
        credentials: 'same-origin'
    })
        .then(resp => {
            if (resp.status != 200) throw new Error(resp.statusText)
            return resp.text()
        })
}