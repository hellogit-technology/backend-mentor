$(document).ready(function() {
  $('.close-toast').click(function() {
    $('.wrapper-toast-main').remove()
  })
})

$(document).on('click', function() {
  $('.wrapper-toast-main').remove()
});
