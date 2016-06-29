var privacyPolicyText = "Your data is always kept completely private. We may use it for analyzing how our customers use our fitting room as a group, but it's never assigned to you individually. It is also saved as part of your cookies (which you can delete any time,) so that the next time you visit this site your avatar will be ready.";
var slidersArray = [];
var invalidMeasurements = [];
var userId = "";
var images = [];
var backTabId = 1;
var currentCharacter = "";

$(document).ready(function () {
    var privacyPolicy = '<div class="yui3-widget sqs-widget sqs-widgets-confirmation alert shown" style="opacity:0;z-index:-1" id="privacy_policy"><div class="sqs-widgets-confirmation-content clear"><div class="title">Privacy Policy</div><div class="message">' + privacyPolicyText + '</div><div class="buttons"><div class="confirmation-button no-frame confirm" tabindex="3">Okay</div></div></div></div>';
    $("#tabs").append(privacyPolicy);
    $("#privacy_policy .confirm").click(function(){
		$("#privacy_policy").animate({ "opacity": "0", "z-index":"-1" }, 500);
	});
	$("#privacy_policy_link").click(function(){
	    $("#privacy_policy").animate({ "opacity": "1", "z-index":"1000"}, 500);
	    return false;
	});
    var trimirror_cookie = $.cookie('trimirror_anonim_user_id');
    if (trimirror_cookie != null) {
        var remember = true;
        try{
            var remember = $.parseJSON(trimirror_cookie).remember;
        }
        catch (e) {
        }
        $("#rememberMeasurements").prop("checked", remember);
    }
    userId = GetUserId();
    $("#set_measurements")._cm({
        dataUrl: measurementsUrl.replace("#userId#", userId),
        checkUrl: checkMeasurementsUrl.replace("#userId#", userId),
        individualsUrl: individualsUrl.replace("#userId#", userId),
        womanExceptions: [{
            name: "underBust",
            html: '<div><div><div>_itemName_</div><div class="slider-container" style="_styleIE_"><div class="cup_size_click_value ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div style="width:0%;" class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min"></div><div class="cup_size_value_container" style="left:-2%" data-value="10.16" data-percent="0"><a href="#"></a><span>A</span></div><div class="cup_size_value_container" style="left:18%" data-value="12.7" data-percent="18"><a href="#"></a><span>B</span></div><div class="cup_size_value_container" style="left:38%" data-value="15.24" data-percent="38"><a href="#"></a><span>C</span></div><div class="cup_size_value_container" style="left:58%" data-value="17.78" data-percent="58"><a href="#"></a><span>D</span></div><div class="cup_size_value_container" style="left:78%" data-value="20.32" data-percent="78"><a href="#"></a><span class="left">DD</span></div><div class="cup_size_value_container" style="left:98%" data-value="22.86" data-percent="98"><a href="#"></a><span>E</span></div></div><div class="slider cup_size" style="display:none;" data-min="10.16" data-max="22.86" data-value="_itemValue_" data-type="_itemType_" data-step="2.54"></div></div><div><span class="measurement-description-icon icon" data-type="_itemType_Desc" data-slider-type="_itemType_">?</span></div></div></div>'
        }],
        onComletedMeasurements: MeasurementsEvents,
        onComletedIndividuals: function (character) {
            currentCharacter = character;
            $(".character." + character).addClass("active");
            $(".shoes_select").click(SetShoes);
            $(".hair_select").click(SetHair);
        }
    });

    $(".character").click(function () {
        if (!$(this).hasClass("active")) {
            $.ajax({
                url: setCharacter.replace("#userId#", userId).replace("#character#", $(this).attr("data-type")),
                dataType: "jsonp",
                data: {},
                method: "POST",
                success: function (data) {
                    location.reload();
                }
            });
            return false;
        }
        return false;
    });

    if (IsMobile()) {
        $("#measurementsAvatarLookContainer").parent().attr("id", "tabs-4")
        $("#tabs_list").append("<li id='look_tab' style='display:none;'><a href='#tabs-4'>Look</a></li>");
    }
    $("#tabs").tabs();
    return false;
});

function MeasurementsEvents(checked) {
    $('#rememberMeasurements').change(function () {
        userId = GetUserId();
    });

    $(".cup_size_click_value .cup_size_value_container a").click(function () {
        $(".slider.cup_size").slider("option", "value", $(this).parent().attr("data-value"));
        return false;
    });

    $(".slider").each(function () {
        // read initial values from markup and remove thatsdsad
        var value = parseFloat($(this).attr("data-value"));
        var max = parseFloat($(this).attr("data-max"));
        var min = parseFloat($(this).attr("data-min"));
        var step = 0.5;
        if ($(this).attr("data-step")) {
            step = parseFloat($(this).attr("data-step"));
        }
        var type = $(this).attr("data-type");
        var sliders = $(".slider");
        var t = $(this).slider({
            range: "min",
            min: min,
            max: max,
            step: step,
            value: value,
            change: function (e, ui) {
                $(this).find("input[type='text']").val(GetText(ui.value, type));
                if (!IsMobile()) {
                    $("span[data-slider-type='" + type + "']").click();
                }
                if ($(this).hasClass("cup_size")) {
                    var custom = $(this).prev();
                    $(custom).find(".cup_size_value_container").removeClass("active");
                    $(custom).find(".cup_size_value_container[data-value='" + ui.value.toString().replace(",", ".") + "']").addClass("active");
                    $(custom).find(".ui-slider-range").attr("style", "width:" + $(custom).find(".cup_size_value_container[data-value='" + ui.value.toString().replace(",", ".") + "']").attr("data-percent") + "%");
                }
            },
            slide: function (e, ui) {
                $(this).find("input[type='text']").val(GetText(ui.value, type));
                if (!IsMobile()) {
                    $("span[data-slider-type='" + type + "']").click();
                }
            },
            start: function () {
            },
            create: function () {
                var valueTip = $('<span class="slider-value" ><input type="text" value="' + value + '" name="' + type + '" data-min="' + min + '" data-max="' + max + '"/></span>');
                $(this).find(".ui-slider-handle").append(valueTip);
                if (type != "height") {
                    $(this).find("input[type='text']").focus(function () {
                        $(this).val($(this).val().replace(/'/g, ""));
                    });
                }
                $(this).find("input[type='text']").blur(function () {
                    var newVal = $(this).closest(".slider").slider("option", "value");
                    if (this.name === "underBust" && currentCharacter == "woman") {
                        switch ($(this).val()) {
                            case "AA":
                                newVal = 3 * 2.54;
                                break;
                            case "A":
                                newVal = 4 * 2.54;
                                break;
                            case "B":
                                newVal = 5 * 2.54;
                                break;
                            case "C":
                                newVal = 6 * 2.54;
                                break;
                            case "D":
                                newVal = 7 * 2.54;
                                break;
                            case "DD":
                                newVal = 8 * 2.54;
                                break;
                            case "E":
                                newVal = 9 * 2.54;
                                break;
                            case "F":
                                newVal = 10 * 2.54;
                                break;
                            case "FF":
                                newVal = 11 * 2.54;
                                break;
                            case "G":
                                newVal = 12 * 2.54;
                                break;
                        }
                    }
                    else {
                        var validationRegex = /\d{1,2}\.?\d?/;
                        var regexForParse = /\d{1,3}\.?\d?/g;
                        var unit = $(".measurements-unit-icon.active").attr("data-value");
                        if (unit === "CM") {
                            validationRegex = /\d{2,3}\.?\d?/;
                        }
                        else if (unit === "IN" && this.name === "height") {
                            validationRegex = /\d{1}\s+\d{1,2}/;
                        }
                        var text = $(this).val().replace(/'/g, "");
                        var isValid = validationRegex.test(text);
                        if (!isValid && $(this).val() !== "0") {
                            newVal = curretnValue;
                            if (parseInt(text) > 0) {
                                if (this.name === "height" && unit === "IN") {
                                    var feets = parseInt(text);
                                    var inches = 0;
                                    var floatValue = ((feets * 12) + inches);
                                    newVal = floatValue * 2.54;
                                }
                            }
                        } else {
                            var parsedValues = $(this).val().match(regexForParse);
                            var floatValue = parseFloat(parsedValues[0]);
                            if (this.name === "height" && unit === "IN") {
                                var feets = parseFloat(parsedValues[0]);
                                var inches = parseFloat(parsedValues[1]);
                                if (feets === 0 && inches === 0) {
                                    return;
                                }
                                floatValue = ((feets * 12) + inches);
                                newVal = floatValue * 2.54;
                            }
                            else
                                newVal = unit == "IN" ? floatValue * 2.54 : floatValue;
                            if (newVal === 0) {
                                return;
                            }
                            if (newVal < parseInt($(this).attr("data-min"))) {
                                newVal = parseInt($(this).attr("data-min"));
                            } else if (newVal > parseInt($(this).attr("data-max"))) {
                                newVal = parseInt($(this).attr("data-max"));
                            }
                        }
                    }
                    $(this).closest(".slider").slider("option", "value", newVal);
                });
            }
        });
        slidersArray.push(t);
    });
    $("input[name='height']").mask("0' #0''");
    $(slidersArray).each(function () {
        var text = $(this).find("input[type='text']").val();
        $(this).find("input[type='text']").val(GetText($(this).slider("option", "value"), $(this).attr("data-type")));
    });
    $(".measurement-description-icon").click(function () {
        var element = $("#" + $(this).attr("data-type"));
        element.show(150, function () {
            $(".measurement-description-img").each(function () {
                if ($(this).attr("src") != $(element).attr("src"))
                    $(this).hide();
            });
        });
        if ($("#avatar-look-widget").attr("data-set") === "false") {
            $(".close-measurements-description-icon").hide();
        }
        else {
            $(".close-measurements-description-icon").show();
        }
    });

    $(".group_header").click(function () {
        if (!$(this).hasClass("active")) {
            $(".group_header.active").next().slideUp(1000, function () {
                $(this).prev().find("span").first().html("+");
            });
            $(".group_header.active").removeClass("active");
            $(this).next().slideDown(1000, function () {
                $(this).prev().find("span").first().html("-");
            });
            $(this).addClass("active");
        }
    });

    $("#setMeasurementsButton").click(SaveMeasurements);
    $("#setCorrectedMeasurements").click(SetCorrectedMeasurements);
    $(".show-avatar-preview-img-icon").click(function () {
        var number = parseInt($("#avatarPreviewImg").attr("data-view"));
        if ($(this).hasClass("show-next-avatar-preview-img-icon")) {
            number++;
            if (number > 3)
                number = 1;
        }
        else {
            number--;
            if (number < 1)
                number = 3;
        }
        GetImage(number);
    });

    $(".close-measurements-description-icon").click(function () {
        $(".measurement-description-img").hide(150);
        $(this).hide(150);
    });
    $(".measurements-unit-icon").click(function () {
        if (!$(this).hasClass("active")) {
            $(".measurements-unit-icon").removeClass("active");
            $(this).addClass("active");
            $(slidersArray).each(function () {
                var text = $(this).find("input[type='text']").val();
                if (text !== "0") {
                    $(this).find("input[type='text']").val(GetText($(this).slider("option", "value"), $(this).attr("data-type")));
                }
            });
        }
    });
    $(".cup_size_value_container[data-value='" + $(".slider.cup_size").attr("data-value") + "'] a").click();
    if(checked)
        GetImage(1);
}

function IsMobile() {
    return ($(window).width() < 740);
}

function Guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

function GetText(value, type) {
    var result = value.toString();
    if ($(".measurements-unit-icon.active").attr("data-value") == "IN") {
        if (type == "height") {
            var inches = Math.round(value * 0.393700787);
            var feet = Math.floor(inches / 12);
            inches %= 12;
            result = feet + "' " + inches + "''";
        }
        else {
            var Inchies = value / 2.54;
            if (type == "underBust" && currentCharacter == "woman") {
                switch (Inchies) {
                    case 3:
                        result = "AA";
                        break;
                    case 4:
                        result = "A";
                        break;
                    case 5:
                        result = "B";
                        break;
                    case 6:
                        result = "C";
                        break;
                    case 7:
                        result = "D";
                        break;
                    case 8:
                        result = "DD";
                        break;
                    case 9:
                        result = "E";
                        break;
                    case 10:
                        result = "F";
                        break;
                    case 11:
                        result = "FF";
                        break;
                    case 12:
                        result = "G";
                        break;
                }
            }
            else {
                var str = "";
                var In = Math.round((Inchies % 1) * 10);
                var In1 = In % 2;
                if (In1 == 0) {
                    str = (Math.floor(Inchies) + In / 10).toString();
                }
                else {
                    str = (Math.floor(Inchies) + (In + 1) / 10).toString();
                }
                if (str.split('.')[1] == "0")
                    str = str.split('.')[0];
                result = str + "''";
            }
        }
    }
    return result;
}

function SaveMeasurements() {
    var data = [];
    $(".measurements-group").each(function () {
        var type = $(this).attr("data-type");
        var group = { Name: type, Measurements: [], IsExpanded: true };
        var bustValue = 0.0;
        $(this).find(".slider").each(function () {
            var measurement = {};
            measurement.Value = $(this).slider("option", "value");
            measurement.Name = $(this).attr("data-type");
            if (measurement.Name == "bust") {
                bustValue = measurement.Value;
            }
            if (measurement.Name == "underBust" && currentCharacter == "woman") {
                measurement.Value = bustValue - measurement.Value;
            }
            measurement.Min = $(this).slider("option", "min");
            measurement.Max = $(this).slider("option", "max");
            measurement.IsRequired = true;
            measurement.Unit = 1;
            measurement.DisplayName = $(this).slider("option", "value");
            group.Measurements.push(measurement);
        });
        data.push(group);
    });
    //alert(JSON.stringify(data));
    $.ajax({
        url: setMeasurements.replace("#userId#", GetUserId()),
        dataType: "jsonp",
        data: { data: JSON.stringify(data) },
        method: "POST",
        success: function (data) {
            //alert(data.isSuccess);
            console.dir(data);
            invalidMeasurements = [];
            if (data.isSuccess) {
                GetImage(1, true);
                backTabId = 1;
            }
            else if (data.error != null && data.invalidMeasurements != null) {
                //invalidMeasurements = data.invalidMeasurements;
                if(currentCharacter == "woman")
                    $("#create-avatar-error .text").html(data.error.replace(/underbust/g, "Cup size"));
                else
                    $("#create-avatar-error .text").html(data.error.replace(/underbust/g, "Ribcage"));
                $(".create-avatar-error-container").show();
            }
            else if (error != null && data.invalidMeasurements == null) {
                var error = "System error. Please try again later.";
                $("#create-avatar-error .text").html(error);
                $(".create-avatar-error-container").show();
            }
        },
        error: function () {
            //alert("error");
        }
    });
}

function SetCorrectedMeasurements() {
    for (var i = 0; i < invalidMeasurements.length; i++) {
        var item = invalidMeasurements[i];
        $(".slider[data-type='" + item.Name + "']").slider("option", "value", item.Value);
    }
    if (invalidMeasurements.length > 0) {
        SaveMeasurements();
    }
    invalidMeasurements = [];
    $(".create-avatar-error-container").hide();

}

function GetImage(view, reload) {
    if (images.length == 0 || reload) {
        var width = $("#avatar-look-widget").width();
        var height = $("#avatar-look-widget").height();
        if (IsMobile()) {
            width = $(".tab_item:visible").width();
            height = $(".tab_item:visible").height();
        }
        var imgUrls = avatarUrls.replace("#userId#", GetUserId()).replace("#width#", width).replace("#height#", height);
        $.ajax({
            url: imgUrls,
            dataType: "jsonp",
            data: {},
            method: "POST",
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                console.dir(data);
                if (data.isSuccess) {
                    images = data.urls;
                    SetImage(view);
                }
            }
        });
    }
    else {
        SetImage(view);
    }

}

function SetImage(view) {
    $("#avatarPreviewImg").attr("data-view", view);
    $("#avatar-look-widget").attr("data-set", "true");
    $(".close-measurements-description-icon").click();
    $("#avatarPreviewImg").fadeOut('slow', function () {
        $("#avatarPreviewImg").one("load", function () {
            $("#avatarPreviewImg").fadeIn('fast');
        });

        if (currentCharacter == "woman")
            $("#create-avatar-correct").attr("onclick", "window.location.href='/womens';return false;");
        else
            $("#create-avatar-correct").attr("onclick", "window.location.href='/mens';return false;");

        $("#create-avatar-correct").show("scale", { percent: 100, origin: ['left', 'right'] }, 800);
        $("#avatarPreviewImg").attr("src", images[view - 1]);
        if (IsMobile()) {
            //window.location.href = images[view - 1];
        }
        if (IsMobile()) {
            $("a[href='#tabs-4']").click();
        }
        $("#tabs_list li:not(#look_tab)").show();
    });
}

function SetShoes(event) {
    if (!$(event.currentTarget).hasClass("active_image")) {
        var url = setShoesUrl.replace("#userId#", GetUserId()).replace("#shoes#", $(event.currentTarget).attr("data-name"));
        $(".shoes_select.active_image").removeClass("active_image");
        $(event.currentTarget).addClass("active_image");
        $.ajax({
            url: url,
            dataType: "jsonp",
            data: {},
            method: "POST",
            success: function (data) {
                console.dir(data);
                if (data.isSuccess) {
                    GetImage(1, true);
                    backTabId = 3;
                }
            }
        });
    }
}

function SetHair(event) {
    if (!$(event.currentTarget).hasClass("active_image")) {
        var url = setHairUrl.replace("#userId#", GetUserId()).replace("#individual#", $(event.currentTarget).attr("data-name")).replace("#hair#", $(event.currentTarget).attr("data-hair")).replace("#character#", currentCharacter);
        $(".hair_select.active_image").removeClass("active_image");
        $(event.currentTarget).addClass("active_image");
        $.ajax({
            url: url,
            dataType: "jsonp",
            data: {},
            method: "POST",
            success: function (data) {
                console.dir(data);
                if (data.isSuccess) {
                    GetImage(1, true);
                    backTabId = 2;
                }
            }
        });
    }
}
