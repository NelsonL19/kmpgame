//$("#KMP").on("keypress", userInput);

//export function userInput(e) {/
//	if (e.key == 's'){
//		$("#KMP").style.top =  "50 px";
//	}
	/*
	alert("Key pressed");
	console.log(kmp);
	let keycode = e.code;
	let value = kmp.getAttribute('style');
	*/
	//alert(value);
	//switch (keycode) {
	//	case 'KeyW':
	//		value = 

	//}

	//kmp.setAttribute("top", value);
//}

window.addEventListener('keydown', (event) => {
	const {style} = kmp
	switch(event.key){
		case 'ArrowUp': style.top = `${parseInt(style.top)-1}%`; break;
		case 'ArrowDown': style.top = `${parseInt(style.top)+1}%`; break;
		case 'ArrowLeft': style.left = `${parseInt(style.left)-1}%`; break;
		case 'ArrowRight': style.left = `${parseInt(style.left)+1}%`; break;
	}
});
