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

    	var link = window.location.href.split('/');
    	var name = link[link.length - 1];
        trimirror_code = name.split('?')[0];
        
        var data = {Data: []};
        data.Data.push({
        	code: trimirror_code,
        	color: "",
        	size: ""
        });
        $.ajax({
            url: ("https://widget.trimirror.com/CheckItems?clientId=" + trimirror_clientId),
            dataType: "jsonp",
            data: {data: JSON.stringify(data)},
            method: "POST",
            success: function (result) {
            	if(result.data[0].available){
                	UpdatePage();
            	}
            	else {
            		//$("select[data-variant-option-name='Size']").chosen({disable_search: true}).change(function () { $("select[data-variant-option-name='Size'] option[value='" + $("select[data-variant-option-name='Size']").val() + "']").click(); });
            	}
            }
        });         
                
    });
    
    function updateSelectedValue(){
            var itemsJson = JSON.parse($(".product-variants").attr("data-variants"));
            for(var i = 0; i < itemsJson.length; i++){
            	var item = itemsJson[i];
            	if(!!item.attributes && !!item.attributes.Size 
            		&& item.attributes.Size == trimirror_size && ((!!item.attributes.Color && item.attributes.Color == trimirror_color) || !item.attributes.Color)){
            		$(".product-variants").attr("data-selected-variant", JSON.stringify(item));
            	}
            }    	
    }
    
    
    function UpdatePage() {
    	$("#productSummary").append('<div id="side-by-side" class="side-by-side-container"><div class="side-by-side"><div style="height:100% !important" class="image_container" id="first_side" style="z-index:1"><div class="side-by-side-loading"><div class="timer-loader"></div></div><div class="side-by-side-content"><div class="side-by-side-size"><span>M</span></div></div></div><div style="height:100% !important" class="image_container" id="second_side"><div class="side-by-side-loading"><div class="timer-loader"></div></div><div class="side-by-side-content"><div class="side-by-side-size active"><span>M</span></div></div></div><div style="height:100% !important" class="image_container" id="last_side" style="z-index:1"><div class="side-by-side-loading"><div class="timer-loader"></div></div><div class="side-by-side-content"><div class="side-by-side-size"><span>M</span></div></div></div><div id="side_by_side_slider" class="flexslider flexslider-nopager"><ul class="slides"><li class="first_li flex-active-slide" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item;"><div class="first">&nbsp;<img class="big" src=""></div><div class="second"><img class="big" src=""><a class="side-by-side-map" href="#"><img class="tension" src=""></a></div><div class="last"><img class="big" src=""></div></li><li class="second_li" style="width: 100%; float: left; margin-right: -100%; position: relative;"><div class="first">&nbsp;<img class="big" src=""></div><div class="second"><img class="big" src=""><a class="side-by-side-map" href="#"><img class="tension" src=""></a></div><div class="last"><img class="big" src=""></div></li><li class="last_li" style="width: 100%; float: left; margin-right: -100%; position: relative;"><div class="first">&nbsp;<img class="big" src=""></div><div class="second"><img class="big" src=""><a class="side-by-side-map" href="#"><img class="tension" src=""></a></div><div class="last"><img class="big" src=""></div></li></ul><ul class="flex-direction-nav"><li><a href="#" class="flex-prev">Previous</a></li><li><a href="#" class="flex-next">Next</a></li></ul></div><a href="#" id="side-by-side-close" class="side-by-side-close"></a><div style="right:1% !important;left:auto !important;bottom:0 !important;line-height:21px;" class="trimirror_logo"><a class="touch_click" href="http://trimirror.com" target="_blank"><div><span>powered by</span><span>tri</span><span>Mirror</span></div></a></div></div></div>');
    	$("#productSummary").append('<div id="catwalk-wrapper" class="mfp-hide"><div id="catwalk-preloader"></div><video id="video1" width="640" height="480" autobuffer preload="auto" controls style="display:none;"><source type="video/mp4">Your browser does not support the HTML5 video.</video><video id="video2" width="640" height="480" autobuffer preload="auto" controls style="display:none;"><source type="video/mp4">Your browser does not support the HTML5 video.</video></div>');
    	
	var content = '';
	var contentBig = '';
	var contentSmall = '<div class="trimirror_block"><div class="header"><span class="header_text">Virtual fitting</span><div class="measurements"><span class="text">My measurements:</span><span id="measurements_value" class="measurements_value"></span><a href="/my-avatar" title="My Avatar">change</a></div></div><div class="images">';
	var counter = 1;
	for (var i = 1; i <= 6; i++)
        {
        	contentSmall += '<div class="slide dop_slide" data-target="' + counter + '"><a href="#"><img src="" /></a><div class=""></div></div>';
        	content += '<div class="slide trimirror_slide click_event content-fill" data-target="' + counter + '"><img src="http://static1.squarespace.com/static/573ff47b2eeb81d00cc8aea3/t/574e759ab6aa6043148aa31a/1464759706766/spin.gif" data-load="false" data-src="" data-image="" data-image-dimensions="373x585" data-image-focal-point="0.5,0.5" alt=""><div class=""></div></div>';
        	contentBig += '<div class="slide trimiror_big_slide" data-target="' + counter + '"><img class="image_big" data-load="false" data-src="" data-image="" data-image-dimensions="500x910" data-image-focal-point="0.5,0.5" alt=""><div class=""></div></div>';
                counter++;
	}
	contentSmall += '<div class="slide video_view"><a class="catwalk catwalk_movie" href="#" title="View catwalk" style="margin-left:16px;" onclick="openPopup();return false;"></a></div>';
	contentSmall += "</div>";
	contentSmall += '<div class="buttons"><div><button class="sqs-suppress-edit-mode sqs-editable-button" id="side-by-side-button"><div class="sqs-add-to-cart-button-inner">Compare side-by-side</div></button><button class="sqs-suppress-edit-mode sqs-editable-button" id="add-to-favorites"><div class="sqs-add-to-cart-button-inner">Add to Dressing Room</div></button></div></div>';
	contentSmall += "</div>";
	$(contentSmall).insertBefore($(".product-quantity-input"));
	$("#productThumbnails").append(content);
	//$("#productThumbnails").append('');
	$("#productSlideshow").append(contentBig);
	$("#productSlideshow").parent().append('<div id="trimirror_logo" style="background-position:63px 0 !important;display:none;z-index:889;-webkit-transform: rotate(270deg);-moz-transform: rotate(270deg);-o-transform: rotate(270deg);-ms-transform: rotate(270deg);transform: rotate(270deg);left:-10% !important;bottom:15% !important;line-height:21px;" class="trimirror_logo"><a class="touch_click" href="http://trimirror.com" target="_blank"><div><span>powered by</span><span>tri</span><span>Mirror</span></div></a></div>');
  	//$("#productSlideshow").parent().append('<div id="measurements_values"><table><tr><td><span>my measurements:</span></td><td class="link"><a href="/my-avatar" class="touch_click">change</a></td></tr><tr><td style="padding-bottom:5px;"><span id="measurement_value"></span></td><td></td></tr></table></div>');
    	$("#productSlideshow").parent().append('<div class="legend"><span class="tight">too tight</span><span class="loose">loose</span></div>');
    	$("#productSlideshow").parent().append('<div class="timer_container"><div class="timer-loader" style="display:none;"></div></div>');
	//$(content).insertAfter();
    	//$('').insertAfter($(".sqs-add-to-cart-button-wrapper"));
    	$("#add-to-favorites").click(function(){
    		AddToFavorites();
    	});
    	
    	//Update all
	UpdateSideBySide();
	YoutubeShare();

    	$("select[data-variant-option-name='Size']").show();    
        product_code = trimirror_code;
        shotUrls = shotUrls.replace("#code#", trimirror_code);
        trimirror_name = $("h1.product-title").html();
        trimirror_size = $("select[data-variant-option-name='Size']").val();
        $("select[data-variant-option-name='Size'] option").first().hide();
        trimirror_color = ""; //$("#color").val();
        if($("select[data-variant-option-name='Color']").length){
        	$("select[data-variant-option-name='Color'] option").first().hide();
        	$("select[data-variant-option-name='Color']").val($("select[data-variant-option-name='Color'] option:first").val());
        	trimirror_color = $("select[data-variant-option-name='Color']").val();
        	$("select[data-variant-option-name='Color']").change(function () {
            		trimirror_color = $("select[data-variant-option-name='Color']").val();
            		updatePictures();
            		updateSelectedValue();
        	});  
        }
        
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
        	updatePictures();
		updateSelectedValue();
        });
        // Update pictures if color or size are changed
        /*$("select[data-variant-option-name='Size']").chosen({disable_search: true}).change(function () {  });
        $(".chosen-results li").first().hide();*/
 
        //$("#color").chosen().change(function () { updatePictures(); });

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
        
        $(".slide.content-fill").click(function(){
        	if($(this).hasClass("click_event")){
        		$(".legend").show();
        		$("#trimirror_logo").show();
        	} else if(!$(this).hasClass("video_view")){
        		$(".legend").hide();
        		$("#trimirror_logo").hide();
        		if ((navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)) {
        			$("#productSlideshow .trimiror_big_slide").animate({ opacity: "0", filter: "alpha(opacity=0)" }, 500);
        		} else if(navigator.userAgent.indexOf("MSIE ") != -1){
        			$("#productSlideshow .slide").show();
        			$("#productSlideshow .trimiror_big_slide").fadeOut(500);
        		}
        	}
        });

        $(".dop_slide a").click(function(){
        	var target = $(this).parent().attr("data-target");
        	if ((navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)) {
        		$("#productSlideshow .slide").animate({ opacity: "0", filter: "alpha(opacity=0)" }, 500);
        		$(".slide.trimiror_big_slide[data-target='" + target + "']").stop().animate({ opacity: "100", filter: "alpha(opacity=100)" }, 500);
        	} else if(navigator.userAgent.indexOf("MSIE ") != -1){
        		$("#productSlideshow .slide").fadeOut(500, function(){
        			$(".slide.trimiror_big_slide[data-target='" + target + "']").fadeIn(500);
        		});
        	}
       		$(".click_event[data-target='" + target + "']").trigger("click");
        	return false;
        });


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
                    $("#measurements_value").html(result.substring(0, result.length - 1));
                    $(".trimirror_block .measurements").show();
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
                    $("select[data-variant-option-name='Size']").trigger("change");
                    updatePictures(true);
                }
            }
        });
        $(".flex-next, .flex-prev").html("");
    }

function AddToFavorites(){
		var code = trimirror_code;
		var color = trimirror_color;
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
        var color = trimirror_color;
        var size = $("select[data-variant-option-name='Size']").val();

        // Avatar pictures
        var templateUrl = "https://widget.trimirror.com/GetShotUrls?clientId=" + clientId + "&code=" + product_code + "&color=#color#&size=#size#&width=#width#&height=#height#&userId=#userId#&jpg";
	//373x585
        var currentUrl = templateUrl.replace("#color#", color).replace("#size#", size).replace("#userId#", GetUserId());
        var url = currentUrl.replace("#width#", $("#productSlideshow").width()).replace("#height#", $("#productSlideshow").height());
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
                        $(".trimiror_big_slide[data-target='" + (i + 1) + "'] img:first").attr("data-src", urlImage);
                        $(".trimiror_big_slide[data-target='" + (i + 1) + "'] img:first").attr("data-image", urlImage);
                        $(".trimiror_big_slide[data-target='" + (i + 1) + "'] img:first").attr("src", urlImage);
                        
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
                        $(".dop_slide[data-target='" + (i + 1) + "'] img:first").attr("src", urlImage);
                    }
                    $(".trimirror_block").show();
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
