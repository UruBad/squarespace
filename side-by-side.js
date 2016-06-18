var updateSize = "";
var startSize = "";
var sideBySideImages = [];
var flexslider = null;
var isTension = true;

function UpdateSideBySide() {
    //$('<div><button class="sqs-suppress-edit-mode sqs-editable-button" id="side-by-side-button"><div class="sqs-add-to-cart-button-inner" id="yui_3_17_2_3_1463297059130_2963">Compare side-by-side</div></button></div>').insertAfter($(".sqs-add-to-cart-button-wrapper"));
    $("#side-by-side-button").click(function () {
        $("#side-by-side").fadeIn("slow");
        startSize = $("select[data-variant-option-name='Size'] option:selected").val();
        UpdateSizes(startSize);
    });
    $(".side-by-side-size:not(.active)").click(function () {
        UpdateSizes($(this).attr("data-size"));
    });
    $("#side-by-side-close").click(function () {
        $('#side-by-side').fadeOut('slow');
        if (updateSize != startSize) {
            $("select[data-variant-option-name='Size']").val(updateSize);
            $("select[data-variant-option-name='Size']").trigger("change");
        }
        return false;
    });
    $("#side_by_side_slider .side-by-side-map").on("click toucnstart", function () {
        isTension = !isTension;
        $('#side_by_side_slider').flexslider(0);
        $('#side_by_side_slider').flexslider("play");
        UpdateSizes(updateSize);
        return false;
    });
    $("#side_by_side_slider").flexslider({
        controlNav: false,
        smoothHeight: false,
        slideshow: true,
        animationSpeed: 1000,
        slideshowSpeed: 6000,
        directionNav: true,
        touch: true,
        pausePlay: true
    });
    $('.flex-next, .flex-prev').html('');
    $("#side_by_side_slider img.big").click(function(){
        var size = $(this).attr("data-size");
        if(!!size){
            UpdateSizes($(this).attr("data-size"));
        }
    });
}

function UpdateSizes(current_size) {
    var sizeIndex = -1;
    console.log(trimirror_sizes);
    for (var i = 0; i < trimirror_sizes.length; i++) {
        if (trimirror_sizes[i].Name == current_size) {
            sizeIndex = i;
            break;
        }
    }
    if (sizeIndex > -1) {
        updateSize = current_size;
        $("#side_by_side_slider").hide();
        if (sizeIndex == 0) {
            $("#first_side .side-by-side-content").hide();
            $("#side_by_side_slider div.first img").hide();
            $("#first_side .side-by-side-loading").hide();
            $("#first_side").attr("style", "z-index:1");
            $("#first_side .side-by-side-size").hide();
            
        }
        else {
            $("#first_side .side-by-side-size").show();
            $("#first_side").attr("style", "");
            $("#first_side .side-by-side-content").show();
            $("#side_by_side_slider div.first img").show();
            $("#first_side .side-by-side-size span").html(trimirror_sizes[sizeIndex - 1].Title);
            $("#first_side .side-by-side-size").attr("data-size", trimirror_sizes[sizeIndex - 1].Name);
            $("#first_side .side-by-side-loading").show();
            GetShotUrlsSideBySide(trimirror_sizes[sizeIndex - 1].Name, "first_side", ".first");
        }
        $("#second_side .side-by-side-size span").html(trimirror_sizes[sizeIndex].Title);
        GetShotUrlsSideBySide(trimirror_sizes[sizeIndex].Name, "second_side", ".second");

        if (sizeIndex == trimirror_sizes.length - 1) {
            $("#last_side .side-by-side-content").hide();
            $("#side_by_side_slider div.last img").hide();
            $("#last_side .side-by-side-loading").hide();
            $("#last_side").attr("style", "z-index:1");
        }
        else {
            $("#last_side").attr("style", "");
            $("#last_side .side-by-side-content").show();
            $("#side_by_side_slider div.last img").show();
            $("#last_side .side-by-side-size span").html(trimirror_sizes[sizeIndex + 1].Title);
            $("#last_side .side-by-side-size").attr("data-size", trimirror_sizes[sizeIndex + 1].Name);
            $("#last_side .side-by-side-loading").show();
            GetShotUrlsSideBySide(trimirror_sizes[sizeIndex + 1].Name, "last_side", ".last");
        }
    }
}

function GetShotUrlsSideBySide(size, container, container2) {
    var item = CheckImages(size);
    if (item == null) {
        var color = trimirror_color;
        var currentUrl = shotUrls.replace("#color#", color).replace("#size#", size).replace("#userId#", GetUserId());
        var url = currentUrl.replace("#width#", Math.ceil($("#" + container).width())).replace("#height#", Math.ceil($("#" + container).height()));
        $.ajax({
            url: url,
            data: {},
            dataType: "jsonp",
            success: function (data) {
                if (data.isSuccess) {
                    var item = { color: trimirror_color, size: size, urls: data.urls};
                    sideBySideImages.push(item);
                    UpdateSidebySideContainer(item, container, container2);
                }
            }
        });
    }
    else {
        UpdateSidebySideContainer(item, container, container2);
    }
}

function CheckImages(size){
    var result = null;
    $.each(sideBySideImages, function( index, v ) {
        if(v.color == trimirror_color && v.size == size)
            result = v;
    });
    return result;
}

function UpdateSidebySideContainer(item, container, container2) {
    //$('#' + container + ' .flexslider.flexslider-nopager').removeData("flexslider");
    var data = item.urls;
    var html = "";
    var startIndex = 0;
    var endIndex = 3;
    if (isTension) {
        endIndex = 6;
        startIndex = 3;
    }
    var tension = startIndex + 3;
    if (isTension) {
        tension = startIndex - 3;
    }
    $("#side_by_side_slider .first_li " + container2 + " img.big").attr("src", data[startIndex]);
    $("#side_by_side_slider .first_li " + container2 + " img.tension").attr("src", data[tension]);
    $("#side_by_side_slider .second_li " + container2 + " img.big").attr("src", data[startIndex + 1]);
    $("#side_by_side_slider .second_li " + container2 + " img.tension").attr("src", data[tension]);
    $("#side_by_side_slider .last_li " + container2 + " img.big").attr("src", data[startIndex + 2]);
    $("#side_by_side_slider .last_li " + container2 + " img.tension").attr("src", data[tension]);
    $('#' + container + ' .side-by-side-loading').fadeOut();
    if(container2 == ".first" || container2 == ".last" )    {
        $("#side_by_side_slider .first_li " + container2 + " img.big").attr("data-size", item.size);
        $("#side_by_side_slider .last_li " + container2 + " img.big").attr("data-size", item.size);
        $("#side_by_side_slider .second_li " + container2 + " img.big").attr("data-size", item.size);
    }
    $('#side_by_side_slider').fadeIn();
}
