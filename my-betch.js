var slidersArray = [];
var invalidMeasurements = [];
var userId = "";
var images = [];
var backTabId = 1;
var currentCharacter = "";

function MyBetch(){
	console.dir("it's work");
	$(".content-inner-wrapper div[data-type='page']").append('<div class="gender">' +
'		 <a title="Woman" class="character woman active" data-type="woman" href="#"></a>' +
'        <a title="Man" class="character man" data-type="man" href="#"></a>' +
'    </div>' +
'<div id="tabs" class="ui-tabs ui-widget ui-widget-content ui-corner-all">' +
'  <ul id="tabs_list" class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">' +
'    <li class="ui-state-default ui-corner-top ui-tabs-active ui-state-active" role="tab" tabindex="0" aria-controls="tabs-1" aria-labelledby="ui-id-1" aria-selected="true" aria-expanded="true"><a href="#tabs-1" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-1">Measurements</a></li>' +
'    <li style="display:none;" class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="tabs-2" aria-labelledby="ui-id-2" aria-selected="false" aria-expanded="false"><a href="#tabs-2" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-2">Avatars</a></li>' +
'    <li style="display:none;" class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="tabs-3" aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false"><a href="#tabs-3" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-3">Shoes</a></li>' +
'  </ul>' +
'    <div id="set_measurements" class="set-measures-step">' +
'        <div class="create-avatar-error-container">' +
'            <div id="create-avatar-error" class="create-avatar-error">' +
'                <span class="header red">Measurement Error</span>' +
'                <div class="text">' +
'                </div>' +
'                <div style="text-align: center;margin-top:15px;">' +
'                    <button id="setCorrectedMeasurements" class="button_widget">OK</button>' +
'                </div>' +
'            </div>' +
'        </div>' +
'        <div id="tabs-1" class="right-border measures-list tab_item ui-tabs-panel ui-widget-content ui-corner-bottom" aria-labelledby="ui-id-1" role="tabpanel" aria-hidden="false">' +
'            <h1 class="betch_caption" id="measurements-caption">measurements</h1>' +
'            <div class="measurement-units-container">' +
'                <div data-value="CM" class="measurements-unit-icon">CM</div>' +
'                <div data-value="IN" class="measurements-unit-icon active">IN</div>' +
'            </div>' +
'            <div class="measurements-group-container"><h2 class="group_header  active"><span>-</span> Basic<span class="obligatoriness">(required)</span></h2><section data-type="Basic" style="display: block;" class="measurements-group"><div><div><div>Height</div><div style="" class="slider-container"><div data-type="height" data-value="0" data-max="219" data-min="132" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="219" data-min="132" name="height" value="0"></span></a></div></div><div><span data-slider-type="height" data-type="heightDesc" class="measurement-description-icon icon">?</span></div></div></div><div><div><div>Bust</div><div style="" class="slider-container"><div data-type="bust" data-value="0" data-max="155" data-min="50" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="155" data-min="50" name="bust" value="0"></span></a></div></div><div><span data-slider-type="bust" data-type="bustDesc" class="measurement-description-icon icon">?</span></div></div></div><div><div><div>Cup size</div><div style="" class="slider-container"><div class="cup_size_click_value ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width:0%;"></div><div data-percent="0" data-value="10.16" style="left:-2%" class="cup_size_value_container"><a href="#"></a><span>A</span></div><div data-percent="18" data-value="12.7" style="left:18%" class="cup_size_value_container"><a href="#"></a><span>B</span></div><div data-percent="38" data-value="15.24" style="left:38%" class="cup_size_value_container"><a href="#"></a><span>C</span></div><div data-percent="58" data-value="17.78" style="left:58%" class="cup_size_value_container"><a href="#"></a><span>D</span></div><div data-percent="78" data-value="20.32" style="left:78%" class="cup_size_value_container"><a href="#"></a><span class="left">DD</span></div><div data-percent="98" data-value="22.86" style="left:98%" class="cup_size_value_container"><a href="#"></a><span>E</span></div></div><div data-step="2.54" data-type="underBust" data-value="0" data-max="22.86" data-min="10.16" style="display:none;" class="slider cup_size ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="22.86" data-min="10.16" name="underBust" value="0"></span></a></div></div><div><span data-slider-type="underBust" data-type="underBustDesc" class="measurement-description-icon icon">?</span></div></div></div><div><div><div>Waist</div><div style="" class="slider-container"><div data-type="waist1" data-value="0" data-max="130" data-min="35" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="130" data-min="35" name="waist1" value="0"></span></a></div></div><div><span data-slider-type="waist1" data-type="waist1Desc" class="measurement-description-icon icon">?</span></div></div></div><div><div><div>Hips</div><div style="" class="slider-container"><div data-type="hips1" data-value="0" data-max="165" data-min="50" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="165" data-min="50" name="hips1" value="0"></span></a></div></div><div><span data-slider-type="hips1" data-type="hips1Desc" class="measurement-description-icon icon">?</span></div></div></div></section><h2 class="group_header "><span>+</span> Lower Body<span class="obligatoriness">(optional)</span></h2><section data-type="Lower Body" style="display: none;" class="measurements-group"><div><div><div>Waist height</div><div style="" class="slider-container"><div data-type="outSeam" data-value="0" data-max="149" data-min="77" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="149" data-min="77" name="outSeam" value="0"></span></a></div></div><div><span data-slider-type="outSeam" data-type="outSeamDesc" class="measurement-description-icon icon">?</span></div></div></div><div><div><div>Inseam</div><div style="" class="slider-container"><div data-type="inSeam" data-value="0" data-max="121" data-min="42" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="121" data-min="42" name="inSeam" value="0"></span></a></div></div><div><span data-slider-type="inSeam" data-type="inSeamDesc" class="measurement-description-icon icon">?</span></div></div></div><div><div><div>Upper Thigh</div><div style="" class="slider-container"><div data-type="thigh" data-value="0" data-max="98" data-min="22" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="98" data-min="22" name="thigh" value="0"></span></a></div></div><div><span data-slider-type="thigh" data-type="thighDesc" class="measurement-description-icon icon">?</span></div></div></div><div><div><div>Mid Thigh</div><div style="" class="slider-container"><div data-type="lowThigh" data-value="0" data-max="80" data-min="21" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="80" data-min="21" name="lowThigh" value="0"></span></a></div></div><div><span data-slider-type="lowThigh" data-type="lowThighDesc" class="measurement-description-icon icon">?</span></div></div></div><div><div><div>Calf</div><div style="" class="slider-container"><div data-type="calf" data-value="0" data-max="62" data-min="12" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="62" data-min="12" name="calf" value="0"></span></a></div></div><div><span data-slider-type="calf" data-type="calfDesc" class="measurement-description-icon icon">?</span></div></div></div></section><h2 class="group_header "><span>+</span> Upper Body<span class="obligatoriness">(optional)</span></h2><section data-type="Upper Body" style="display: none;" class="measurements-group"><div><div><div>Bust height</div><div style="" class="slider-container"><div data-type="bustHeight" data-value="0" data-max="18" data-min="1" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="18" data-min="1" name="bustHeight" value="0"></span></a></div></div><div><span data-slider-type="bustHeight" data-type="bustHeightDesc" class="measurement-description-icon icon">?</span></div></div></div><div><div><div>Bust-Points</div><div style="" class="slider-container"><div data-type="bustpointWidth" data-value="0" data-max="37" data-min="6" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="37" data-min="6" name="bustpointWidth" value="0"></span></a></div></div><div><span data-slider-type="bustpointWidth" data-type="bustpointWidthDesc" class="measurement-description-icon icon">?</span></div></div></div><div><div><div>X-shoulders</div><div style="" class="slider-container"><div data-type="crossShoulders" data-value="0" data-max="55" data-min="22" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="55" data-min="22" name="crossShoulders" value="0"></span></a></div></div><div><span data-slider-type="crossShoulders" data-type="crossShouldersDesc" class="measurement-description-icon icon">?</span></div></div></div><div><div><div>Neck</div><div style="" class="slider-container"><div data-type="neck" data-value="0" data-max="49" data-min="17" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="49" data-min="17" name="neck" value="0"></span></a></div></div><div><span data-slider-type="neck" data-type="neckDesc" class="measurement-description-icon icon">?</span></div></div></div></section><h2 class="group_header "><span>+</span> Arms<span class="obligatoriness">(optional)</span></h2><section data-type="Arms" style="display: none;" class="measurements-group"><div><div><div>Arms length</div><div style="" class="slider-container"><div data-type="armLength" data-value="0" data-max="84" data-min="34" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="84" data-min="34" name="armLength" value="0"></span></a></div></div><div><span data-slider-type="armLength" data-type="armLengthDesc" class="measurement-description-icon icon">?</span></div></div></div><div><div><div>Biceps</div><div style="" class="slider-container"><div data-type="biceps" data-value="0" data-max="53" data-min="13" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="53" data-min="13" name="biceps" value="0"></span></a></div></div><div><span data-slider-type="biceps" data-type="bicepsDesc" class="measurement-description-icon icon">?</span></div></div></div><div><div><div>Forearm</div><div style="" class="slider-container"><div data-type="forearm" data-value="0" data-max="40" data-min="13" class="slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><div class="ui-slider-range ui-widget-header ui-corner-all ui-slider-range-min" style="width: 0%;"></div><a tabindex="0" class="ui-slider-handle ui-state-default ui-corner-all" style="left: 0%;"><span class="slider-value"><input type="text" data-max="40" data-min="13" name="forearm" value="0"></span></a></div></div><div><span data-slider-type="forearm" data-type="forearmDesc" class="measurement-description-icon icon">?</span></div></div></div></section>' +
'                <div id="measurementFooter">' +
'                    <input type="checkbox" checked="" id="rememberMeasurements">' +
'                    <label for="rememberMeasurements">Remember my measurements</label>' +
'                    <button class="button" id="setMeasurementsButton">OK</button>' +
'                </div>' +
'            </div>' +
'        </div>' +
'        <div style="display:none;" id="tabs-2" class="right-border measures-list tab_item ui-tabs-panel ui-widget-content ui-corner-bottom" aria-labelledby="ui-id-2" role="tabpanel" aria-hidden="true">' +
'            <h1 class="betch_caption">avatars</h1>' +
'            <div id="hairs" class="thumbnails-list"><ul><li data-hair="casuallayered-medium-brown" data-name="aline" class="hair_select"><img alt="aline" src="http://widget.trimirror.com/BinaryData/SyncPictures/Individuals/aline.jpg"></li><li data-hair="chignon-dishwaterblond" data-name="gisele" class="hair_select"><img alt="gisele" src="http://widget.trimirror.com/BinaryData/SyncPictures/Individuals/gisele.jpg"></li><li data-hair="bun-brown" data-name="miranda" class="hair_select active_image"><img alt="miranda" src="http://widget.trimirror.com/BinaryData/SyncPictures/Individuals/miranda.jpg"></li><li data-hair="updowithbandana-black" data-name="sofia" class="hair_select"><img alt="sofia" src="http://widget.trimirror.com/BinaryData/SyncPictures/Individuals/sofia.jpg"></li><li data-hair="highvolumebobcutwithbang-medium-black" data-name="tyra" class="hair_select"><img alt="tyra" src="http://widget.trimirror.com/BinaryData/SyncPictures/Individuals/tyra.jpg"></li></ul></div>' +
'        </div>' +
'        <div style="display:none;" id="tabs-3" class="right-border measures-list tab_item ui-tabs-panel ui-widget-content ui-corner-bottom" aria-labelledby="ui-id-3" role="tabpanel" aria-hidden="true">' +
'            <h1 class="betch_caption">shoes catalog</h1>' +
'            <div id="shoes_catalog" class="thumbnails-list shoes-list-template"><ul><li data-name="converse-womens-chucktaylorallstarfreshcolors-larkspur" class="shoes_select"><img alt="converse-womens-chucktaylorallstarfreshcolors-larkspur" src="http://widget.trimirror.com/BinaryData/SyncPictures/Shoes/converse-womens-chucktaylorallstarfreshcolors-larkspur.jpg"></li><li data-name="kennethcole-womens-battlefieldheel-pewter" class="shoes_select"><img alt="kennethcole-womens-battlefieldheel-pewter" src="http://widget.trimirror.com/BinaryData/SyncPictures/Shoes/kennethcole-womens-battlefieldheel-pewter.jpg"></li><li data-name="kennethcole-womens-bonalwaysbootie-whiteblack" class="shoes_select"><img alt="kennethcole-womens-bonalwaysbootie-whiteblack" src="http://widget.trimirror.com/BinaryData/SyncPictures/Shoes/kennethcole-womens-bonalwaysbootie-whiteblack.jpg"></li><li data-name="kennethcole-womens-stayherepump-blacklatte" class="shoes_select"><img alt="kennethcole-womens-stayherepump-blacklatte" src="http://widget.trimirror.com/BinaryData/SyncPictures/Shoes/kennethcole-womens-stayherepump-blacklatte.jpg"></li><li data-name="prism-womens-monochromeespadrilles-blackleather" class="shoes_select"><img alt="prism-womens-monochromeespadrilles-blackleather" src="http://widget.trimirror.com/BinaryData/SyncPictures/Shoes/prism-womens-monochromeespadrilles-blackleather.jpg"></li><li data-name="trimirror-womens-balletflat-black" class="shoes_select"><img alt="trimirror-womens-balletflat-black" src="http://widget.trimirror.com/BinaryData/SyncPictures/Shoes/trimirror-womens-balletflat-black.jpg"></li><li data-name="trimirror-womens-dresssandals-black" class="shoes_select"><img alt="trimirror-womens-dresssandals-black" src="http://widget.trimirror.com/BinaryData/SyncPictures/Shoes/trimirror-womens-dresssandals-black.jpg"></li><li data-name="trimirror-womens-highheelpumps-black" class="shoes_select"><img alt="trimirror-womens-highheelpumps-black" src="http://widget.trimirror.com/BinaryData/SyncPictures/Shoes/trimirror-womens-highheelpumps-black.jpg"></li><li data-name="trimirror-womens-highheelsandals-black" class="shoes_select active_image"><img alt="trimirror-womens-highheelsandals-black" src="http://widget.trimirror.com/BinaryData/SyncPictures/Shoes/trimirror-womens-highheelsandals-black.jpg"></li><li data-name="valentinogaravani-womens-rockstudballetpump-beigeandleopardprintleather" class="shoes_select"><img alt="valentinogaravani-womens-rockstudballetpump-beigeandleopardprintleather" src="http://widget.trimirror.com/BinaryData/SyncPictures/Shoes/valentinogaravani-womens-rockstudballetpump-beigeandleopardprintleather.jpg"></li></ul></div>' +
'        </div>' +
'        <div class="tab_item">' +
'            <div class="avatar-preview" id="measurementsAvatarLookContainer">' +
'                <div data-set="false" id="avatar-look-widget" class="img-container">' +
'                    <img data-view="1" src="" style="display:inline" alt="User Avatar" id="avatarPreviewImg">' +
'                    <div style="" class="show-next-avatar-preview-img-icon icon show-avatar-preview-img-icon"> </div>' +
'                    <div style="" class="show-prev-avatar-preview-img-icon icon show-avatar-preview-img-icon"> </div>' +
'                </div>' +
'                <img style="display: inline-block;" id="heightDesc" src="http://widget.trimirror.com/Content/images/height-desc.jpg" alt="measurement description" class="measurement-description-img">' +
'                <img style="display: none;" id="underBustDesc" src="http://widget.trimirror.com/Content/images/underBust-desc.jpg" alt="measurement description" class="measurement-description-img">' +
'                <img style="display: none;" id="bustDesc" src="http://widget.trimirror.com/Content/images/bust-desc.jpg" alt="measurement description" class="measurement-description-img">' +
'                <img style="display: none;" id="waist1Desc" src="http://widget.trimirror.com/Content/images/waist1-desc.jpg" alt="measurement description" class="measurement-description-img">' +
'                <img style="display: none;" id="hips1Desc" src="http://widget.trimirror.com/Content/images/hips1-desc.jpg" alt="measurement description" class="measurement-description-img">' +
'                <img style="display: none;" src="http://widget.trimirror.com/Content/images/inSeam-desc.jpg" alt="measurement description" class="measurement-description-img" id="inSeamDesc">' +
'                <img style="display: none;" src="http://widget.trimirror.com/Content/images/outSeam-desc.jpg" alt="measurement description" class="measurement-description-img" id="outSeamDesc">' +
'                <img style="display: none;" src="http://widget.trimirror.com/Content/images/thigh-desc.jpg" alt="measurement description" class="measurement-description-img" id="thighDesc">' +
'                <img style="display: none;" src="http://widget.trimirror.com/Content/images/lowThigh-desc.jpg" alt="measurement description" class="measurement-description-img" id="lowThighDesc">' +
'                <img style="display: none;" src="http://widget.trimirror.com/Content/images/calf-desc.jpg" alt="measurement description" class="measurement-description-img" id="calfDesc">' +
'                <img style="display: none;" src="http://widget.trimirror.com/Content/images/bustHeight-desc.jpg" alt="measurement description" class="measurement-description-img" id="bustHeightDesc">' +
'                <img style="display: none;" src="http://widget.trimirror.com/Content/images/bustpointWidth-desc.jpg" alt="measurement description" class="measurement-description-img" id="bustpointWidthDesc">' +
'                <img style="display: none;" src="http://widget.trimirror.com/Content/images/crossShoulders-desc.jpg" alt="measurement description" class="measurement-description-img" id="crossShouldersDesc">' +
'                <img style="display: none;" src="http://widget.trimirror.com/Content/images/neck-desc.jpg" alt="measurement description" class="measurement-description-img" id="neckDesc">' +
'                <img style="display: none;" src="http://widget.trimirror.com/Content/images/armLength-desc.jpg" alt="measurement description" class="measurement-description-img" id="armLengthDesc">' +
'                <img style="display: none;" src="http://widget.trimirror.com/Content/images/biceps-desc.jpg" alt="measurement description" class="measurement-description-img" id="bicepsDesc">' +
'                <img style="display: none;" src="http://widget.trimirror.com/Content/images/forearm-desc.jpg" alt="measurement description" class="measurement-description-img" id="forearmDesc">' +
'                <div class="close-measurements-description-icon">x</div>' +
'                <button style="display:none;width:200px;bottom:10px;right:10px;position:absolute" onclick="" class="button button_widget" id="create-avatar-correct">Let's go shopping</button>' +
'            </div>' +
'        </div>' +
'    </div>' +
'</div>');
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
        }
        return false;
    });

    if (IsMobile()) {
        $("#measurementsAvatarLookContainer").parent().attr("id", "tabs-4")
        $("#tabs_list").append("<li id='look_tab' style='display:none;'><a href='#tabs-4'>Look</a></li>");
    }
    $("#tabs").tabs();
    return false;
}

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
            $("#create-avatar-correct").attr("onclick", "window.location.href='/Collection/Women';return false;");
        else
            $("#create-avatar-correct").attr("onclick", "window.location.href='/Collection/Men';return false;");

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