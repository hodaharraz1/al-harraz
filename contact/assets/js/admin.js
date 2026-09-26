// Al Harraz Contact — admin panel: dynamic phone number repeater.
// No dependencies. Pure DOM manipulation, nothing sent to the server
// until the form itself is submitted.
(function () {
    'use strict';

    function makeRow(index, label, number) {
        var row = document.createElement('div');
        row.className = 'phone-row';

        var inputsWrap = document.createElement('div');
        inputsWrap.className = 'phone-inputs';

        var labelInput = document.createElement('input');
        labelInput.type = 'text';
        labelInput.name = 'phones[' + index + '][label]';
        labelInput.placeholder = window.ADMIN_I18N.phoneLabelPlaceholder;
        labelInput.value = label || '';
        labelInput.maxLength = 80;
        labelInput.className = 'phone-label-input';

        var numberInput = document.createElement('input');
        numberInput.type = 'text';
        numberInput.name = 'phones[' + index + '][number]';
        numberInput.placeholder = window.ADMIN_I18N.phoneNumberPlaceholder;
        numberInput.value = number || '';
        numberInput.maxLength = 25;

        inputsWrap.appendChild(labelInput);
        inputsWrap.appendChild(numberInput);

        var removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'phone-remove';
        removeBtn.setAttribute('aria-label', window.ADMIN_I18N.removePhone);
        removeBtn.textContent = '✕';
        removeBtn.addEventListener('click', function () {
            row.remove();
        });

        row.appendChild(inputsWrap);
        row.appendChild(removeBtn);
        return row;
    }

    document.addEventListener('DOMContentLoaded', function () {
        var list = document.getElementById('phone-list');
        var addBtn = document.getElementById('phone-add-btn');
        if (!list || !addBtn) {
            return;
        }

        var nextIndex = parseInt(list.getAttribute('data-next-index'), 10);
        if (isNaN(nextIndex)) {
            nextIndex = list.children.length;
        }

        if (list.children.length === 0) {
            list.appendChild(makeRow(nextIndex++, '', ''));
        }

        addBtn.addEventListener('click', function () {
            list.appendChild(makeRow(nextIndex++, '', ''));
        });
    });
})();
