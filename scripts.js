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
		navbar1.style.top = "-75px";
	} else {
		let navbar1 = document.getElementById("nav1");
		navbar1.style.top = "0";
		navbar1.style.transition = "all 0.5s ease-in-out";
		let navbar2 = document.getElementById("nav2");
		navbar2.style.top = "-75px";
		navbar2.style.transition = "all 0.5s ease-in-out";
	}
});
// Add active
document.addEventListener("DOMContentLoaded", function () {
	var currentPage = window.location.pathname; // Get current page URL
	var navLinks = document.querySelectorAll(".navbar-items");

	navLinks.forEach((link) => {
		if (link.getAttribute("href") === currentPage) {
			link.classList.add("active"); // Add 'active' class to the matching link
		}
	});
});

////navbar toggle
function toggleMenu() {
	let navLinks = document.getElementById("navLinks");
	let menuToggle = document.getElementById("menuToggle");

	// Toggle active class to show/hide menu
	navLinks.classList.toggle("active");
	menuToggle.classList.toggle("active");

	// Delay items appearing when menu opens
	const navItems = document.querySelectorAll(".navbar-items");
	if (navLinks.classList.contains("active")) {
		navItems.forEach((item, index) => {
			item.style.transitionDelay = `${index * 0.4}s`;
			item.style.opacity = "1";
			item.style.transform = "translateY(0)";
		});
	} else {
		// Hide items when menu closes
		navItems.forEach((item) => {
			item.style.transitionDelay = "0s";
			item.style.opacity = "0";
			item.style.transform = "translateY(-20px)";
		});
	}
}

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
		chatBox.innerHTML += `<div class='chat-message user-message'>You : ${userInput}</div>`;
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
		chatBox.innerHTML += `<div class='chat-message bot-message'>GvA : ${chatMessages[chatIndex]}</div>`;
		chatIndex++;
		chatBox.scrollTop = chatBox.scrollHeight;
	}
}

function goToContactPage() {
	window.location.href = "contact.html";
}

//// Image Modal
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close-img");
const images = document.querySelectorAll(".img");

// Open modal when clicking an image
images.forEach((img) => {
	img.addEventListener("click", function () {
		modal.style.display = "flex";
		modalImg.src = this.src;
	});
});

// Close modal when clicking "X" or outside the image
closeBtn.addEventListener("click", () => (modal.style.display = "none"));
modal.addEventListener("click", (e) => {
	if (e.target === modal) modal.style.display = "none";
});

///// Send Email
// Initialize EmailJS when the page loads
window.onload = function () {
	emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
};

function sendEmail() {
	console.log("Send email function triggered."); // Debugging

	// Get form values
	const name = document.getElementById("name").value.trim();
	const email = document.getElementById("email").value.trim();
	const subject = document.getElementById("subject").value.trim();
	const message = document.getElementById("message").value.trim();

	let isValid = true;

	// Validation
	if (name.length < 3) {
		document.getElementById("name-error").innerText =
			"Name must be at least 3 characters.";
		isValid = false;
	} else {
		document.getElementById("name-error").innerText = "";
	}

	if (!validateEmail(email)) {
		document.getElementById("email-error").innerText =
			"Please enter a valid email address.";
		isValid = false;
	} else {
		document.getElementById("email-error").innerText = "";
	}

	if (subject.length < 5) {
		document.getElementById("subject-error").innerText =
			"Subject must be at least 5 characters.";
		isValid = false;
	} else {
		document.getElementById("subject-error").innerText = "";
	}

	if (message.length < 10) {
		document.getElementById("message-error").innerText =
			"Message must be at least 10 characters.";
		isValid = false;
	} else {
		document.getElementById("message-error").innerText = "";
	}

	if (!isValid) return;

	// Show loading spinner and disable button
	document.getElementById("loading-spinner").style.display = "block";
	document.getElementById("btn-text").innerText = "Sending...";
	document.querySelector("button").disabled = true;

	const params = { name, email, subject, message };

	// Send email
	emailjs
		.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params)
		.then(() => {
			document.getElementById("status-message").innerText =
				"Message sent successfully!";
			document.getElementById("status-message").style.color = "green";
			document.getElementById("contact-form").reset();
		})
		.catch(() => {
			document.getElementById("status-message").innerText =
				"Error sending message.";
			document.getElementById("status-message").style.color = "red";
		})
		.finally(() => {
			// Hide loading spinner and enable button
			document.getElementById("loading-spinner").style.display = "none";
			document.getElementById("btn-text").innerText = "Send Message";
			document.querySelector("button").disabled = false;
		});
}

// Email validation function
function validateEmail(email) {
	const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return re.test(email);
}

// document.addEventListener("DOMContentLoaded", function () {
// 	const menuToggle = document.getElementById("menuToggle");
// 	const navLinks = document.querySelector(".nav-links");
// 	const navItems = document.querySelectorAll(".nav-links a");

// 	menuToggle.addEventListener("click", function () {
// 		navLinks.classList.toggle("active");
// 		menuToggle.classList.toggle("active");

// 		// Animate menu items one by one
// 		navItems.forEach((item, index) => {
// 			setTimeout(() => {
// 				item.style.opacity = "1";
// 				item.style.transform = "translateY(0)";
// 			}, index * 150);
// 		});
// 	});
// });
