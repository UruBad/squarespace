// Custom generation measurements
(function ($) {
    $.fn._cm = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exists.');
        }
    };

    var methods = {},

    //Set defauls for the control
    defaults = {
        dataUrl: '',
        checkUrl: '',
        individualsUrl: '',
        sectionHTML: '<h2 class="group_header _sectionIsActive_"><span>_sectionSign_</span> _sectionName_<span class="obligatoriness">_sectionRequired_</span></h2><section class="measurements-group" style="display: _sectionDisplay_;" data-type="_sectionType_">_itemGlobalHTML_</section>',
        itemGlobalHTML: '<div><div><div>_itemName_</div><div class="slider-container" style="_styleIE_"><div class="slider" data-min="_itemMin_" data-max="_itemMax_" data-value="_itemValue_" data-type="_itemType_"></div></div><div><span class="measurement-description-icon icon" data-type="_itemType_Desc" data-slider-type="_itemType_">?</span></div></div></div>',
        womanExceptions: [],
        manExceptions: [],
        requiredSection: "Basic",
        onComletedMeasurements: function () { },
        onComletedIndividuals: function () { }
    },
    globalHtml = "";

    methods.init = function (c) {
        var options = $.extend({}, defaults, c);
        globalHtml = "";
        var obj = $(this);
        var checkResult = false;
        if (obj) {
            $.ajax({
                url: options.individualsUrl,
                dataType: "jsonp",
                data: {},
                method: "POST",
                success: function (data) {
                    console.dir(data);
                    if (data.isSuccess) {
                        GetMeasurements(options, obj, data.selectedCharacter);
                        if (data.individuals.length > 0) {
                            var hairs = "<ul>";
                            var individualsShoes;
                            for (var i = 0; i < data.individuals.length; i++) {
                                var individual = data.individuals[i];
                                if (data.selectedCharacter != individual.character)
                                    continue;
                                individualsShoes = individual
                                hairs += "<li class='hair_select";
                                if (individual.name == data.selectedIndividual) {
                                    hairs += " active_image";
                                }
                                hairs += "' data-name='" + individual.name + "' data-hair='" + individual.defaultHair + "'><img src='" + individual.imgUrl + "' alt='" + individual.name + "'></li>";
                            }
                            hairs += "</ul>"
                            obj.find("#hairs").first().html(hairs);

                            var shoes = "<ul>";
                            for (var i = 0; i < individualsShoes.shoes.length; i++) {
                                var individual = individualsShoes.shoes[i];
                                shoes += "<li class='shoes_select";
                                if (individual.name == data.selectedShoes) {
                                    shoes += " active_image";
                                }
                                shoes += "' data-name='" + individual.name + "'><img src='" + individual.imgUrl + "' alt='" + individual.name + "'></li>";
                            }
                            shoes += "</ul>"
                            obj.find("#shoes_catalog").first().html(shoes);
                            options.onComletedIndividuals.call(this, data.selectedCharacter);
                        }
                    }
                }
            });
        }
    };

    function GetMeasurements(options, obj, character) {
        var itemExceptions = [];
        if (character == "woman")
            itemExceptions = options.womanExceptions;
        else if (character == "man")
            itemExceptions = options.manExceptions;
        console.dir(itemExceptions);
        $.ajax({
            url: options.checkUrl,
            dataType: "jsonp",
            data: {},
            method: "POST",
            success: function (data) {
                console.dir(data);
                checkResult = data.isSuccess;
                if (checkResult) {
                    $("#tabs_list li").show();
                }
                $.ajax({
                    url: options.dataUrl,
                    dataType: "jsonp",
                    data: {},
                    method: "POST",
                    success: function (data) {
                        console.log(data);
                        if (data.isSuccess) {
                            for (var i = 0; i < data.measurements.length; i++) {
                                var group = data.measurements[i];
                                var localHtml = options.sectionHTML.replace("_sectionIsActive_", (group.IsExpanded ? " active" : "")).replace("_sectionSign_", (group.IsExpanded ? "-" : "+")).replace("_sectionName_", group.Name).replace("_sectionRequired_", (options.requiredSection == group.Name ? "(required)" : "(optional)")).replace("_sectionDisplay_", (group.IsExpanded ? "block" : "none")).replace("_sectionType_", group.Name);
                                var itemLocalHtml = "";
                                var bustValue = 0.0;
                                for (var j = 0; j < group.Measurements.length; j++) {
                                    var measurement = group.Measurements[j];
                                    var itemValue = 0;
                                    if (measurement.Value > 0 && checkResult) {
                                        itemValue = measurement.Value;
                                        if (character == "woman") {
                                            if (measurement.Name == "bust") {
                                                bustValue = measurement.Value;
                                            } else if (measurement.Name == "underBust") {
                                                itemValue = (bustValue - measurement.Value).toFixed(2);
                                                if (itemValue.slice(-1) == "0")
                                                    itemValue = itemValue.substring(0, itemValue.length - 1);
                                            }
                                        }
                                    }
                                    var html = options.itemGlobalHTML;
                                    for (var b = 0; b < itemExceptions.length; b++) {
                                        if (itemExceptions[b].name == measurement.Name) {
                                            html = itemExceptions[b].html;
                                            break;
                                        }
                                    }
                                    itemLocalHtml += html.replace("_itemName_", measurement.DisplayName).replace("_itemMin_", measurement.Min).replace("_itemMax_", measurement.Max).replace("_itemValue_", itemValue.toString().replace(",", ".")).replace(/_itemType_/g, measurement.Name);
                                }
                                localHtml = localHtml.replace("_itemGlobalHTML_", itemLocalHtml);
                                globalHtml += localHtml
                            }
                            var ua = window.navigator.userAgent;
                            console.log(ua);
                            var msie = ua.indexOf("MSIE ");
                            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) || !!navigator.userAgent.match(/Edge/))
                                globalHtml = globalHtml.replace(/_styleIE_/g, "height:60px;");
                            else
                                globalHtml = globalHtml.replace(/_styleIE_/g, "");

                            obj.find(".measurements-group-container").first().html(globalHtml + obj.find(".measurements-group-container").first().html());
                            options.onComletedMeasurements.call(this, checkResult);
                        }
                    }
                });
            }
        });
    }

})(jQuery);
