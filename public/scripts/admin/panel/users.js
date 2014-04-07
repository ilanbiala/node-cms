/**
 * TODO make changing the password and the role possible
 */

function removeUserFromTable(user) {
	$('#' + user).remove();
}

function addUserToTable(user) {
	var userHTMLString = '';
	userHTMLString += '<tr id="' + user._id + '">' +
		'<td>' + user.firstName + ' ' + user.lastName + '</td>' +
		'<td>' + user.email + '</td>' +
		'<td>' + user.role + '</td>' +
		'<td>Change password</td>' +
		'<td><a href="#" class="removeUserModalButton" data-user-id="' + user._id + '" data-reveal-id="removeUserModal"><i class="fi-x"></i></a></td>' +
		'</tr>';
	$('.users').append(userHTMLString);
}

$(document).ready(function() {
	$(document).foundation();

	var whichUserToDelete;

	$('.removeUserModalButton').on('click', function() {
		whichUserToDelete = $(this).attr('data-user-id');
	});

	$('#cancelRemoveUser, #cancelAddUser').on('click', function() {
		$(this).parent().foundation('reveal', 'close');
	});

	$('#removeUser').on('click', function() {
		$.ajax({
			url: '/panel/users/' + whichUserToDelete,
			type: 'DELETE'
		}).done(function(response) {
			if (response.success === true) {
				$('#removeUserModal').foundation('reveal', 'close');
				$('.alert-box.success').trigger('open.fndtn.alert-box').children('p.content').text('Way to go! That user is out of here!');
				removeUserFromTable(whichUserToDelete);
				whichUserToDelete = null;
			}
		}).fail(function(err) {
			alert('Error: ' + err);
			console.log(err);
			$('#removeUserModal').foundation('reveal', 'close');
			$('.alert-box.warning').trigger('open.fndtn.alert-box').children('p.content').text('Something went wrong, please try again.');
		});
	});

	$('#addUser').on('click', function() {
		$.ajax({
			url: '/panel/users/create',
			type: 'POST'
		}).done(function(response) {
			if (response.success === true) {
				$('#addUserModal').foundation('reveal', 'close');
				$('.alert-box.success').trigger('open.fndtn.alert-box');
				addUserToTable(response.user);
			}
		}).fail(function(err) {
			alert('Error: ' + err);
			console.log(err);
			$('#addUserModal').foundation('reveal', 'close');
			$('.alert-box.warning').trigger('open.fndtn.alert-box');
		});
	});
});
