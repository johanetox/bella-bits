$(function() {

  console.log( "johaneto@cookdev.com" )

  /* Begining smooth scroll */
  /* toma todos los anchors y si su href coincide con el de un Id en
   especifico hace smooth scroll hasta él*/
  $('a[href*="#"]')
    .not('[href="#"]')
    .click(function(e) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        let target = $(this.hash)
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
        if (target.length) {
          e.preventDefault()
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            let $target = $(target)
            $target.focus()
            if ($target.is(":focus")) {
              return false
            } else {
              $target.attr('tabindex','-1')
              $target.focus()
            }
          })
        }
      }
    })
  /* Ending smooth scroll */

  /* Begining contact box toggle */
  let opened = false

  /* ToggleSlider() Checkea primero si el contact form está abierto y lo abre o cierra */
  function ToggleSlider(e) {
    e.preventDefault()
    if (opened) {
      $("#contact-layer").fadeOut("fast")
      $("#contact").animate({
        right: '-320px'
      }, "slow")

    } else {

      $("#contact").animate({
          right: '0'
        }, "slow")
      $("#contact-layer").fadeIn("slow")

    }

    opened = !opened
  }

  /* Presiona esc para cerrar el formulario */
  $(document).on('keyup',function(e) {
    if (e.keyCode == 27 && opened) {
      $("#contact-layer").fadeOut("fast")
      $("#contact").animate({
        right: '-320px'
      }, "slow")
    }
    opened = !opened
  })

  /* recorre todos los elementos que tengan ".js-toggle-contact"
  como clase y les agrega el event listener con la función ToggleSlider()*/
  $( ".js-toggle-contact" ).each( function( index, element ){
    $(this).on("click", ToggleSlider)
  })
  /* Ending contact box toggle */

  /* Begining contact form date formating */
  $(".js-date").flatpickr({
    minDate: "today",
    dateFormat: "l, F m",
    wrap: true
  })
  /* Ending contact form date formating */

  /* Begining contact form validation */
  $("#contact-form").validate({
    rules: {
      adult_guest: "required",
      departure_date: "required",
      arrival_date: "required"

    },
    messages: {
      adult_guest: "Please add at least one adult",
      departure_date: "Please chose a departure date",
      arrival_date: "Please chose a arrival date"
    }
  })
  /* Ending contact form validation */

})
