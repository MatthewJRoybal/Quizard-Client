
function checkPosition() {
    if (window.matchMedia('(max-width: 899px)').matches) {
        $( "#nav-menu" ).hide();
        $( ".cross" ).hide();
    } else if (window.matchMedia('(min-width: 900px)').matches) {
        $( "#nav-menu" ).show();
        $( ".cross" ).hide();
    }
}

$( ".hamburger" ).click(function() {
  $("header").animate({'margin-bottom': '220px'}, 500);
  $( "#nav-menu" ).slideToggle( 500, function() {

    $( ".hamburger" ).hide();
    $( ".cross" ).show();
  });
});

$( ".cross" ).click(function() {
  $("header").animate({'margin-bottom': '0px'}, 500);
  $( "#nav-menu" ).slideToggle( 500, function() {
      
      $( ".cross" ).hide();
      $( ".hamburger" ).show();
  });
});