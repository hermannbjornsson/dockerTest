


/* globals
    showMessage,
*/

/* exported
    inventreeGet,
    inventreeDelete,
    inventreeFormDataUpload,
    showApiError,
*/

$.urlParam = function(name) {
    // eslint-disable-next-line no-useless-escape
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);

    if (results == null) {
        return null;
    }

    return decodeURI(results[1]) || 0;
};


// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


/*
 * Perform a GET request to the InvenTree server
 */
function inventreeGet(url, filters={}, options={}) {

    if (!url) {
        console.error('inventreeGet called without url');
        return;
    }

    // Middleware token required for data update
    var csrftoken = getCookie('csrftoken');

    return $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRFToken', csrftoken);
        },
        url: url,
        type: 'GET',
        data: filters,
        dataType: 'json',
        contentType: 'application/json',
        async: (options.async == false) ? false : true,
        success: function(response) {
            if (options.success) {
                options.success(response);
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.error('Error on GET at ' + url);

            if (thrownError) {
                console.error('Error: ' + thrownError);
            }

            if (options.error) {
                options.error({
                    error: thrownError
                });
            } else {
                showApiError(xhr, url);
            }
        }
    });
}


/* Upload via AJAX using the FormData approach.
 *
 * Note that the following AJAX parameters are required for FormData upload
 *
 * processData: false
 * contentType: false
 */
function inventreeFormDataUpload(url, data, options={}) {

    if (!url) {
        console.error('inventreeFormDataUpload called without url');
        return;
    }

    // CSRF cookie token
    var csrftoken = getCookie('csrftoken');

    return $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRFToken', csrftoken);
        },
        url: url,
        method: options.method || 'POST',
        data: data,
        processData: false,
        contentType: false,
        success: function(data, status, xhr) {
            if (options.success) {
                options.success(data, status, xhr);
            }
        },
        error: function(xhr, status, error) {
            console.error('Form data upload failure: ' + status);

            if (options.error) {
                options.error(xhr, status, error);
            } else {
                showApiError(xhr, url);
            }
        }
    });
}


/*
 * Perform a PUT or PATCH request to the InvenTree server
 */
function inventreePut(url, data={}, options={}) {

    if (!url) {
        console.error('inventreePut called without url');
        return;
    }

    var method = options.method || 'PUT';

    // Middleware token required for data update
    var csrftoken = getCookie('csrftoken');

    return $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRFToken', csrftoken);
        },
        url: url,
        type: method,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function(response, status) {
            if (options.success) {
                options.success(response, status);
            }
            if (options.reloadOnSuccess) {
                location.reload();
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            if (options.error) {
                options.error(xhr, ajaxOptions, thrownError);
            } else {
                console.error(`Error on ${method} to '${url}' - STATUS ${xhr.status}`);
                console.error(thrownError);

                showApiError(xhr, url);
            }
        },
        complete: function(xhr, status) {
            if (options.complete) {
                options.complete(xhr, status);
            }
        }
    });
}


/*
 * Performs a DELETE API call to the server
 */
function inventreeDelete(url, options={}) {

    if (!url) {
        console.error('inventreeDelete called without url');
        return;
    }

    options = options || {};

    options.method = 'DELETE';

    return inventreePut(
        url,
        options.data || {},
        options
    );
}


/*
 * Display a notification with error information
 */
function showApiError(xhr, url) {

    var title = null;
    var message = null;

    if (xhr.statusText == 'abort') {
        // Don't show errors for requests which were intentionally aborted
        return;
    }

    switch (xhr.status || 0) {
    // No response
    case 0:
        title = 'Nessuna Risposta';
        message = 'Nessuna risposta dal server InvenTree';
        break;
    // Bad request
    case 400:
        // Note: Normally error code 400 is handled separately,
        //       and should now be shown here!
        title = 'Errore 400: Richiesta Errata';
        message = 'Richiesta API restituito codice di errore 400';
        break;
    // Not authenticated
    case 401:
        title = 'Errore 401: Non Autenticato';
        message = 'Credenziali di autenticazione non fornite';
        break;
    // Permission denied
    case 403:
        title = 'Errore 403 - Permesso negato';
        message = 'Non hai i permessi necessari per accedere a questa funzione';
        break;
    // Resource not found
    case 404:
        title = 'Errore 404: Risorsa Non Trovata';
        message = 'La risorsa richiesta non può essere localizzata sul server';
        break;
    // Method not allowed
    case 405:
        title = 'Errore 405: Metodo Non Consentito';
        message = 'Metodo HTTP non consentito all\'URL';
        break;
    // Timeout
    case 408:
        title = 'Errore 408: Timeout';
        message = 'Timeout connessione durante la richiesta di dati dal server';
        break;
    default:
        title = 'Codice Di Errore Non Gestito';
        message = `Codice errore: ${xhr.status}`;

        var response = xhr.responseJSON;

        // The server may have provided some extra information about this error
        if (response) {
            if (response.error) {
                title = response.error;
            }

            if (response.detail) {
                message = response.detail;
            }
        }

        break;
    }

    if (url) {
        message += '<hr>';
        message += `URL: ${url}`;
    }

    showMessage(title, {
        style: 'danger',
        icon: 'fas fa-server icon-red',
        details: message,
    });
}
