let form = document.querySelector('form[class=""]');
let input = document.querySelector('input[data-purpose="sc-coupon-input"]');

function getTotal(){
	fetch('https://www.udemy.com/cart/').then(function(res) {
	    return res.text();
	}).then(function(html) {
	    console.log(html);
	});
}

function applyCode(){
	fetch('https://www.udemy.com/api-2.0/shopping-carts/me/discounts/', {
		credentials: 'include',
		method: 'POST',
		headers: {
			'if-match': JSON.parse(localStorage['shoppingCartStorage:storage-1.0']).state.etag,
			'x-requested-with': 'XMLHttpRequest',
			'content-type': 'application/json;charset=UTF-8',
			'accept': 'application/json, text/plain, */*',
			"If-None-Match":"If-Match"
		},
		body: JSON.stringify({
			codes: ['CODEASDASD']
		})
	}).then(res => res.json()).then(res => console.info(res));
}


localStorage['shoppingCartStorage:storage-1.0'].toString().replace(((/.*/).exec(JSON.parse(localStorage['shoppingCartStorage:storage-1.0']).state.etag)[0]).toString().replace("W/", "").replace(/"/g,""), "LOL");

fetch('https://www.udemy.com/api-2.0/shopping-carts/me/discounts/', {
	credentials: 'include',
	method: 'POST',
	headers: {
		'if-match': JSON.parse(localStorage['shoppingCartStorage:storage-1.0']).state.etag,
		'x-requested-with': 'XMLHttpRequest',
		'content-type': 'application/json;charset=UTF-8',
		'accept': 'application/json, text/plain, */*',
		"If-None-Match":"If-Match"
	},
	body: JSON.stringify({
		codes: ['CODEASDASDA']
	})
	}).then(function(res){
		let temp_etag = JSON.parse(localStorage['shoppingCartStorage:storage-1.0']);
		temp_etag.state.etag = res.headers.get('etag');
		localStorage.setItem('shoppingCartStorage:storage-1.0', JSON.stringify(temp_etag));
		return res.json();
	})
	.then(res => console.info(res))
	.catch(err => {
		let temp_etag = JSON.parse(localStorage['shoppingCartStorage:storage-1.0']);
		temp_etag.state.etag = res.headers.get('etag');
		localStorage.setItem('shoppingCartStorage:storage-1.0', JSON.stringify(temp_etag));
	});


	// delete
	fetch('https://www.udemy.com/api-2.0/shopping-carts/me/discounts/', {
	credentials: 'include',
	method: 'DELETE',
	headers: {
		'if-match': JSON.parse(localStorage['shoppingCartStorage:storage-1.0']).state.etag,
		'x-requested-with': 'XMLHttpRequest',
		'content-type': 'application/json;charset=UTF-8',
		'accept': 'application/json, text/plain, */*',
		"If-None-Match":"If-Match"
	}})


	//generator codes
	function code() {
	  var text = "";
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	  for (var i = 0; i < 10; i++)
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	  return text.toUpperCase();
	}