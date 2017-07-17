/******************************************
 ***********   MENU SERVICES   ************
 ******************************************/

// Inserted into app.js for document.ready
function menus() {
  navSessions();
  navUX();
  $(window).resize(function() {
    navUX();
  });
  tabs();
	$('body').on('click', '.js-toggle-login', function() {
		$('#login').toggleClass('hidden');
	})
}

/*
 * Navigation User Experience
 *
 * Toggles the main navigation between mobile and non-mobile based on the window resize
 *
 */

function navUX() {
  if (window.matchMedia('(max-width: 767px)').matches) {
    $('#js-nav-menu').hide();
    $('#js-nav-btn').show();
    $('#landing').show();

  } else if (window.matchMedia('(min-width: 768px)').matches) {
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

/*
 * Main Navigation
 *
 * The main navigation is toggled between anonymous and authenticated verions based
 * on whether a user session is detection upon window reload.
 *
 */

function navSessions() {
  var token = window.localStorage.getItem('token');
  var links = {
    index: 'index',
    start: 'start',
    contact: 'contact',
    contribute: 'contribute',
    results: 'results',
    quiz: 'quiz',
    contribute: 'contribute',
    login: '<a class="js-toggle-login"><span class="fa fa-user"></span> Sign In/Up</a>',
    logout: '<a class="js-logout"><span class="fa fa-user"></span> Sign Out</a>'
  };

  // Build a anon menu at root
  // Build a anon menu down one level
  // Build a auth menu at root
  // Build a auth menu down one level

  // 1. Determine where in the directory the user is at
  // 2. Determine if the used is logged in
  // 2. Build a menu based on position & sessions


//	window.localStorage.setItem('token', null);
//  if (window.location.pathname === "/html/dashboard.html") {
//    window.location.assign("../index.html");
//  } else {
//    location.reload();
//  }


  var anonymous = (
    '<div id="nav-logo">' +
      '<a href="../index.html"><img src="../images/logo.png" alt="Quizard Logo"></a>' +
    '</div>' +
    '<nav id="js-nav-menu" role="navigation">' +
      '<ul>' +
        '<li><a href="start.html"><span class="fa fa-pencil"></span> Start</a></li>' +
        '<li><a href="about.html"><span class="fa fa-bolt"></span> About</a></li>' +
        '<li><a href="contact.html"><span class="fa fa-comment"></span> Contact</a></li>' +
        '<li><a class="js-toggle-login"><span class="fa fa-user"></span> Sign In/Up</a></li>' +
      '</ul>' +
    '</nav>' +
    '<div id="js-nav-btn">' +
      '<button id="js-hamburger" class="fa fa-bars"></button>' +
      '<button id="js-cross" class="fa fa-close"></button>' +
    '</div>');

  var authenticated = (
    '<div id="nav-logo">' +
        '<a href="results.html"><img src="../images/logo.png" alt="Quizard Logo"></a>' +
      '</div>' +
      '<nav id="js-nav-menu" role="navigation">' +
        '<ul>' +
          '<li><a href="results.html"><span class="fa fa-pencil"></span> Results</a></li>' +
          '<li><a href="quiz.html"><span class="fa fa-bolt"></span> Quiz</a></li>' +
          '<li><a href="contribute.html"><span class="fa fa-comment"></span> Contribute</a></li>' +
          '<li><a class="js-logout"><span class="fa fa-user"></span> Sign Out</a></li>' +
        '</ul>' +
      '</nav>' +
      '<div id="js-nav-btn">' +
        '<button id="js-hamburger" class="fa fa-bars"></button>' +
        '<button id="js-cross" class="fa fa-close"></button>' +
      '</div>');
  if (token === ('null' || 'undefined')) {
    return $('.js-anon-auth').append(anonymous);
  } else {
    return $('.js-anon-auth').append(authenticated);
  }
}

/*
 * Sign Up/In Tabs
 *
 * Toggles the tabs menu within the Sign Up/In popup window. The tabs menu
 * is activated when clicking a class from the navSessions function.
 *
 */

function tabs() {
    $('#tabs ul li a').click(function(){
    $('li a').removeClass("active");
    $(this).addClass("active");
  });

	if($('#tabs').length > 0) {
		$('#tabs').tabs();
	};
}
