var product_code = "";
 var trimirror_clientId = clientId;
    var trimirror_sizes = [];
    var shotUrls = "https://widget.trimirror.com/GetShotUrls?clientId=" + trimirror_clientId + "&code=#code#&color=#color#&size=#size#&width=#width#&height=#height#&userId=#userId#&jpg";
    var shareLink = "https://widget.trimirror.com/VendorSharing/#shareType#?clientId=" + trimirror_clientId + "&link=#link#&items=#items#";
    var trimirror_url = "https://widget.trimirror.com";
    var video_urls = "https://widget.trimirror.com/GetVideoUrls";
    var video_progress = "https://widget.trimirror.com/GetVideoWithProgress";
    
    $(function () {
        trimirror_code = $("#trimirror_product_code").val();
        product_code = trimirror_code;
        shotUrls = shotUrls.replace("#code#", trimirror_code)
        trimirror_name = $("h1.product-title").html();
        trimirror_size = $("select[data-variant-option-name='Size']").val();
        trimirror_color = ""; //$("#color").val();
        foreach (var size in $("select[data-variant-option-name='Size'] option"))
        {
        	trimirror_sizes.push({ "Name": size.val(), "Title": size.val() });
        }
        /*$("#color").change(function () {
            trimirror_color = $("#color").val();
        });*/
        $("select[data-variant-option-name='Size']").change(function () {
            trimirror_size = $("#size").val();
        });
        // Update pictures if color or size are changed
        //$("#color").chosen().change(function () { updatePictures(); });
        $("select[data-variant-option-name='Size']").chosen().change(function () { updatePictures(); });

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
                    $('#size').val(data.size.toLowerCase());
                    $('#size').trigger("chosen:updated");
                    updatePictures(true);
                }
            }
        });
    });

fucntion AddToFavorites(){
		var code = $("#code").val();
		var color = $("#color").val();
		if (color == undefined)
			color = "";
		var size = $("#size").val();

		$.ajax({
			url: "/Favorites/AddToFavoritesAjax",
			data: "code=" + code + "&color=" + color + "&size=" + size,
			method: "post",
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
        $("#preloader").show();
        var color = $("#color").val();
        if (color == undefined)
            color = "";
        var size = $("#size").val();

        // Avatar pictures
        var templateUrl = "http://widget.trimirror.com/GetShotUrls?clientId=" + clientId + "&code=" + product_code + "&color=#color#&size=#size#&width=#width#&height=#height#&userId=#userId#&jpg";

        var currentUrl = templateUrl.replace("#color#", color).replace("#size#", size).replace("#userId#", GetUserId());
        var url = currentUrl.replace("#width#", "650").replace("#height#", "845");
        $.ajax({
            url: url,
            data: {},
            dataType: "jsonp",
            success: function (data) {
                if (data.isSuccess) {
                    for (var i = 0; i < data.urls.length; i++) {
                        var urlImage = data.urls[i];
                        $(".thumbnailSlider .slides li:eq(" + (i + 1) + ") a:first").attr("href", urlImage);
                    }
                    $(".timer_container .timer-loader").hide();
                    $("#preloader").hide();
                }
            }
        });
        url = currentUrl.replace("#width#", "430").replace("#height#", "585");
        $.ajax({
            url: url,
            data: {},
            dataType: "jsonp",
            success: function (data) {
                if (data.isSuccess) {
                    for (var i = 0; i < data.urls.length; i++) {
                        var urlImage = data.urls[i];
                        $(".thumbnailSlider .slides li:eq(" + (i + 1) + ") img:first").attr("src", urlImage);
                        $(".tension_map[data-tension-id='" + (i + 1) + "'] img").attr("src", urlImage);
                    }
                }
            }
        });
        url = currentUrl.replace("#width#", "60").replace("#height#", "75");
        $.ajax({
            url: url,
            data: {},
            dataType: "jsonp",
            success: function (data) {
                if (data.isSuccess) {
                    for (var i = 0; i < data.urls.length; i++) {
                        var urlImage = data.urls[i];
                        $(".thumbnailSlider .smallThumbnails li:eq(" + (i + 1) + ") img:first").attr("src", urlImage);
                    }
                }
            }
        });
    }

    function IsImageOk(img) {
        if (!img.complete) {
            return false;
        }

        if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
            return false;
        }
        return true;
    }
