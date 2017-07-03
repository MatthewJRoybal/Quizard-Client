function navUX() {
  if (window.matchMedia('(max-width: 899px)').matches) {
    $('#js-nav-menu').hide();
    $('#js-nav-btn').show();
    $('#landing').show();

  } else if (window.matchMedia('(min-width: 900px)').matches) {
    $('#js-nav-menu').show();
    $('#js-nav-btn').hide();
  }
  $('#js-cross').hide();
  $('#js-hamburger').show();
  $('#js-hamburger').on('click', function() {
    $('#landing').hide();
    $('#js-nav-menu').show();
    $('#js-hamburger').hide();
    $('#js-cross').show();
  }); 
  $('#js-cross').on('click', function() {
    $('#js-nav-menu').hide();
    $('#landing').show();
    $('#js-cross').hide();
    $('#js-hamburger').show();
  });
}