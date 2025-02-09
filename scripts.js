// Navbar change
window.addEventListener("scroll", function () {
	if (window.scrollY > 250) {
		let navbar1 = document.getElementById("nav1");
		navbar1.style.top = "-60px";
		let navbar2 = document.getElementById("nav2");
		navbar2.style.display = "flex";
		navbar2.style.top = "0";
		navbar2.style.transition = "all 1s ease-in-out";
	} else {
		let navbar1 = document.getElementById("nav1");
		navbar1.style.top = "0";
		navbar1.style.transition = "all 0.5s ease-in-out";
		let navbar2 = document.getElementById("nav2");
		navbar2.style.top = "-60px";
		navbar2.style.transition = "all 0.5s ease-in-out";
	}
});
