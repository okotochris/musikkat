let menu = document.getElementById('menu');
let links_mobile= document.getElementById('links_mobile');
let y=1;
	menu.onclick= function(){
		if(y==1){
				menu.style.background= "url('menu2.png')"
				links_mobile.style.display= 'block';
				y=2;
				console.log('hello word')
		}
		else{
			menu.style.background= "url('menu.png') "
			links_mobile.style.display= 'none';
			y=1;
			console.log('hello word')
		}
	}

	let search1 = document.getElementById('search1');
	let input1 = document.querySelector('.search');
	let result = document.querySelector('.result');
	
	search1.onclick= ()=>{
		
		if(input1.value ===""){
			result.style.display= "block"
			result.innerText= "Please the filed is empty";
			console.log('the field is empty ')
			
		}
		else{
			result.style.display= "block"
			result.innerText= "please i can't find content on " + input1.value;
			console.log('it is not empty u have contnent in it')
			
		}
		setInterval( function(){
			result.style.display= "none"
		}, 10000)
	}

	
	