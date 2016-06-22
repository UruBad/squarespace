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
    var defaultAvatar = false;
    
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
            		$(".product-variants").attr("data-unselected-options", "[]");
            		$(".product-variants").attr("data-variant-in-stock", "true");
            	}
            }    	
    }
    
    
    function UpdatePage() {
    	var sideBySideInfo = '<div class="yui3-widget sqs-widget sqs-widgets-confirmation alert shown" style="opacity:0" id="side_by_side_info"><div class="sqs-widgets-confirmation-content clear"><div class="title">Side-by-Side Size Comparison</div><div class="message">Here you can see how different sizes of this garment would fit you. The tension map shows where it\'s tight (in red,) loose (in white). Click on the size on the left or right to move the selected size up or down.</div><div class="buttons"><div class="confirmation-button no-frame confirm" tabindex="3">Got It</div></div></div></div>';
    	$("#productSummary").append('<div id="side-by-side" class="side-by-side-container"><div class="side-by-side"><div style="height:100% !important" class="image_container" id="first_side" style="z-index:1"><div class="side-by-side-loading"><div class="timer-loader"></div></div><div class="side-by-side-content"><div class="side-by-side-size"><span>M</span></div></div></div><div style="height:100% !important" class="image_container" id="second_side"><div class="side-by-side-loading"><div class="timer-loader"></div></div><div class="side-by-side-content"><div class="side-by-side-size active"><span>M</span></div></div></div><div style="height:100% !important" class="image_container" id="last_side" style="z-index:1"><div class="side-by-side-loading"><div class="timer-loader"></div></div><div class="side-by-side-content"><div class="side-by-side-size"><span>M</span></div></div></div><div id="side_by_side_slider" class="flexslider flexslider-nopager"><ul class="slides"><li class="first_li flex-active-slide" style="width: 100%; float: left; margin-right: -100%; position: relative; display: list-item;"><div class="first">&nbsp;<img class="big" src=""></div><div class="second"><img class="big" src=""><a class="side-by-side-map" href="#"><img class="tension" src=""></a></div><div class="last"><img class="big" src=""></div></li><li class="second_li" style="width: 100%; float: left; margin-right: -100%; position: relative;"><div class="first">&nbsp;<img class="big" src=""></div><div class="second"><img class="big" src=""><a class="side-by-side-map" href="#"><img class="tension" src=""></a></div><div class="last"><img class="big" src=""></div></li><li class="last_li" style="width: 100%; float: left; margin-right: -100%; position: relative;"><div class="first">&nbsp;<img class="big" src=""></div><div class="second"><img class="big" src=""><a class="side-by-side-map" href="#"><img class="tension" src=""></a></div><div class="last"><img class="big" src=""></div></li></ul><ul class="flex-direction-nav"><li><a href="#" class="flex-prev">Previous</a></li><li><a href="#" class="flex-next">Next</a></li></ul></div><a href="#" id="side-by-side-close" class="side-by-side-close"></a><div style="right:1% !important;left:auto !important;bottom:0 !important;line-height:21px;z-index:5000" class="trimirror_logo"><a class="touch_click" href="http://trimirror.com" target="_blank"><div><span>powered by</span><span>tri</span><span>Mirror</span></div></a></div></div></div>');
    	$("#side-by-side").append(sideBySideInfo);
    	$("#productSummary").append('<div id="catwalk-wrapper" class="mfp-hide"><div id="catwalk-preloader"></div><video id="video1" width="640" height="480" autobuffer preload="auto" controls style="display:none;"><source type="video/mp4">Your browser does not support the HTML5 video.</video><video id="video2" width="640" height="480" autobuffer preload="auto" controls style="display:none;"><source type="video/mp4">Your browser does not support the HTML5 video.</video></div>');
    	$("#side_by_side_info .confirm").click(function(){
		$("#side_by_side_info").animate({ opacity: "0"}, 500);
		$.cookie('trimirror_show_info', "showed", { expires: 30, path: "/" });
	});
    	
	var content = '';
	var contentBig = '';
	var contentSmall = '<div class="trimirror_block"><div class="header"><span class="header_text">Virtual fitting</span><div class="measurements"><span class="text">My measurements:</span><span id="measurements_value" class="measurements_value"></span><a href="/my-avatar" title="My Avatar">change</a></div></div><div class="images">';
	var counter = 1;
	for (var i = 1; i <= 6; i++)
        {
        	var dopCounter = counter + 3;
        	if(dopCounter > 6)
        		dopCounter = counter - 3;
        	contentSmall += '<div class="slide dop_slide" data-target="' + dopCounter + '"><a href="#"><img src="" /></a><div class=""></div></div>';
        	content += '<div class="slide trimirror_slide click_event content-fill" data-target="' + counter + '"><img src="http://static1.squarespace.com/static/573ff47b2eeb81d00cc8aea3/t/574e759ab6aa6043148aa31a/1464759706766/spin.gif" data-load="false" data-src="" data-image="" data-image-dimensions="373x585" data-image-focal-point="0.5,0.5" alt=""><div class=""></div></div>';
        	contentBig += '<div class="slide trimiror_big_slide" data-target="' + counter + '"><img class="image_big" data-load="false" data-src="" data-image="" data-image-dimensions="500x910" data-image-focal-point="0.5,0.5" alt=""><a class="tension_map" data-tension-id="' + dopCounter + '"><img src="" data-src="" alt=" " /></a><div class=""></div></div>';
                counter++;
	}
	var shareText = encodeURI("Check out the Jean Shop virtual fitting room and customize your own avatar to try on clothes in 3D.");
	contentSmall += '<div class="slide video_view"><a class="catwalk catwalk_movie" href="#" title="View catwalk" style="margin-left:16px;" onclick="openPopup();return false;"></a></div>';
	contentSmall += "</div>";
	contentSmall += '<div class="buttons"><div><button class="sqs-suppress-edit-mode sqs-editable-button" id="side-by-side-button"><div class="sqs-add-to-cart-button-inner">Compare side-by-side</div></button><button class="sqs-suppress-edit-mode sqs-editable-button" id="add-to-favorites"><div class="sqs-add-to-cart-button-inner">Add to Dressing Room</div></button></div></div>';
	contentSmall += '<div class="shop-product-single-social" style="margin-bottom:50px;"><div class="social-widget social-widget-mini social-widget-dark" style="float:right"><ul class="list-inline"><li><a href="https://www.facebook.com/sharer/sharer.php?u=' + window.location.href + '" id="facebook_share" onclick=" window.open(this.href, \'facebook-share\', \'width=580,height=296\'); return false; " rel="nofollow" title="Facebook" class="fb share"> <span class="sr-only">Facebook</span> </a></li>';
	contentSmall += '<li> <a href="http://twitter.com/share?text=' + shareText + '" id="twitter_share" onclick=" window.open(this.href, \'twitter-share\', \'width=550,height=235\'); return false;" rel="nofollow" title=" Share on Twitter" class="tw share"> <span class="sr-only">Twitter</span></a></li>';
	contentSmall += '<li><a href="#" data-href="https://pinterest.com/pin/create/button/?url=' + window.location.href + '&amp;media=#media#" id="pinterest_share" onclick=" window.open(this.href, \'pinterest-share\', \'width=490,height=530\'); return false;" rel="nofollow" title="Pinterest" class="pt share"><span class="sr-only">Pinterest</span></a></li>';
	contentSmall += '<li> <a href="#" id="youtube_share" rel="nofollow" title="Youtube" class="yt share youtube_share"><span class="sr-only">Youtube</span></a><span id="youtube_percent" style="display:none;font-size:16px;"></span></li></ul></div></div>';
	contentSmall += "</div>";
	$(contentSmall).insertBefore($(".product-quantity-input"));
	$("#productThumbnails").append(content);
	//$("#productThumbnails").append('');
	$("#productSlideshow").append(contentBig);
	var contentError = '<div class="yui3-widget sqs-widget sqs-widgets-confirmation alert shown" id="default_avatar_error"><div class="sqs-widgets-confirmation-content clear"><div class="title">Virtual fitting example</div><div class="message">Click here to <a href="/my-avatar">create your avatar</a></div><div class="buttons"><div class="confirmation-button no-frame confirm" tabindex="3">Okay</div></div></div></div>';
	$("#productSlideshow").append(contentError);
	$("#productSlideshow").parent().append('<div id="trimirror_logo" style="background-position:63px 0 !important;display:none;z-index:889;-webkit-transform: rotate(270deg);-moz-transform: rotate(270deg);-o-transform: rotate(270deg);-ms-transform: rotate(270deg);transform: rotate(270deg);left:-10% !important;bottom:15% !important;line-height:21px;" class="trimirror_logo"><a class="touch_click" href="http://trimirror.com" target="_blank"><div><span>powered by</span><span>tri</span><span>Mirror</span></div></a></div>');
  	//$("#productSlideshow").parent().append('<div id="measurements_values"><table><tr><td><span>my measurements:</span></td><td class="link"><a href="/my-avatar" class="touch_click">change</a></td></tr><tr><td style="padding-bottom:5px;"><span id="measurement_value"></span></td><td></td></tr></table></div>');
    	$("#productSlideshow").parent().append('<div class="legend"><span class="tight">too tight</span><span class="loose">loose</span></div>');
    	$("#productSlideshow").parent().append('<div class="timer_container"><div class="timer-loader" style="display:none;"></div></div>');
	//$(content).insertAfter();
    	//$('').insertAfter($(".sqs-add-to-cart-button-wrapper"));
    	$("#add-to-favorites").click(function(){
    		AddToFavorites();
    	});
    	if(navigator.userAgent.indexOf("MSIE ") != -1){
    		$(".trimiror_big_slide").hide();
    	}
    	//Update all
	UpdateSideBySide();
	YoutubeShare();
	
	$(".trimiror_big_slide a").click(function(){
		var target = $(this).attr("data-tension-id");
		$(".dop_slide[data-target='" + target + "'] a").click();
		return false;
	});
	
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
        		} else if(navigator.userAgent.indexOf("MSIE ") != -1 || navigator.userAgent.indexOf('Trident/') > -1 || navigator.userAgent.indexOf('Edge/') > -1){
        			$("#productSlideshow .slide:not(.trimiror_big_slide)").fadeIn(500);
        			$("#productSlideshow .trimiror_big_slide").hide();
        		}
        	}
        });
	$("#default_avatar_error .confirm").click(function(){
		$("#default_avatar_error").animate({ opacity: "0"}, 500);
	});
        $(".dop_slide a").click(function(){
        	var target = $(this).parent().attr("data-target");
        	console.log(navigator.userAgent);
        	if ((navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)) {
        		$("#productSlideshow .slide").animate({ opacity: "0", filter: "alpha(opacity=0)" }, 500);
        		$(".slide.trimiror_big_slide[data-target='" + target + "']").stop().animate({ opacity: "100", filter: "alpha(opacity=100)" }, 500);
        	} else if(navigator.userAgent.indexOf("MSIE ") != -1 || navigator.userAgent.indexOf('Trident/') > -1 || navigator.userAgent.indexOf('Edge/') > -1){
        		$("#productSlideshow .slide").fadeOut(500, function(){
        			$(".slide.trimiror_big_slide[data-target='" + target + "']").fadeIn(500);
        		});
        	}
       		$(".click_event[data-target='" + target + "']").trigger("click");
       		if(defaultAvatar){
       			$("#default_avatar_error").animate({ opacity: "100" }, 500);
       			defaultAvatar = false;
       		}
       		$("#pinterest_share").attr("href", $("#pinterest_share").attr("data-href").replace("#media#", $(".trimiror_big_slide[data-target='" + target + "'] img").attr("src")));
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
	
	var checkUrl = "https://widget.trimirror.com/CheckMeasurements?clientId=" + trimirror_clientId + "&userId=" + GetUserId();
	$.ajax({
            url: checkUrl,
            dataType: "jsonp",
            data: {},
            method: "POST",
            success: function (result) {
            	defaultAvatar = !result.isSuccess;
                if (result.isSuccess) {
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
                } else {
                	$(".measurements a").attr("title", "Create your avatar");
                	$(".measurements a").text("Create your avatar");
                	$(".measurements span").hide();
                	$(".measurements").css("width", "35%");
                }
            }
        });


    	var linkSize = window.location.href.split('?');
    	var sizeSelected = false;
    	if(linkSize.length > 1){
    		var size = linkSize[1].split("=");
    		if(size.length > 1 && size[0] == "size"){
    			sizeSelected = true;	
                    	$("select[data-variant-option-name='Size']").val(size[1].toUpperCase());
                    	$("select[data-variant-option-name='Size']").trigger("change");
                    	updatePictures(true);    			
    		}
    	}
	if(!sizeSelected){
        	$.ajax({
            		url: ("https://widget.trimirror.com/GetBestSize?clientId=" + trimirror_clientId + "&code=#code#&color=#color#&size=#size#&userId=#userId#").replace("#code#", trimirror_code).replace("#color#", trimirror_color).replace("#size#", trimirror_size).replace("#userId#", GetUserId()),
            		dataType: "jsonp",
            		success: function (data) {
                		console.dir(data);
                		if (data.isSuccess) {
                    			$("select[data-variant-option-name='Size']").val(data.size.toUpperCase());
                    			$("select[data-variant-option-name='Size']").trigger("change");
					updatePictures(true);
                		}
            		}
        	});
	}
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
			data: "code=" + code + "&color=" + color + "&size=" + size + "&userId=" + GetUserId() + "&title=" + encodeURI(title) + "&price=" + price + "&imgUrl=" + encodeURI(imgUrl) + "&productUrl=" + encodeURI(window.location.href + "?size=" + size),
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
                        $(".trimiror_big_slide a[data-tension-id='" + (i + 1) + "'] img:first").attr("data-src", urlImage);
                        $(".trimiror_big_slide[data-target='" + (i + 1) + "'] img:first").attr("data-image", urlImage);
                        $(".trimiror_big_slide[data-target='" + (i + 1) + "'] img:first").attr("src", urlImage);
                        if(i == 0)
                        	$("#pinterest_share").attr("href", $("#pinterest_share").attr("data-href").replace("#media#", urlImage));
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
