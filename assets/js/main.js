var hover = {};
var radio = 1;
var src;
var loaded;
var width;
var height;
var ratio;
var option = 2;
var time = 100;
var mouse = {};

$(document).hover(function() {
    hover.a = true;
}, function() {
    hover.a = false;
});

$("#ui").hover(function() {
    hover.b = true;
}, function() {
    hover.b = false;
});

$("#ui-toggle").hover(function() {
    hover.c = true;
}, function() {
    hover.c = false;
});

$("#cover").hover(function() {
    hover.d = true;
}, function() {
    hover.d = false;
});

$('input[type="radio"]').click(function() {
    radio = $('input[type="radio"]:checked').val();
    
    if (radio == 1) {
        $('input[type="file"]').removeAttr("disabled");
        $('input[type="url"]').attr("disabled", "disabled");
    } else {
        $('input[type="file"]').attr("disabled", "disabled");
        $('input[type="url"]').removeAttr("disabled");
    }
});

$('input[type="file"]').change(function(event) {
    if (FileReader && event.target.files && event.target.files[0]) {
        var file = event.target.files[0];
        var reader = new FileReader();
        
        reader.onload = function() {
            src = reader.result;
            $("#preview").attr("src", src);
        }
        
        reader.readAsDataURL(file);
    }
});

$('input[type="url"]').on("input", function() {
    src = $(this).val();
    $("#preview").attr("src", src);
});

$("#preview").load(function() {
    loaded = true;
    $("#width, #height").removeAttr("disabled");
    width = $(this)[0].naturalWidth;
    height = $(this)[0].naturalHeight;
    ratio = width/height;
    $("#width").val(width);
    $("#height").val(height);
}).error(function() {
    loaded = false;
});

$("#width").on("input", function() {
    $(this).val($(this).val().replace(/-/g, ""));
    width = $(this).val();
    
    if ($('input[type="checkbox"]').is(":checked")) {
        height = $(this).val() / ratio;
        $("#height").val(height);
    }
});

$("#height").on("input", function() {
    $(this).val($(this).val().replace(/-/g, ""));
    height = $(this).val();
    
    if ($('input[type="checkbox"]').is(":checked")) {
        width = $(this).val() * ratio;
        $("#width").val(width);
    }
});

$("select").change(function() {
    option = $(this).val();
    
    if (option == 3) {
        $("#time").attr("disabled", "disabled");
    } else {
        $("#time").removeAttr("disabled");
    }
});

$("#time").on("input", function() {
    $(this).val($(this).val().replace(/-/g, ""));
    time = $(this).val();
});

$(document).mousemove(function(event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
});

$(document).mousedown(function(event) {
    mouse.down = true;
});

$(document).mouseup(function(event) {
    mouse.down = false;
});

$(document).click(function() {
    if (option == 3) {
        if (loaded && hover.a && !(hover.b || hover.c || hover.d)) {
            stampImage();
        }
    }
});

var stampImages = function() {
    if (loaded && hover.a && !(hover.b || hover.c || hover.d)) {
        if (option == 1) {
            stampImage();
        } else if (option == 2) {
            if (mouse.down) {
                stampImage();
            }
        }
    }
    
    timeout = setTimeout(stampImages, time);
};

var timeout = setTimeout(stampImages, time);

function stampImage() {
    $("<img>").attr("src", src).css({
        "height": height,
        "left": mouse.x,
        "top": mouse.y,
        "width": width
    }).appendTo(document.body).on("dragstart", function(event) {
        event.preventDefault();
    });
}

$("button").click(function() {
    $('img:not([id="preview"])').remove();
});
