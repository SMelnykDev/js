function appendCode(arr_item, elem){
	let node = document.getElementById(elem);
	node.append(getCode(arr_item)+", ");
}

function getCode(str){
	let code_exp = /(\d*[A-Z]*\d*|\D*\d*)/;
	return code_exp.exec(str)[0];
}

let not_valid_exp = /\w* is not [av]/;
let applied_exp = /\w* is a/;
let codes = document.querySelectorAll('#codes li');
codes = Array.from(codes);

codes.forEach(function(item, index, tamp_arr){
	if(not_valid_exp.exec(item.innerText) != null){
		appendCode(not_valid_exp.exec(item.innerText), 'not_valid');
	}
	if(applied_exp.exec(item.innerText) != null){
		appendCode(applied_exp.exec(item.innerText), 'applied');
	}
});
