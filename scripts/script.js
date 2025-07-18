$(document).ready(function(){
    selection = "";
    image_displayed = "";
    $("a[data-toggle]").click(function(event) {
        event.preventDefault();
        if(location.hash.split(":")[1]){
            history.replaceState({}, '', location.hash.split(":")[0] + ":" + $(this).attr("href"));
        } else {
            history.replaceState({}, '', "#" + ":" + $(this).attr("href"));
        }
    });

    $(".cat-menu:not(.both)").click(function(event) {
        console.log("paaasS");
        if(selection != $(this).data("cible")) {
            event.preventDefault();
            if(location.hash.split(":")[1]){
                history.replaceState({}, '', $(this).data("cible") + ":" + location.hash.split(":")[1]);
            } else {
                history.replaceState({}, '', $(this).data("cible"));
            }
            selection = $(this).data("cible");
            $(".submenu-group").slideUp("slow");
            $(selection).slideDown( "slow");
        }
    });
    $(".submenu:not(.both)").click(function() {
        $(".submenu").removeClass("light-grey");
        $(this).addClass("light-grey");
        subcat = location.hash.split(":")[1];
        $(subcat + " .images").slick("slickGoTo", 1);
        $(subcat + " .images").slick("slickGoTo", 0);
    });

    $(".both").click(function(event) {
        $(".submenu").removeClass("light-grey");
        $(this).addClass("light-grey");
        history.replaceState({}, '', "#" + ":" + $(this).data("cible"));
        selection = $(this).data("cible");
        $(".submenu-group").slideUp("slow");
    });

    $(".nail").click(function() {
        subcat = location.hash.split(":")[1];
        $(subcat + " .nail").removeClass("current-nail");
        $(this).addClass("current-nail");
        $(subcat + " .images").slick("slickGoTo", $(this).data("nb"));
    });

    $('.images').slick({
        autoplay: false,
        waitForAnimate: false,
        autoplaySpeed: 6000,
        fade: true,
        pauseOnHover: false,
        speed: 1000,
    });
    $('.central-img').slick({
        autoplay: true,
        waitForAnimate: false,
        autoplaySpeed: 6000,
        fade: true,
        pauseOnHover: false,
        speed: 1000,
    });
    if(location.hash) {
        var categorie = location.hash.split(":")[0];
        var subcat = location.hash.split(":")[1];
        $(".cat-menu[data-cible=" + categorie + "]").click();
        if(subcat) {
            $('a[href=' + subcat + ']').tab('show');
            $('a[href=' + subcat + ']').addClass("light-grey");
        }
    } else {
        $('#tab-links a:first').tab('show');
    }

    $(".nail[data-nb=0]").addClass("current-nail");
    
    // Mobile Navigation Functionality
    $("#mobile-nav-toggle").click(function() {
        $("#mobile-nav").toggleClass("open");
        
        // Animate hamburger lines
        var $lines = $(this).find(".hamburger-line");
        if ($("#mobile-nav").hasClass("open")) {
            $lines.eq(0).css('transform', 'rotate(45deg) translate(3px, 3px)');
            $lines.eq(1).css('opacity', '0');
            $lines.eq(2).css('transform', 'rotate(-45deg) translate(4px, -4px)');
        } else {
            $lines.css({
                'transform': 'none',
                'opacity': '1'
            });
        }
    });
    
    // Close mobile nav when clicking on a link
    $(".mobile-nav-item").click(function() {
        $("#mobile-nav").removeClass("open");
        var $lines = $("#mobile-nav-toggle").find(".hamburger-line");
        $lines.css({
            'transform': 'none',
            'opacity': '1'
        });
        
        // Handle navigation logic for mobile links
        var href = $(this).attr("href");
        if (href && href.startsWith("#")) {
            // Trigger the same logic as desktop navigation
            $('a[href="' + href + '"]').not('.mobile-nav-item').trigger('click');
        }
    });
    
    // Close mobile nav when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.mobile-header').length && !$(event.target).closest('#mobile-nav').length) {
            $("#mobile-nav").removeClass("open");
            var $lines = $("#mobile-nav-toggle").find(".hamburger-line");
            $lines.css({
                'transform': 'none',
                'opacity': '1'
            });
        }
    });
});
