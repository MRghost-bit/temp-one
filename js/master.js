//check color option in local storage

let mainColor = localStorage.getItem("color_option");

if (mainColor!==null) {
	document.documentElement.style.setProperty("--main-color",mainColor);

	document.querySelectorAll(".Colors-list li").forEach(element =>{
			element.classList.remove("active");
			if (element.dataset.color===mainColor) {
				element.classList.add("active");
			}
		});
}

// toggle open setting box and spin
document.querySelector(".settings-box .setting-gear").onclick = function () {
	document.querySelector(".settings-box").classList.toggle("open");
	this.classList.toggle("fa-spin");
}

//swich colors
const colorsLi = document.querySelectorAll(".Colors-list li");
//loop in li
colorsLi.forEach(li =>{
//adding Event to evry li
	li.addEventListener("click",(e)=>{
		//set color on ROOT
		document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
		//add color to local storage
		localStorage.setItem("color_option",e.target.dataset.color);
		//toggle active class
		handleActive(e);
	});

});

let randombg;
let checkbg_option = true;
//check background option in local storage
let main_back = localStorage.getItem("backs_option");
if (main_back!==null) {
	if (main_back==='true') {
		checkbg_option=true;
	}else{
		checkbg_option=false;
	}
	document.querySelectorAll(".random-backgrounds span").forEach(element =>{
			element.classList.remove("active");
		});
	if (main_back==="true") {
		document.querySelector(".random-backgrounds .yes").classList.add("active");
	}else{
		document.querySelector(".random-backgrounds .no").classList.add("active");
	}
}
//swich random backgeound option
const randback_option = document.querySelectorAll(".random-backgrounds span");
//loop in span
randback_option.forEach(span =>{
//adding Event to evry li
	span.addEventListener("click",(e)=>{

		if (e.target.dataset.background=="yes") {
			checkbg_option = true;
			randombg_fun ();
			//console.log("yes");
			localStorage.setItem("backs_option",true);
		}else{
			checkbg_option = false;
			randombg_fun ();
			//onsole.log("no");
			localStorage.setItem("backs_option",false);
		}
		//toggle active class
		handleActive(e);
	});

});

function randombg_fun () {
//random background
let backgrounds = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg",];


	if(checkbg_option){
		let landingPage = document.querySelector(".landing-page");
		//change bg randomly
		randombg = setInterval(()=>{
		//random number
		let randomNum = Math.floor(Math.random()*backgrounds.length);
		landingPage.style.backgroundImage = "url('images/"+backgrounds[randomNum]+"')";
		},5000);
	}else{
		clearInterval(randombg);
	}

}
randombg_fun ();

//skills selector
let ourSkills = document.querySelector(".our-skills");

window.onscroll = function () {

	if (window.scrollY >= ourSkills.getBoundingClientRect().top) {
		let allSkills = document.querySelectorAll(".our-skills .skill-box .skill-progress span");

		allSkills.forEach(skill => {
			skill.style.width = skill.dataset.prog;
		});
	}else{
		let allSkills = document.querySelectorAll(".our-skills .skill-box .skill-progress span");

		allSkills.forEach(skill => {
			skill.style.width = 0;
		});
	}
}

//get the images
let myImage = document.querySelectorAll(".our-gallary .imgs-box img");

//add event to the images
myImage.forEach(img => {

	img.addEventListener("click",(e)=>{
		//create overlay
		let overlay = document.createElement("div");
		//add class to overlay
		overlay.className = "popup-overlay";
		//add to body
		document.body.appendChild(overlay);

		//create popup box
		let popupBox = document.createElement("div");
		//add class to popup box
		popupBox.className = "popup-box";

		if (img.alt !== null) {
			// create heading
			let imageHeading = document.createElement("h3");
			//create heading text
			let headingText = document.createTextNode(img.alt);
			// add the text to the heading
			imageHeading.appendChild(headingText);
			//add heading to popup box
			popupBox.appendChild(imageHeading);
		 }

		//create image
		let popupImage = document.createElement("img");
		//set image source
		popupImage.src = img.src;
		//apennd popup iamge to the popup
		popupBox.appendChild(popupImage);
		//append popup box to the body
		document.body.appendChild(popupBox);
		//create ciose button
		let closeButton = document.createElement("span");
		let closeText = document.createTextNode("X");
		closeButton.appendChild(closeText);
		popupBox.appendChild(closeButton);
		closeButton.className = "close-button";
		});
});

// remove popup

document.addEventListener("click",function(e){
	if (e.target.className == "close-button") {
		document.querySelector(".popup-box").remove();
		document.querySelector(".popup-overlay").remove();

	}
});
//hover effect on featuers
let features = document.querySelectorAll('.features .feat-box');
features.forEach(feat =>{
	feat.addEventListener("mouseenter",function(e){
		this.style.backgroundColor = "#EEE";
		this.querySelector('i').style.backgroundColor = "#fff";
	});
	feat.addEventListener("mouseleave",function(e){
		this.style.backgroundColor = "#fff";
		this.querySelector('i').style.backgroundColor = "#f0f0f0";
	});
});

//select all bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');

allBullets.forEach(bullet =>{
	bullet.addEventListener('click',(e)=>{
		document.querySelector(e.target.dataset.section).scrollIntoView();
	});
});

//handle active state function
function handleActive(ev) {
 	ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
			element.classList.remove("active");
		});
		ev.target.classList.add("active");
}


let showBullets = document.querySelectorAll(".show-bullets span");
let bulletsContainer = document.querySelector(".nav-bullets"); 

let local_bullets = localStorage.getItem("bullet_option");

if (local_bullets !== null) {

	showBullets.forEach(span => {
		span.classList.remove("active");
	});
	if (local_bullets === "block") {
		bulletsContainer.style.display = "block";
		document.querySelector(".show-bullets .yes").classList.add("active");
	} else {
		bulletsContainer.style.display = "none";
		document.querySelector(".show-bullets .no").classList.add("active");
	}
}

showBullets.forEach(span =>{
	span.addEventListener('click',(e)=>{
		handleActive(e);
		if (span.dataset.bullets == "yes") {
			bulletsContainer.style.display = "block";
			localStorage.setItem("bullet_option","block");
		} else {
			bulletsContainer.style.display = "none";
			localStorage.setItem("bullet_option","none");
		}
	});
});

//reset button
let reset_button = document.querySelector('.settings-box .reset-btn').onclick = function reset_options() {
	localStorage.removeItem("color_option");
	localStorage.removeItem("backs_option");
	localStorage.removeItem("bullet_option");
	window.location.reload();
};

let submit_btn = document.querySelector('.contact-us form input[type="submit"]').addEventListener('click',(e)=>{
	e.preventDefault();
});

//toggle menue
let toggle_menue = document.querySelector('.toggle-menue');
let theLinks = document.querySelector('.links');

toggle_menue.onclick = function (e) {
	e.stopPropagation();
	// toggle class menue-active on menue button
	this.classList.toggle("menue-active");
	//toggle class open on menue 
	theLinks.classList.toggle("open");	
};

document.addEventListener("click",(e)=>{

	if (e.target !== toggle_menue && e.target !== theLinks) {
		if (theLinks.classList.contains("open")) {
			// toggle class menue-active on menue button
			toggle_menue.classList.toggle("menue-active");
			//toggle class open on menue 
			theLinks.classList.toggle("open");				
		}
	}

});
theLinks.onclick = (e)=>{e.stopPropagation();};

//scroll to top button
let scrollTopButton = document.querySelector(".scroll-top");
//show button when scrolling
window.onscroll = function () {

	if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
		scrollTopButton.style.display = "block"
	} else {
		scrollTopButton.style.display = "none"
	}

}
//scroll to top function
scrollTopButton.onclick = ()=>{
	document.body.scrollTop = 0; 
	document.documentElement.scrollTop = 0;
}