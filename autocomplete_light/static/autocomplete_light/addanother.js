$(document).ready(function() {
    if (! $('a[onclick="return showAddAnotherPopup(this);"]').length) {

        /* Credit: django.contrib.admin (BSD) */

        var showAddAnotherPopup = function(triggeringLink) {
            var name = triggeringLink.attr( 'id' ).replace(/^add_/, '');
            name = id_to_windowname(name);
            href = triggeringLink.attr( 'href' );

            if (href.indexOf('?') == -1) {
                href += '?';
            }

            href += '&winName=' + name;

            var win = window.open(href, name, 'height=500,width=800,resizable=yes,scrollbars=yes');
            win.focus();

            return false;
        }

        var dismissAddAnotherPopup = function(win, newId, newRepr) {
            // newId and newRepr are expected to have previously been escaped by
            newId = html_unescape(newId);
            newRepr = html_unescape(newRepr);
            var name = windowname_to_id(win.name);
            var elem = document.getElementById(name);

            if (elem) {
                if ($(elem).is('select')) {
                    var o = new Option(newRepr, newId);
                    elem.options[elem.options.length] = o;
                    o.selected = true;
                }
            } else {
                console.log("Could not get input id for win " + name);
            }

            win.close();
        }

        window.dismissAddAnotherPopup = dismissAddAnotherPopup

        var html_unescape = function(text) {
        // Unescape a string that was escaped using django.utils.html.escape.
            text = text.replace(/</g, '');
            text = text.replace(/"/g, '"');
            text = text.replace(/'/g, "'");
            text = text.replace(/&/g, '&');
            return text;
        }

        // IE doesn't accept periods or dashes in the window name, but the element IDs
        // we use to generate popup window names may contain them, therefore we map them
        // to allowed characters in a reversible way so that we can locate the correct
        // element when the popup window is dismissed.
        var id_to_windowname = function(text) {
            text = text.replace(/\./g, '__dot__');
            text = text.replace(/\-/g, '__dash__');
            text = text.replace(/\[/g, '__braceleft__');
            text = text.replace(/\]/g, '__braceright__');
            return text;
        } 

        var windowname_to_id = function(text) {
            text = text.replace(/__dot__/g, '.');
            text = text.replace(/__dash__/g, '-');
            text = text.replace(/__braceleft__/g, '[');
            text = text.replace(/__braceright__/g, ']');
            return text;
        }

        $( '.autocomplete-add-another' ).show().click(function(e) {
            e.preventDefault(  );
            showAddAnotherPopup( $( this ) );
        });

    }
});
