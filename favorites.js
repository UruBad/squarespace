var measurements_value = "";
var current_video_url = "";
var shareLink = "https://widget.trimirror.com/VendorSharing/#shareType#?clientId=" + clientId + "&link=#link#&items=#items#";
var trimirror_url = "https://widget.trimirror.com";
var trimirror_clientId = clientId;
var measurements_url = "https://widget.trimirror.com/GetMeasurements?clientId=" + clientId + "&userId=#userId#";
var video_url = "https://widget.trimirror.com/GetVideoUrl?clientId=" + clientId + "&code=#code#&color=#color#&size=#size#&width=640&height=480&extcode=#extCode#&extcolor=#extColor#&extsize=#extSize#";
var video_urls = "https://widget.trimirror.com/GetVideoUrls";
var video_progress = "https://widget.trimirror.com/GetVideoWithProgress";
var measurements_link = "/my-avatar";

$(function () {
	function generateFavorites(data) {
		UpdateFavorites(data);
		console.log(data);
		var html = "";
		trimirror_code = "";
		trimirror_size = "";
		trimirror_color = "";
		trimirror_extcode = "";
		trimirror_extsize = "";
		trimirror_extcolor = "";

		if (data.isSuccess && data.items.length > 0) {
			html =
				'<section class="row">' +
				'	<div class="col-sm-6 col-xs-12 items">' +
				'		<div class="row">';
			var i, len, item;
			var itemsNames = "";
			for (i = 0, len = data.items.length; i < len; ++i) {
			    item = data.items[i];
			    var actionName = "";
			    html +=
					'<div class="col-xs-5 item">' +
					'	<article class="shop-item shop-item-wishlist overlay-element">';
			    if (item.look) {
			        html += '<div class="overlay-parent mobile_dropdown active_look" data-hover=".overlay-contents" data-link="' + item.productUrl + '">';
			        actionName = "UnLookFavorites";
			    }
			    else {
			        html += '<div class="overlay-parent mobile_dropdown" data-hover=".overlay-contents" data-link="' + item.productUrl + '">';
			        actionName = "LookFavorites";
			    }
			    html +=

					'		<div class="overlay-wrapper">' +
					'			<a href="#" class="mobile_dropdown_link">' +
					'				<img src="' + item.imgUrl + '" alt="Shop item" style="max-width:97% !important;">' +
					'			</a>' +
					'			<div class="favorite-overlay-contents">' +
					'				<div class="shop-item-actions">' +
                    '                   <div class="look_button" style="display:none;">' +
                    '                       <a class="action_button" data-url="https://widget.trimirror.com/' + actionName + '?clientId=' + clientId + '&userId=' + GetUserId() + '&code=' + item.code + '&color=' + item.color + '&size=' + item.size + '" data-action="unlook" href="#">' +
                    '                           <span>+</span>LOOK' +
                    '                       </a>' +
                    '                   </div>' +
                    '                   <div class="bottom_buttons">' +
                    '                       <a class="action_button" data-url="https://widget.trimirror.com/DeleteFavorites?clientId=' + clientId + '&userId=' + GetUserId() + '&code=' + item.code + '&color=' + item.color + '&size=' + item.size + '" data-action="remove" href="#">REMOVE</a>' +
                    '                   </div>' +
					'				</div>' +
					'			</div>' +
                    '			</div>' +
                    '           <span class="check_look"></span>' +
					'		</div>' +
					'		<header class="item-info-name-features-price">' +
					'			<h4><a href="' + item.productUrl + '">' + item.title + " / " + item.size.toUpperCase() + (item.color.length > 0 ? (" / " + item.color) : "") + '</a></h4>' +
					/*'			<span class="features">' + item.colorTitle + ', ' + item.sizeTitle + '</span><br>' +*/
					'			<span class="price">' + item.priceString + '</span>' +
					'		</header>';

			    if (item.look) {
			        itemsNames += item.title + ",";

			        if (trimirror_code == "") {
			            trimirror_name = item.title;
			            trimirror_code = item.code;
			            trimirror_color = item.color;
			            trimirror_size = item.size;
			            current_video_url = video_url.replace("#code#", trimirror_code).replace("#color#", trimirror_color).replace("#size#", trimirror_size);
			        }
			        else {
			            trimirror_extname = item.title;
			            trimirror_extcode = item.code;
			            trimirror_extcolor = item.color;
			            trimirror_extsize = item.size;
			            current_video_url = current_video_url.replace("#extCode#", trimirror_extcode).replace("#extColor#", trimirror_extcolor).replace("#extSize#", trimirror_extsize);
			        }
			        
			    }

				html +=
					'	</article>' +
					'</div>';
			}

			html +=
				'		</div>' +
				'	</div>' +
				'	<div class="col-sm-6 col-xs-12">' +
				'		<div class="fav-wrapper">' +
				'			<div class="flexslider flexslider-nopager">' +
                '               <div class="legend" style="display:block !important;"><span class="tight">too tight</span><span class="loose">loose</span></div>' +
				'				<div id="preloader"></div>' +
				'				<ul class="slides" id="dressing_slides">';


			for (i = 0; i < 3; ++i) {
			    html += '<li><img style="display:none;" src=""/></li>';
			}		    	

		    var shotUrl = "https://widget.trimirror.com/GetShot?clientId=" + clientId + "&code=#code#&color=#color#&size=#size#&extcode=#extcode#&extcolor=#extcolor#&extsize=#extsize#&width=#width#&height=#height#&view=1&userId=#userId#&jpg";
		    var blockWidth = $(".sqs-block-content").width();
		    var width = Math.ceil(blockWidth / 2) - 10;
		    shotUrl = shotUrl.replace("#userId#", GetUserId()).replace("#width#", width).replace("#height#", Math.ceil(width * 1.5));
		    var extItemShot = false
		    for (var c = 0; c < data.items.length; c++) {
		    	var itemLook = data.items[c];
		    	if(itemLook.look){
		    		if(!extItemShot){
		    			shotUrl = shotUrl.replace("#code#", itemLook.code).replace("#size#", itemLook.size).replace("#color#", itemLook.color);
		    			extItemShot = true;
		    		} else {
		    			shotUrl = shotUrl.replace("#extcode#", itemLook.code).replace("#extsize#", itemLook.size).replace("#extcolor#", itemLook.color);
		    			break;
		    		}
		    	}
		    }			
			shotUrl = shotUrl.replace("#extcode#", "").replace("#extsize#", "").replace("#extcolor#", "");
			shareLink = shareLink.replace("#link#", encodeURIComponent(window.location.href)).replace("#items#", itemsNames.substring(0, itemsNames.length - 1)) + '&img=' + shotUrl;
			html +=
				'				</ul>' +
                '     <div id="measurements_values" style="bottom:0 !important;">' +
                '       <table>' +
                '         <tr>' +
                '           <td>' +
                '             <span>my measurements:</span>' +
                '           </td>' +
                '           <td class="link">' +
                '             <a href="' + measurements_link + '">change</a>' +
                '           </td>' +
                '         </tr>' +
                '         <tr>' +
                '           <td style="padding-bottom:5px;">' +
                '             <span id="measurement_value"></span>' +
                '           </td>' +
                '           <td>' +
                '          </td>' +
                '         </tr>' +
                '       </table>' +
                '     </div>' +
                '     <div class="catwalk_dressing">' +
                '       <a href="#" rel="nofollow" title="View catwalk" class="catwalk button_catwalk catwalk_movie"></a>' +
                '     </div>' +
				'	</div>' +
				'	</div>' +
	            '       <div class="shop-product-single-social" style="margin-top:70px;">' +
                '           <span class="social-label pull-left">Share this look</span>' +
		        '           <div class="social-widget social-widget-mini social-widget-dark">' +
			    '               <ul class="list-inline">' +
				'                   <li>' +
                '                       <a href="' + shareLink.replace("#shareType#", "Facebook") + '" id="facebook_share" rel="nofollow" title="Share on Facebook" class="fb share"><span class="sr-only">Facebook</span></a>' +
				'                   </li>' +
		        '                   <li>' +
                '                       <a href="' + shareLink.replace("#shareType#", "Twitter") + '" id="twitter_share" rel="nofollow" title="Share on Twitter" class="tw share"><span class="sr-only">Twitter</span></a>' +
                '                   </li>' +
		        '                   <li>' +
                '                       <a href="' + shareLink.replace("#shareType#", "Pinterest") + '" id="pinterest_share" rel="nofollow" title="Share on Pinterest" class="pt share"><span class="sr-only">Pinterest</span></a>' +
                '                   </li>' +
		        '                   <li>' +
                '                       <a href="#" id="youtube_share" rel="nofollow" title="Share on Youtube" class="yt youtube_share"><span class="sr-only">Youtube</span></a><span id="youtube_percent" style="display:none;font-size:16px;"></span>' +
                '                   </li>' +
			    '               </ul>' +
		        '           </div>' +
	            '       </div>' +
				'	</div>' +
				'</section>';

		} else {
			html = '<div class="row shop-cart-empty">' +
				'	<div class="col-xs-12">' +
				'		<h1 class="strong-header">Favorites list<br>Is empty</h1>' +
				'		<p>You have no items in your favorites list.</p>' +
				'	</div>' +
				'</div>';
		}
		
		$("#favorites").html(html);
		
		var items = $("#favorites .items .item");
		var arrayHeight = [];
		for(var g = 0; g < items.length; g++)
			arrayHeight.push($(items[g]).height());
		var heightItem = Math.max.apply(null, arrayHeight);
		$("#favorites .items .item").css("height", heightItem + "px");

		$("#dressing_slides li img:first").load(function () {
		    $("#preloader").hide();
		});

		$(".share").click(function () {
		    OpenWindow($(this).attr("href"), $(this).attr("title"), "500", "300");
		    return false;
		});

		if (data.items.length > 0) {
		    var url = "https://widget.trimirror.com/GetShotUrls?clientId=" + clientId + "&code=#code#&color=#color#&size=#size#&extcode=#extcode#&extcolor=#extcolor#&extsize=#extsize#&width=#width#&height=#height#&userId=#userId#&jpg";
		    var width = $("#dressing_slides").width();
		    url = url.replace("#userId#", GetUserId()).replace("#width#", width).replace("#height#", Math.ceil(width * 1.38));
		    var extItem = false
		    for (var c = 0; c < data.items.length; c++) {
		    	var itemLook = data.items[c];
		    	if(itemLook.look){
		    		if(!extItem){
		    			url = url.replace("#code#", itemLook.code).replace("#size#", itemLook.size).replace("#color#", itemLook.color);
		    			extItem = true;
		    		} else {
		    			url = url.replace("#extcode#", itemLook.code).replace("#extsize#", itemLook.size).replace("#extcolor#", itemLook.color);
		    			break;
		    		}
		    	}
		    }
		    url = url.replace("#extcode#", "").replace("#extsize#", "").replace("#extcolor#", "");
		    console.log(url);
		    $.ajax({
		        url: url,
		        data: {},
		        dataType: "jsonp",
		        success: function (data) {
		            if (data.isSuccess) {
		                for (var i = 0; i < data.urls.length; i++) {
		                    var urlImage = data.urls[i];
		                    $("#dressing_slides li:eq(" + i + ") img:first").attr("src", urlImage);
		                    $("#dressing_slides li:eq(" + i + ") img:first").show();
		                }
		            }
		        }
		    });
		    if (measurements_value == "") {
		        $.ajax({
		            url: measurements_url.replace("#userId#", GetUserId()),
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
		                    measurements_value = result.substring(0, result.length - 1);
		                    $("#measurements_values #measurement_value").html(measurements_value);
		                    $("#measurements_values").show();
		                }
		            }
		        });
		    }
		    else {
		        $("#measurements_values #measurement_value").html(measurements_value);
		        $("#measurements_values").show();
		    }
		}

		$(".check_look").click(function () {
		    $(this).prev().find(".look_button a").click();
		});

		// Hide preloader after image load
		$(".flexslider.flexslider-nopager .slides img").load(function () {
			if ($(this).parent().hasClass("flex-active-slide"))
				$("#preloader").hide();
		});

		// Slider
		$('.flexslider.flexslider-nopager').each(function() {
			$(this).flexslider({
				controlNav: false,
				smoothHeight: true,
				slideshow: true,
				animationSpeed: 1000
			});
			$(".flex-next, .flex-prev").html("");
		});

		// Remove and Look
		$(".shop-item-actions .action_button").click(function () {
			var t = $(this);
			var url = t.attr("data-url");
			$.ajax({
				url: url,
				method: "post",
				dataType: "jsonp",
				success: generateFavorites,
				error: function (data) {
					console.log(data);
					//alert("An error occured. Refresh the page and try again.");
				}
			});
		});

		$(document).trigger("trimirror_catwalk_ready");
	}

	$.ajax({
		url: "https://widget.trimirror.com/GetFavorites/?clientId=" + clientId + "&userId=" + GetUserId(),
		method: "post",
		dataType: "jsonp",
		success: generateFavorites,
		error: function (data) {
			console.log(data);
		}
	});

	// Hide preloader when everything are loaded
	$(window).load(function () { $("#preloader").hide() });
});
