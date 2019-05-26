//Js
 
//ejecutamos todo esto cuando la pagina se halla cargado :D
                $(document).ready(function() {

//hacemos que sirva el boton del menu movil
        $('#boton-menu-movil').click( function() {
        $('nav ul').slideToggle(200);
        })

});

//Scroll Up
$(document).ready(function(){
  
        $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
        });
  
        $('.scrollup').click(function(){
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });
  
    });