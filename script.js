const arr = [1, 2, 3, 4, 5]; 
const images = document.querySelectorAll(".images");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
let selectedImages = [];
resetBtn.style.display = "none";
verifyBtn.style.display = "none";

document.addEventListener("DOMContentLoaded", () => {
	message.innerText="Please click on the identical tiles to verify that you are not a robot."
	const randomDuplicate = Math.floor(Math.random() * 5) + 1;
    const jumbledArr = myFunction([...arr, randomDuplicate]); 

    for (let x = 0; x < images.length; x++) {
        images[x].classList.add(`img${jumbledArr[x]}`);
    }
});

// Fisher-Yates Shuffle Algorithm
function myFunction(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

images.forEach(img => {
  img.addEventListener("click", () => {
     if (img.classList.contains("selected")) {
            img.classList.remove("selected");
            selectedImages = selectedImages.filter(selected => selected !== img);
        } else {
            if (selectedImages.length >= 2) {
                selectedImages[0].classList.remove("selected");
                selectedImages.shift(); 
            }

            img.classList.add("selected");
            selectedImages.push(img);
        } 

	    resetBtn.style.display = selectedImages.length > 0 ? "block" : "none";
        verifyBtn.style.display = selectedImages.length === 2 ? "block" : "none";
  });
});

resetBtn.addEventListener("click", () => {
    selectedImages.forEach(img => img.classList.remove("selected"));
    selectedImages = [];
    message.innerText = "Please click on the identical tiles to verify that you are not a robot.";
    resetBtn.style.display = "none"; 
    verifyBtn.style.display = "none";
});

verifyBtn.addEventListener("click", () => {
    if (selectedImages.length === 2) {
        const img1 = selectedImages[0].classList[1];
        const img2 = selectedImages[1].classList[1]; 

        if (img1 === img2) {
            message.innerText = "You are a human. Congratulations!";
        } else {
            message.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
        }
        verifyBtn.style.display = "none";
    }
});