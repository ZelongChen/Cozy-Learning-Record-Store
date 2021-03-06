function routerHandler() {

    var $panels = $('[role="panel"]');
    var $menuItems = $('[role="navigation"] li');

    function handleRouteChange() {

        var hash;
        // Default screen management.
        if(window.location.hash.length === 0) {
            hash = "#welcome";
        } else {
            hash = window.location.hash;
        }

        // Reset panels visibility.
        $panels.hide();

        // Select panel, and show it.
        var $panel = $panels.filter(hash).show();

        // Unselect previously selected item.
        $menuItems.filter('[aria-selected="true"]').attr('aria-selected', false);

        // Mark proper menu item as selected.
        $menuItems.find('[href="' + hash + '"]')
                  .parent()
                  .attr('aria-selected', true);
    }

    window.onpopstate = handleRouteChange;
    handleRouteChange();
}


function fetchDebtHandler() {

    var $result = $('#crud-fetch .result');
    var $resultStatus = $result.find(' p.status span');
    var $resultBody = $result.find('pre');
    var $id = $('#fetch-id');
    var $button = $('#crud-fetch button');

    function onSubmit() {

        var id = $id.val();
        $result.removeClass('error').removeClass('success');

        if (!id) {
            $result.addClass('error');
            $resultStatus.html('');
            $resultBody.html('ID is a mandatory field.');
            return;
        }

        $.ajax({
            'method': 'GET',
            'url': '/statements/' + id,
            'complete': function(xhr, textStatus) {
                $resultStatus.html(xhr.status);

                if (xhr.status === 404) {
                    $result.addClass('success');
                    $resultBody.html('If the ID is not related to a document' +
                                     ', an error code should be returned');
                } else if (xhr.status !== 200) {
                    $result.addClass('error');
                    $resultBody.html(xhr.responseText);
                } else if (!xhr.responseJSON) {
                    $result.addClass('error');
                    $resultBody.html('The document is expected in the ' +
                                     'response, or the status code should ' +
                                     'be 404');
                } else {
                    $result.addClass('success');
                    var formatted = JSON.stringify(xhr.responseJSON, null, 2);
                    $resultBody.html(formatted);
                }
            }
        });
    }

    $button.click(onSubmit);
}


function deleteDebtHandler() {

    var $result = $('#crud-delete .result');
    var $resultStatus = $result.find(' p.status span');
    var $resultBody = $result.find('pre');
    var $id = $('#delete-id');
    var $button = $('#crud-delete button');

    function onSubmit() {

        var id = $id.val();
        $result.removeClass('error').removeClass('success');

        if (!id) {
            $result.addClass('error');
            $resultStatus.html('');
            $resultBody.html('ID is a mandatory field.');
            return;
        }

        $.ajax({
            'method': 'DELETE',
            'url': '/statements/' + id,
            'complete': function(xhr, textStatus) {
                $resultStatus.html(xhr.status);

                if (xhr.status === 404) {
                    $result.addClass('success');
                    $resultBody.html('If the ID is not related to a document' +
                                     ', an error code should be returned');
                } else if (xhr.status !== 204) {
                    $result.addClass('error');
                    $resultBody.html(xhr.responseText);
                } else {
                    $result.addClass('success');
                    var formatted = JSON.stringify(xhr.responseJSON, null, 2);
                    $resultBody.html(formatted);
                }
            }
        });
    }

    $button.click(onSubmit);
}


function listDebtHandler() {

    var $result = $('#crud-list .result');
    var $resultStatus = $result.find(' p.status span');
    var $resultBody = $result.find('pre');
    var $button = $('#crud-list button');

    function onSubmit() {

        $result.removeClass('error').removeClass('success');

        $.ajax({
            'method': 'GET',
            'url': '/statements/',
            'complete': function(xhr, textStatus) {
                $resultStatus.html(xhr.status);

                if (xhr.status !== 200) {
                    $result.addClass('error');
                    $resultBody.html(xhr.responseText);
                } else {
                    $result.addClass('success');
                    var formatted = JSON.stringify(xhr.responseJSON, null, 2);
                    $resultBody.html(formatted);
                }
            }
        });
    }

    $button.click(onSubmit);
}


window.onload = function() {
    routerHandler();
    fetchDebtHandler();
    deleteDebtHandler();
    listDebtHandler();
};
