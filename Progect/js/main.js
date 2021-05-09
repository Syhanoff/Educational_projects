$(document).ready(function() {
   console.log('ready');
})




const anchors = document.querySelectorAll('.offer-wrapper__btn-box a[href="#collection"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
  e.preventDefault()
   
  const blockID = anchor.getAttribute('href').substr(1)
   
  document.getElementById(blockID).scrollIntoView({
  behavior: 'smooth',
  block: 'start'
  })
  })
}