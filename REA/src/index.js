$(function() {
    $('#phonenumber').mask('+7 (000) 000-00-00', { clearIfNotMatch: true });

    $('textarea')
        .css({
            height: this.scrollHeight + 'px',
            'overflow-y': 'hidden'
        })
        .on('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });

    $('#vklink').mask('httpS://vk.com/99999000000000000000000000000000', {
        clearIfNotMatch: true,
        translation: {
            '0': { pattern: /[A-Za-z0-9_]/, optional: true },
            '9': { pattern: /[A-Za-z0-9_]/ },
            S: { pattern: /[s]/, optional: true }
        }
    });

    $('#photos').change(function(event) {
        var photosCount = $('#photos')[0].files.length;
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
            fio: 'required',
            phonenumber: 'required',
            height: {
                required: true,
                number: true,
                range: [140, 230]
            }
        },
        submitHandler: function(form) {
            form.submit();
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        }
    });

    $.extend($.validator.messages, {
        required: 'Заполни это поле',
        number: $.validator.format('Введи корректное число'),
        range: $.validator.format('Введи значение между {0} и {1}')
    });
});
