console.log('wtf');
$(function() {
  $("#phonenumber").mask('+7(000) 000-00-00');
  });
  $('body input[name="vklink"]').mask('httpS://vk.com/99999000000000000000000000000000',
      {
          clearIfNotMatch: true,
          translation:
          {
              '0': { pattern: /[A-Za-z0-9_]/, optional: true },
              '9': { pattern: /[A-Za-z0-9_]/},
              'S': { pattern: /[s]/, optional: true }
          }
      }
  );
