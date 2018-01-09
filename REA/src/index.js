$(function() {
    $('#phonenumber').mask('+7 (000) 000-00-00');

    $('textarea')
        .css({
            height: this.scrollHeight + 'px',
            'overflow-y': 'hidden'
        })
        .on('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
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
    $('#photos-count').html('Ты прикрепил ' + photosCount + ' фото');
});
