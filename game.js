$("#KMP").on("keydown", userInput);

export function userInput(e) {
	alert("Key pressed");
	console.log(kmp);
	let keycode = e.code;
	let value = kmp.getAttribute('style');
	
	alert(value);
	//switch (keycode) {
	//	case 'KeyW':
	//		value = 

	//}

	kmp.setAttribute("top", value);
}