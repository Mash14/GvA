// Navbar change
window.addEventListener("scroll", function () {
	if (window.scrollY > 250) {
		// let navbar1 = document.getElementById("nav1");
		// navbar1.style.top = "-60px";
		let navbar2 = document.getElementById("nav2");
		navbar2.style.display = "flex";
		navbar2.style.top = "0";
		navbar2.style.transition = "all 1s ease-in-out";
	} else if (window.scrollY > 10) {
		let navbar1 = document.getElementById("nav1");
		navbar1.style.top = "-60px";
	} else {
		let navbar1 = document.getElementById("nav1");
		navbar1.style.top = "0";
		navbar1.style.transition = "all 0.5s ease-in-out";
		let navbar2 = document.getElementById("nav2");
		navbar2.style.top = "-60px";
		navbar2.style.transition = "all 0.5s ease-in-out";
	}
});

// Slider
let currentIndex = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;
const dots = document.querySelectorAll(".dot");
let autoSlide = setInterval(nextSlide, 5000);

// Updates the slide position and highlights the active dot
// function updateSlide() {
// 	slides.style.transform = `translateX(-${currentIndex * 100}vw)`;
// 	updateDots();
// }
function updateSlide(instant = false) {
	slides.style.transition = instant ? "none" : "transform 1s ease-in-out";
	slides.style.transform = `translateX(-${currentIndex * 100}vw)`;
	updateDots();
}

// Moves to the next slide, looping back to the first
// function nextSlide() {
// 	currentIndex = (currentIndex + 1) % totalSlides;
// 	updateSlide();
// 	resetAutoSlide();
// }
function nextSlide() {
	if (currentIndex === totalSlides - 1) {
		currentIndex = 0;
		updateSlide(true);
		setTimeout(
			() => (slides.style.transition = "transform 1s ease-in-out"),
			50
		);
	} else {
		currentIndex++;
		updateSlide();
	}
	resetAutoSlide();
}

// Moves to the previous slide, looping to the last when at the first
// function prevSlide() {
// 	currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
// 	updateSlide();
// 	resetAutoSlide();
// }
function prevSlide() {
	if (currentIndex === 0) {
		currentIndex = totalSlides - 1;
		updateSlide(true);
		setTimeout(
			() => (slides.style.transition = "transform 1s ease-in-out"),
			50
		);
	} else {
		currentIndex--;
		updateSlide();
	}
	resetAutoSlide();
}

// Moves directly to a specific slide based on the dot clicked
function goToSlide(index) {
	currentIndex = index;
	updateSlide();
	resetAutoSlide();
}

// Highlights the active dot corresponding to the current slide
function updateDots() {
	dots.forEach((dot, index) => {
		dot.classList.toggle("active", index === currentIndex);
	});
}

// Resets the auto-slide timer when manually navigating
function resetAutoSlide() {
	clearInterval(autoSlide);
	autoSlide = setInterval(nextSlide, 5000);
}

// Contact Bot
let chatIndex = 0;
const chatMessages = [
	"What do you need help with?",
	"Would you like to speak with an agent?",
	"You can visit our contact page to send an email.",
];

function openModal() {
	document.getElementById("contactModal").style.display = "block";
	document.getElementById("contact-button").style.display = "none";
}

function closeModal() {
	document.getElementById("contactModal").style.display = "none";
	document.getElementById("contact-button").style.display = "block";
}

function sendMessage() {
	let userInput = document.getElementById("userInput").value;
	if (userInput.trim() !== "") {
		let chatBox = document.getElementById("chatBox");
		chatBox.innerHTML += `<div class='chat-message user-message'>You: ${userInput}</div>`;
		document.getElementById("userInput").value = "";
		chatBox.scrollTop = chatBox.scrollHeight;
		setTimeout(nextQuestion, 1000);
	}
}

function handleKeyPress(event) {
	if (event.key === "Enter") {
		sendMessage();
	}
}

function nextQuestion() {
	if (chatIndex < chatMessages.length) {
		let chatBox = document.getElementById("chatBox");
		chatBox.innerHTML += `<div class='chat-message bot-message'>Bot: ${chatMessages[chatIndex]}</div>`;
		chatIndex++;
		chatBox.scrollTop = chatBox.scrollHeight;
	}
}

function goToContactPage() {
	window.location.href = "contact.html";
}
