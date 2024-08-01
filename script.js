document.addEventListener("DOMContentLoaded", function () {
  const colorOptions = document.querySelectorAll('input[name="color"]');
  const productImage = document.getElementById("productImage");
  const mainImage = document.getElementById("mainImage");

  // Add event listener to each color option
  colorOptions.forEach((option) => {
    option.addEventListener("change", function () {
      // Update image based on selected color
      let color = this.value;
      let imagePath = `${color}.jpg`;
      mainImage.src = imagePath;

      // Update selected state for color options
      colorOptions.forEach((opt) => {
        let span = opt.nextElementSibling;
        if (opt.checked) {
          span.classList.add("selected");
        } else {
          span.classList.remove("selected");
        }
      });
    });
  });
});

function change(event, source) {
  document.getElementById("mainImage").src = source;
}

function add(data) {
  let colorSelected = ""
  document.querySelectorAll('input[name="color"]').forEach((opt) => {
    if(opt.checked) colorSelected = opt.value;
  });
  let pointure = document.querySelector("select").value;
  if(!pointure || isNaN(+pointure)) return alert("veuillez selectionner une pointure");
  if(!colorSelected) return alert("veuillez choisir une couleur");
  let panier = localStorage["panier"]
  if(panier) {
    panier = JSON.parse(panier);

    panier.push({ ...data, pointure: pointure, color: colorSelected, image: data.colors[colorSelected] });
    localStorage["panier"] = JSON.stringify(panier);
  } else {
    panier = [];
    panier.push({
      ...data,
      pointure: pointure,
      color: colorSelected,
      image: data.colors[colorSelected],
    });
    localStorage["panier"] = JSON.stringify(panier);
  }

  document.querySelector('.modal3').style.display = 'grid'
}
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("envoyer");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Handle confirm and cancel buttons
var confirmYes = document.getElementById("confirmYes");
var confirmNo = document.getElementById("confirmNo");

confirmYes.onclick = function() {
  // Add your logic here to proceed with the order
  modal.style.display = "none";
  document.querySelector(".modal2").style.display = "grid";
}

confirmNo.onclick = function() {
  // Add your logic here if the user cancels the order
  modal.style.display = "none";
}
