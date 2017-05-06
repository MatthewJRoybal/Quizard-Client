function displayLogin() {
	$('.btn-login' || '.btn-cancel').click(function() {
		$('.login').toggleClass('hidden');
	});
	$('.btn-cancel').click(function() {
		$('.login').toggleClass('hidden');
	});
}

function loginTabs() {
	$('#tabs').tabs();
}

$(document).ready(function() {
	displayLogin();
	loginTabs();
});