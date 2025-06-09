var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// To open and close menu
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}

function closemenu() {
  sidemenu.style.right = "-200px";
}

// To connect the contact form with google sheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbzL62a_GhitOWBRln_6IAg14ULrwSiOsZ_vylN4JmA2WmCd2O-FJpjMEdU4-61TectWig/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")
const submitBtn = form.querySelector('button[type="submit"]')

form.addEventListener('submit', e => {
  e.preventDefault()

  // Show loader and disable button
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...'
  submitBtn.disabled = true
  msg.innerHTML = ""

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      // Reset button
      submitBtn.innerHTML = 'Submit'
      submitBtn.disabled = false

      // Show success message
      msg.innerHTML = "Message sent successfully."
      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000)
      form.reset()
    })
    .catch(error => {
      console.error('Error!', error.message)

      // Reset button
      submitBtn.innerHTML = 'Submit'
      submitBtn.disabled = false

      // Show error message
      msg.innerHTML = "Failed to send message. Please try again."
      msg.style.color = "#ff004f"
      setTimeout(function () {
        msg.innerHTML = "";
        msg.style.color = "#61b752"
      }, 5000)
    })
})