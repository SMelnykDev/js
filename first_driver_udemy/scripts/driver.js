
//document.write('<script src="//cdn.jsdelivr.net/bluebird/3.5.0/bluebird.min.js"></script>');

let originalPrice = 0;
let totalPrice = 0;
let allCodes = ['', 'EARLYBIR', 'WEQWDSADWQE', 'SADQWERWQ'];
let result = new Set();
let temp_result = [];

function getOriginalTotal(){
	return parseFloat(document.querySelector('.styles--sc-checkout-box__discount--38tXM s span').textContent.replace('$', ''));
}

function getTotalPrice(array = null){
	if(array){
		//map 
		const total = array.cart.reduce((sum, item) => sum + item.purchase_price.amount, 0);
		return parseFloat(total).toFixed(2);
	}else{
		return parseFloat(document.querySelector('.styles--sc-checkout-box__total-price--3u3TW span').textContent.replace('$', '')).toFixed(2);
	}
}

function getExistingCodes(){
	return Array.from(document.querySelectorAll('.styles--coupon-box__attempt-code--1z86w b'));
}

function applyCode(total, code, retry = false) {
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
		codes: [code]
	})
	}).then(function(res){
		let temp_etag = JSON.parse(localStorage['shoppingCartStorage:storage-1.0']);
		temp_etag.state.etag = res.headers.get('etag');
		localStorage.setItem('shoppingCartStorage:storage-1.0', JSON.stringify(temp_etag));
		return res.json();
	})
	.then(res => {
		temp_result.push({code_name: code, code_price: getTotalPrice(res)});
		console.log(temp_result);

		return temp_result;
	}).then(arr => {
		console.log('My total ',total);
		arr.forEach(function(item, index, _arr){
			if(_arr[index].code_price <= total && _arr[index].code_price != total){
				result.add(_arr[index]);
			}
		});
		//arr[0].code_price != totalPrice ? result.push(arr[0]) : temp_result.splice(0,0);
	})
	.catch(err => {
	    console.info(err, err.response)
	    if(err.response.status === 412 && !retry) {
	        applyCode(total, code, true)
	    }
		let temp_etag = JSON.parse(localStorage['shoppingCartStorage:storage-1.0']);
		temp_etag.state.etag = res.headers.get('etag');
		localStorage.setItem('shoppingCartStorage:storage-1.0', JSON.stringify(temp_etag));
	});
}

function deleteCode(){
	fetch('https://www.udemy.com/api-2.0/shopping-carts/me/discounts/', {
		credentials: 'include',
		method: 'DELETE',
		headers: {
			'if-match': JSON.parse(localStorage['shoppingCartStorage:storage-1.0']).state.etag,
			'x-requested-with': 'XMLHttpRequest',
			'content-type': 'application/json;charset=UTF-8',
			'accept': 'application/json, text/plain, */*',
			"If-None-Match":"If-Match"
		}
	}).then(res => {console.info(res.json());});
}

window.apply = function() {
	let tempArr = [];
	tempArr = getExistingCodes();
	tempArr.forEach(item => {allCodes.push(item.textContent); });
	deleteCode();
	//temp_result = [];
	totalPrice = getTotalPrice();
	allCodes = Array.from(allCodes);
	//console.log();
	allCodes.forEach(item => applyCode(totalPrice,item));
	console.log(result);
    //applyCode()
}

window.delete = function(){
	deleteCode()
}