var toggle;

$("#ui-toggle").click(function() {
    if (toggle) {
        $("#ui, #cover, #ui-toggle").animate({
            "margin-left": ""
        }, 400, "swing", function() {
            $(this).find("i").removeClass("fa-caret-right").addClass("fa-caret-left");
        });
    } else {
        $("#ui, #cover, #ui-toggle").animate({
            "margin-left": "-21.5em"
        }, 400, "swing", function() {
            $(this).find("i").removeClass("fa-caret-left").addClass("fa-caret-right");
        });
    }
    
    toggle = !toggle;
});
