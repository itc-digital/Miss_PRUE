function writeFormToLocalStorage(data) {
    if (window.localStorage) {
        localStorage.setItem('data', JSON.stringify(data));
    }
}

function readFormFromLocalStorage() {
    if (window.localStorage) {
        var data = localStorage.getItem('data');
        return JSON.parse(data);
    }
}

function eraseFormFromLocalStorage() {
    if (window.localStorage) {
        localStorage.removeItem('data');
    }
}

function applyFormData(data) {
    if (data) {
        data.forEach(function(input) {
            $('*[name=' + input.name + ']')[0].value = input.value;
        });
    }
}

$(function() {
    $('#phone').mask('+7 (000) 000-00-00', { clearIfNotMatch: true });

    var borderHeight = 2;
    $('textarea')
        .css({
            height: this.scrollHeight + borderHeight + 'px',
            'overflow-y': 'hidden'
        })
        .on('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + borderHeight + 'px';
        });

    $('#vklink').mask('httpS://vk.com/99999000000000000000000000000000', {
        clearIfNotMatch: true,
        translation: {
            '0': { pattern: /[A-Za-z0-9_]/, optional: true },
            '9': { pattern: /[A-Za-z0-9_]/ },
            S: { pattern: /[s]/, optional: true }
        }
    });

    $('#instagram').mask('httpS://instagram.com/99999000000000000000000000000000', {
        clearIfNotMatch: true,
        translation: {
            '0': { pattern: /[A-Za-z0-9_]/, optional: true },
            '9': { pattern: /[A-Za-z0-9_]/ },
            S: { pattern: /[s]/, optional: true }
        }
    });

    $('#params').mask('990/990/990', {
        clearIfNotMatch: true,
        translation: {
            '0': { pattern: /[0-9]/, optional: true },
            '9': { pattern: /[0-9]/ },
        }
    });

    $('#photos').change(function(event) {
        var photosCount = $('#photos')[0].files.length;
        if (photosCount > 9) {
            photosCount = 'X';
        }
        $('#photos-count').html(photosCount);
    });

    $('#scroll-hint').click(function() {
        $('html, body').animate(
            {
                scrollTop: $(window).height()
            },
            {
                duration: 200,
                easing: 'swing'
            }
        );
    });

    $('#form').validate({
        rules: {
            fio: {
                required: true,
                maxlength: 256
            },
            kurs: 'selectNotDefault',
            fakultet: 'selectNotDefault',
            vklink: {
                required: true,
                maxlength: 256
            },
            hobbies: {
                required: true,
                maxlength: 1024
            },
            mr_reu_2018: {
                required: true,
                maxlength: 1024
            },
            phone: {
                required: true,
                maxlength: 1024
            },
            height: {
                required: true,
                number: true,
                range: [140, 230]
            }
        },
        submitHandler: function(form) {
            var serialized = $('form').serializeArray();
            writeFormToLocalStorage(serialized);

            var photosCount = $('#photos')[0].files.length;
            console.log(photosCount)
            if (photosCount != 2) {
                alert('Прикрепи 2 фотографии');
            } else {
                form.submit();
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        }
    });

    var formData = readFormFromLocalStorage();
    if (formData && confirm('Ты уже заполняла эту форму. Восстановить введённые значения?')) {
        applyFormData(formData);
    } else {
        eraseFormFromLocalStorage();
    }
});

$.validator.addMethod(
    'selectNotDefault',
    function(value, element) {
        return this.optional(element) || value !== 'unset';
    },
    $.validator.format('Please select a value')
);

$.extend($.validator.messages, {
    required: 'Заполни это поле',
    maxlength: 'В это поле нельзя ввести больше {0} символов',
    number: $.validator.format('Введи корректное число'),
    range: $.validator.format('Введи значение между {0} и {1}'),
    selectNotDefault: 'Выбери значение'
});
