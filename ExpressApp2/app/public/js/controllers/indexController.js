
function IndexController()
{

// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#link-logout').click(function (){ 
		that.attemptLogout();		
	});	

	$('#postModal-button').click(function (){		
		
		that.loadAccounts();
	});

// confirm account deletion //
	$('#account-form-btn1').click(function(){$('.modal-confirm').modal('show')});

// handle account deletion //
	$('.modal-confirm .submit').click(function(){ that.deleteAccount(); });

	this.deleteAccount = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/delete',
			type: 'POST',
			data: { id: $('#userId').val()},
			success: function(data){
	 			that.showLockedAlert('Your account has been deleted.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: "/home",
			type: "POST",
			data: {logout : true},
			success: function(data){
	 			//that.showLockedAlert('You are now logged out.<br>Redirecting you back to the homepage.');
				window.location.href = '/';
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}
	
	this.loadAccounts = function () {
		var that = this;
		$.ajax({
			url: "/Acounts",
			dataType: "json",
			type: "GET",			
			success: function (data) {
				//that.showLockedAlert('You are now logged out.<br>Redirecting you back to the homepage.');
				//window.location.href = '/';
				console.log(data);
				alert(data);
			},
			error: function (jqXHR) {
				console.log(jqXHR.responseText + ' :: ' + jqXHR.statusText);
			}
		});
	}
	
	this.showAccounts = function (msg) {
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal-alert .modal-header h3').text('Success!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function () { window.location.href = '/'; })
		setTimeout(function () { window.location.href = '/'; }, 3000);
	}

	this.showLockedAlert = function(msg){
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal-alert .modal-header h3').text('Success!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function(){window.location.href = '/';})
		setTimeout(function(){window.location.href = '/';}, 3000);
	}
}

IndexController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('Your account has been updated.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
