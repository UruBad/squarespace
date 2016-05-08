var clientId = "16b58be2625f489a82bed854635fb8b5";
var setMeasurements = "https://widget.trimirror.com/SetMeasurements?clientId=" + clientId + "&userId=#userId#";
var setCharacter = "https://widget.trimirror.com/SetCharacter?clientId=" + clientId + "&userId=#userId#&character=#character#";
var checkMeasurementsUrl = "https://widget.trimirror.com/CheckMeasurements?clientId=" + clientId + "&userId=#userId#";
var measurementsUrl = "https://widget.trimirror.com/GetMeasurements?clientId=" + clientId + "&userId=#userId#";
var setHairUrl = "https://widget.trimirror.com/SetHair?clientId=" + clientId + "&userId=#userId#&individual=#individual#&hair=#hair#&character=#character#";
var setShoesUrl = "https://widget.trimirror.com/SetShoes?clientId=" + clientId + "&userId=#userId#&shoes=#shoes#";
var individualsUrl = "https://widget.trimirror.com/GetIndividuals?clientId=" + clientId + "&userId=#userId#&character=#character#";
var avatarUrls = "https://widget.trimirror.com/GetAvatarUrls?clientId=" + clientId + "&userId=#userId#&width=#width#&height=#height#";

$(document).ready(function () {
    /*if(window.location.href.indexOf("my-avatar") > -1)    {
         MyBetch();
    }    
    else if(!!$("select[data-variant-option-name='Size']")){
        $(".sqs-add-to-cart-button").parent().append('<div id="dressing-room" class="sqs-add-to-cart-button sqs-suppress-edit-mode sqs-editable-button"><div class="sqs-add-to-cart-button-inner" style="opacity: 1; visibility: visible;">Add to Dressing Room</div>');
        $("#dressing-room").click(function(){
            $.ajax({
                type: "GET",
                url: "https://api.vk.com/method/users.get?user_id=66748",
                dataType: "json"
            });
           return false;
        });
    }*/
});

function GenerateGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

function GetUserId() {
    var remember = true;
    if ($("#rememberMeasurements").length > 0) {
        remember = $("#rememberMeasurements").is(':checked');
    }
    var userId;
    var trimirror_cookie = $.cookie('trimirror_anonim_user_id');
    if (trimirror_cookie == null) {
        var userId = GenerateGuid();
        var data = '{"userId": "' + userId + '", "remember": ' + remember + '}';
        if (remember)
            $.cookie('trimirror_anonim_user_id', data, { expires: 365, path: "/" });
        else
            $.cookie('trimirror_anonim_user_id', data, { path: "/" });
    }
    else {
        try {
            userId = $.parseJSON($.cookie('trimirror_anonim_user_id')).userId;
        }
        catch (e) {
            userId = $.cookie('trimirror_anonim_user_id');
        }
        var data = '{"userId": "' + userId + '", "remember": ' + remember + '}';
        if (remember)
            $.cookie('trimirror_anonim_user_id', data, { expires: 365, path: "/" });
        else
            $.cookie('trimirror_anonim_user_id', data, { path: "/" });
    }
    return userId;
}

function OpenWindow(link, title, width, height) {
    window.open(link, title, "width=" + width + ",height=" + height + ",resizable=yes,scrollbars=yes,status=yes");
}

function GetText(value, type) {
    var result = value.toString();
    if (type == "height") {
        var inches = Math.round(value * 0.393700787);
        var feet = Math.floor(inches / 12);
        inches %= 12;
        result = feet + "' " + inches + "''";
    }
    else {
        var Inchies = value / 2.54;
        if (type == "underBust") {
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
    return result;
}
