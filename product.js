var product_code = "";
var select_size;
 var trimirror_clientId = clientId;
    var trimirror_sizes = [];
    var shotUrls = "https://widget.trimirror.com/GetShotUrls?clientId=" + trimirror_clientId + "&code=#code#&color=#color#&size=#size#&width=#width#&height=#height#&userId=#userId#&jpg";
    var shareLink = "https://widget.trimirror.com/VendorSharing/#shareType#?clientId=" + trimirror_clientId + "&link=#link#&items=#items#";
    var trimirror_url = "https://widget.trimirror.com";
    var video_urls = "https://widget.trimirror.com/GetVideoUrls";
    var video_progress = "https://widget.trimirror.com/GetVideoWithProgress";
    var addToFavorites = "https://widget.trimirror.com/AddFavorites?clientId=" + trimirror_clientId
    
    $(function () {
    	$(".sqs-block-code .sqs-block-content").append('<div id="side-by-side" class="side-by-side-container"><div class="side-by-side"><div style="height:100% !important" class="image_container" id="first_side" style="z-index:1"><div class="side-by-side-loading"><div class="timer-loader"></div></div><div class="side-by-side-content"><div class="side-by-side-size"><span>M</span></div></div></div><div style="height:100% !important" class="image_container" id="second_side"><div class="side-by-side-loading"><div class="timer-loader"></div></div><div class="side-by-side-content"><div class="side-by-side-size active"><span>M</span></div></div></div><div style="height:100% !important" class="image_container" id="last_side" style="z-index:1"><div class="side-by-side-loading"><div class="timer-loader"></div></div><div class="side-by-side-content"><div class="side-by-side-size"><span>M</span></div></div></div><div id="side_by_side_slider" class="flexslider flexslider-nopager"><ul class="slides"><li class="first_li flex-active-slide" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item;"><div class="first">&nbsp;<img class="big" src=""></div><div class="second"><img class="big" src=""><a class="side-by-side-map" href="#"><img class="tension" src=""></a></div><div class="last"><img class="big" src=""></div></li><li class="second_li" style="width: 100%; float: left; margin-right: -100%; position: relative;"><div class="first">&nbsp;<img class="big" src=""></div><div class="second"><img class="big" src=""><a class="side-by-side-map" href="#"><img class="tension" src=""></a></div><div class="last"><img class="big" src=""></div></li><li class="last_li" style="width: 100%; float: left; margin-right: -100%; position: relative;"><div class="first">&nbsp;<img class="big" src=""></div><div class="second"><img class="big" src=""><a class="side-by-side-map" href="#"><img class="tension" src=""></a></div><div class="last"><img class="big" src=""></div></li></ul><ul class="flex-direction-nav"><li><a href="#" class="flex-prev">Previous</a></li><li><a href="#" class="flex-next">Next</a></li></ul></div><a href="#" id="side-by-side-close" class="side-by-side-close"></a><div style="right:1% !important;left:auto !important;bottom:0 !important;line-height:21px;" class="trimirror_logo"><a class="touch_click" href="http://trimirror.com" target="_blank"><div><span>powered by</span><span>tri</span><span>Mirror</span></div></a></div></div></div>');
    	$(".sqs-block-code .sqs-block-content").append('<div id="catwalk-wrapper" class="mfp-hide"><div id="catwalk-preloader"></div><video id="video1" width="640" height="480" autobuffer preload="auto" controls style="display:none;"><source type="video/mp4">Your browser does not support the HTML5 video.</video><video id="video2" width="640" height="480" autobuffer preload="auto" controls style="display:none;"><source type="video/mp4">Your browser does not support the HTML5 video.</video></div>');
  	$('<div id="measurements_values"><table><tr><td><span>my measurements:</span></td><td class="link"><a href="/my-avatar" class="touch_click">change</a></td></tr><tr><td style="padding-bottom:5px;"><span id="measurement_value"></span></td><td></td></tr></table></div>').insertAfter($("#productSlideshow .slide>div"));
    	$('<div class="legend"><span class="tight">too tight</span><span class="loose">loose</span></div>').insertAfter($("#productSlideshow .slide>div").first());
    	$('<div class="timer_container"><div class="timer-loader" style="display:none;"></div></div>').insertAfter($("#productSlideshow .slide>div").first());
	var content = '';
	var counter = 1;
	for (var i = 1; i <= 6; i++)
        {
        	content += '<div class="slide trimirror_slide" data-target="' + counter + '"><img src="http://static1.squarespace.com/static/573ff47b2eeb81d00cc8aea3/t/574e759ab6aa6043148aa31a/1464759706766/spin.gif" data-load="false" data-src="http://static1.squarespace.com/static/573ff47b2eeb81d00cc8aea3/t/574e759ab6aa6043148aa31a/1464759706766/spin.gif" data-image="http://static1.squarespace.com/static/573ff47b2eeb81d00cc8aea3/t/574e759ab6aa6043148aa31a/1464759706766/spin.gif" data-image-dimensions="373x585" data-image-focal-point="0.5,0.5" alt=""><div class=""></div></div>';
                counter++;
	}
	$("#productThumbnails").append(content);
	$("#productThumbnails").append('<div class="slide"><a class="catwalk catwalk_movie" href="#" title="View catwalk" style="margin-left:16px;" onclick="openPopup();return false;"></a></div>');
	//$(content).insertAfter();
    	$('<div><button class="sqs-suppress-edit-mode sqs-editable-button" id="add-to-favorites"><div class="sqs-add-to-cart-button-inner" id="yui_3_17_2_3_1463297059130_2963">Add to Dressing Room</div></button></div>').insertAfter($(".sqs-add-to-cart-button-wrapper"));
    	$("#add-to-favorites").click(function(){
    		AddToFavorites();
    	});
    	$(".chosen-container").hide();
    	$("select[data-variant-option-name='Size']").show();
    	var link = window.location.href.split('/');
    	var name = link[link.length - 1];
        trimirror_code = name.split('?')[0];
        alert(trimirror_code);
        product_code = trimirror_code;
        shotUrls = shotUrls.replace("#code#", trimirror_code);
        trimirror_name = $("h1.product-title").html();
        trimirror_size = $("select[data-variant-option-name='Size']").val();
        trimirror_color = ""; //$("#color").val();
	for (var i = 0; i < $("select[data-variant-option-name='Size'] option").length; i++) {
		var size = $($("select[data-variant-option-name='Size'] option")[i]).val();
		if(!!size && size.length > 0)
			trimirror_sizes.push({ "Name": size, "Title": size });	
        }        
        /*$("#color").change(function () {
            trimirror_color = $("#color").val();
        });*/
        $("select[data-variant-option-name='Size']").change(function () {
            trimirror_size = $("select[data-variant-option-name='Size']").val();
        });
        // Update pictures if color or size are changed
        //$("#color").chosen().change(function () { updatePictures(); });
        $("select[data-variant-option-name='Size']").chosen({disable_search: true}).change(function () { updatePictures(); });
        $(".chosen-results li").first().hide();

        // Hide preloader after image load
        $(".thumbnailSlider .slides img")
            .load(function () {
                if ($(this).parent().parent().hasClass("flex-active-slide"))
                    $("#preloader").hide();
            });
        // Hide preloader at first image load
        $(".thumbnailSlider .slides img:first")
            .load(function () {
                $("#preloader").hide();
            });
        var img = $(".thumbnailSlider .slides img")[0];
        if (IsImageOk(img)) {
            $("#preloader").hide();
            $(".smallThumbnails li[data-target='1']").click();
        }


        // Hide preloader when everything is loaded
        //$(window).load(function() { $("#preloader").hide() });

        $(".smallThumbnailsImage").click(function () {
            if ($(this).attr("data-legend") == "true") {
                $(".legend").show();
            }
            else {
                $(".legend").hide();
            }
        });

        $.ajax({
            url: ("https://widget.trimirror.com/GetMeasurements?clientId=" + trimirror_clientId + "&userId=#userId#").replace("#userId#", GetUserId()),
            dataType: "jsonp",
            data: {},
            method: "POST",
            success: function (data) {
                if (data.isSuccess) {
                    var result = "";
                    for (var i = 0; i < data.measurements.length; i++) {
                        var group = data.measurements[i];
                        if ("Basic" === group.Name) {
                            for (var j = 0; j < group.Measurements.length; j++) {
                                var measurement = group.Measurements[j];
                                if (measurement.Name == "bust" || measurement.Name == "waist1" || measurement.Name == "hips1") {
                                    result += GetText(measurement.Value, measurement.Name) + "-";
                                }
                            }
                        }
                    }
                    $("#measurements_values #measurement_value").html(result.substring(0, result.length - 1));
                    $("#measurements_values").show();
                }
            }
        });

        $.ajax({
            url: ("https://widget.trimirror.com/GetBestSize?clientId=" + trimirror_clientId + "&code=#code#&color=#color#&size=#size#&userId=#userId#").replace("#code#", trimirror_code).replace("#color#", trimirror_color).replace("#size#", trimirror_size).replace("#userId#", GetUserId()),
            dataType: "jsonp",
            success: function (data) {
                console.dir(data);
                if (data.isSuccess) {
                    console.log(data.size);
                    console.log($("select[data-variant-option-name='Size']"));
                    $("select[data-variant-option-name='Size']").val(data.size.toUpperCase());
                    $("select[data-variant-option-name='Size']").trigger("chosen:updated");
                    updatePictures(true);
                }
            }
        });
        $(".flex-next, .flex-prev").html("");
    });

function AddToFavorites(){
		var code = $("#trimirror_product_code").val();
		var color = "";
		var size = $("select[data-variant-option-name='Size']").val();
		var title = $("#productDetails h1").html();
		var price = parseFloat($(".sqs-money-native").html()) * 100;
		var imgUrl = $("#productThumbnails img").first().attr("data-image");
		$.ajax({
			url: addToFavorites,
			data: "code=" + code + "&color=" + color + "&size=" + size + "&userId=" + GetUserId() + "&title=" + encodeURI(title) + "&price=" + price + "&imgUrl=" + encodeURI(imgUrl) + "&productUrl=" + encodeURI(window.location.href),
			method: "post",
			dataType: "jsonp",
			success: UpdateFavorites,
			error: function (data) {
				console.log("ERROR in /Favorites/AddToFavoritesAjax");
				console.log(data);
				alert("An error occured. Refresh the page and try again.");
			}
		});
}

    function updatePictures(addTime) {
        $(".timer_container .timer-loader").show();
        addTime = typeof addTime !== 'undefined' ? addTime : false;
        //$("#preloader").show();
        var color = "";
        var size = $("select[data-variant-option-name='Size']").val();

        // Avatar pictures
        var templateUrl = "https://widget.trimirror.com/GetShotUrls?clientId=" + clientId + "&code=" + product_code + "&color=#color#&size=#size#&width=#width#&height=#height#&userId=#userId#&jpg";
	//373x585
        var currentUrl = templateUrl.replace("#color#", color).replace("#size#", size).replace("#userId#", GetUserId());
        var url = currentUrl.replace("#width#", "534").replace("#height#", "711");
        $.ajax({
            url: url,
            data: {},
            dataType: "jsonp",
            success: function (data) {
                if (data.isSuccess) {
                    for (var i = 0; i < data.urls.length; i++) {
                        var urlImage = data.urls[i];
                        $(".trimirror_slide[data-target='" + (i + 1) + "'] img:first").attr("data-src", urlImage);
                        $(".trimirror_slide[data-target='" + (i + 1) + "'] img:first").attr("data-image", urlImage);
                    }
                    $(".timer_container .timer-loader").hide();
                    //$("#preloader").hide();
                }
            }
        });
        url = currentUrl.replace("#width#", "50").replace("#height#", "79");
        $.ajax({
            url: url,
            data: {},
            dataType: "jsonp",
            success: function (data) {
                if (data.isSuccess) {
                    for (var i = 0; i < data.urls.length; i++) {
                        var urlImage = data.urls[i];
                        $(".trimirror_slide[data-target='" + (i + 1) + "'] img:first").attr("src", urlImage);
                    }
                    $(".trimirror_slide").show();
                      //Y.trigger("domready");
                }
            }
        });
    }

    function IsImageOk(img) {
        if (!img || !img.complete) {
            return false;
        }

        if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
            return false;
        }
        return true;
    }
