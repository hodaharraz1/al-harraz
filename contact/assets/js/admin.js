// Al Harraz Contact — admin panel: dynamic phone number repeater.
// No dependencies. Pure DOM manipulation, nothing sent to the server
// until the form itself is submitted.
(function () {
    'use strict';

    function makeRow(value) {
        var row = document.createElement('div');
        row.className = 'phone-row';

        var input = document.createElement('input');
        input.type = 'text';
        input.name = 'phones[]';
        input.placeholder = window.ADMIN_I18N.phonePlaceholder;
        input.value = value || '';
        input.maxLength = 25;

        var removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'phone-remove';
        removeBtn.setAttribute('aria-label', window.ADMIN_I18N.removePhone);
        removeBtn.textContent = '✕';
        removeBtn.addEventListener('click', function () {
            row.remove();
        });

        row.appendChild(input);
        row.appendChild(removeBtn);
        return row;
    }

    document.addEventListener('DOMContentLoaded', function () {
        var list = document.getElementById('phone-list');
        var addBtn = document.getElementById('phone-add-btn');
        if (!list || !addBtn) {
            return;
        }

        if (list.children.length === 0) {
            list.appendChild(makeRow(''));
        }

        addBtn.addEventListener('click', function () {
            list.appendChild(makeRow(''));
        });
    });
})();
