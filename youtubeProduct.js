var trimirror_code = "";
var trimirror_name = "";
var trimirror_size = "";
var trimirror_color = "";
var trimirror_extcode = "";
var trimirror_extname = "";
var trimirror_extsize = "";
var trimirror_extcolor = "";
// Catwalk
function YoutubeShare() {
    var totalNumber = 0;
    var part = 0;
    var v1 = $("#video1");
    var v2 = $("#video2");
    var pl = $("#catwalk-preloader");
    var youtubeButton = $("#youtube_share");
    var youtubePercent = $("#youtube_percent");
    var youtubeLink = "";
    var youtubeGeneration = false;
    var nextPartLoaded = false;
    var cv = v1; // current video
    var parts = [];
    var awaitPlay = false;
    var hub_started = false;
    var connectionToken;
    var isYoutube = false;

    var isMobile = false;
    var ua = navigator.userAgent;
    log(ua);
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4)))
        isMobile = true;
    if (ua.indexOf('Safari') != -1 && ua.indexOf('Chrome') == -1)
        isMobile = true;

    function loadNextPart() {
        if (parts[part]) {
            cv.attr("src", parts[part]);
            cv[0].load();
            nextPartLoaded = true;
            if (awaitPlay)
                playNextPart();
        } else {
            nextPartLoaded = false;
            setTimeout(loadNextPart, 50);
        }
    }

    function playNextPart() {
        if (!nextPartLoaded) {
            pl.show();
            awaitPlay = true;
            return;
        } else {
            awaitPlay = false;
        }

        pl.hide();

        part++;
        if (part >= totalNumber)
            part = 0;

        var firstVideo = cv === v1;
        var v = firstVideo ? v1 : v2;
        var av = firstVideo ? v2 : v1;
        cv = av;

        v[0].play();
        v.show();

        av.hide();
        loadNextPart();
    }

    function togglePause(v) {
        if (v[0].paused)
            v[0].play();
        else
            v[0].pause();
    }

    function videoEnded() {
        playNextPart();
    }

    v1.on('click', function () {
        togglePause(v1);
    });
    v2.on('click', function () {
        togglePause(v2);
    });

    if (!isMobile) {
        v1.on('ended', videoEnded);
        v2.on('ended', videoEnded);
    }

    function progress(percent, token) {
        log("progress " + percent + "% token=" + token + " connectionToken=" + connectionToken);

        if (token != connectionToken)
            return;

        if (!isYoutube) {
            percent = percent.toFixed(2);
            pl.html(percent + "%");
        }
        else {
            percent = percent.toFixed(0);
            youtubePercent.html(percent + "%");
        }
    }

    $.connection.hub.url = trimirror_url + "/signalr";

    $.connection.hub.start()
      .done(function () {
          log("Hub started");
          hub_started = true;
      })
      .fail(function (e) {
          log('Could not connect to the hub!');
          log(e);
      });

    var hub = $.connection.widgetHub;

    // Hub event: video fragment received
    hub.client.videoFragmentReceived = function (part, number, url, token) {
        log("videoFragmentReceived " + part + "/" + number + " url=" + url + " token=" + token);

        if (token != connectionToken)
            return;

        parts[part] = url;

        // If first part is taken
        if (totalNumber === 0) {
            totalNumber = number;
            loadNextPart(v1);
            setTimeout(playNextPart, 100);
        }
    };

    // Hub event: progress
    hub.client.progressReceived = progress;

    hub.client.videoReceived = function (url, token) {
        log("videoReceived=" + url + " token=" + token + " connectionToken=" + connectionToken);

        if (token != connectionToken)
            return;

        progress(100, token);

        if (!isYoutube) {
            var v = v1;
            v.attr("src", url);
            v[0].load();
            pl.hide();
            $(v[0]).show();
            v[0].play();
        }
        else
            youtubeLink = url;
    };

    function showCatwalk() {
        pl.html("Preparing...");
        pl.show();
        isYoutube = false;

        if (!hub_started) {
            setTimeout(showCatwalk, 500);
            return;
        }

        // re-inint variables
        totalNumber = 0;
        part = 0;
        cv = v1; // current video
        nextPartLoaded = false;
        parts = [];
        awaitPlay = false;

        var connectionId = $.connection.hub.id;

        connectionToken = Guid();

        var query = "?clientId=" + trimirror_clientId + "&userId=" + GetUserId() + "&connectionToken=" + connectionToken + "&code=" + trimirror_code +
            "&color=" + trimirror_color + "&size=" + trimirror_size + "&period=500&width=640&height=480";
        if (trimirror_extcode != "")
            query += "&extcode=" + trimirror_extcode + "&extcolor=" + trimirror_extcolor + "&extsize=" + trimirror_extsize;

        var desktopUrl = video_urls + query + "&duration=2200";
        var mobileUrl = video_progress + query;

        var url = (isMobile ? mobileUrl : desktopUrl) + "&connectionId=" + connectionId;
        log(url);

        $.ajax({
            url: url,
            dataType: "jsonp",
            success: function (data) {
                if (data && data.isSuccess)
                    pl.html("Loading...");
                else
                    pl.html("Server busy. Try again later.");
            },
            error: function (data) {
                log(data);
            }
        });
    }

    function openPopup() {
        $.magnificPopup.open({
            items: {
                src: '#catwalk-wrapper',
                type: 'inline'
            },
            callbacks: {
                close: function () {
                    v1[0].pause();
                    v2[0].pause();
                }
            }
        });

        showCatwalk();
        return false;
    }

    function OpenWindowYoutube() {
        if (youtubeLink == "") {
            setTimeout(OpenWindowYoutube, 500);
            return;
        }

        youtubeButton.show();
        youtubePercent.hide();

        var items = trimirror_name;
        if (trimirror_extcode != "")
            items += "," + trimirror_extname;
        var shareLink = trimirror_url + '/VendorSharing/Youtube?clientId=' + trimirror_clientId + '&videoUrl=' + encodeURIComponent(youtubeLink) + '&items=' + items;
        OpenWindow(shareLink, 'Youtube', 500, 300);
    }

    function generateVideo() {
        youtubeButton.hide();
        youtubePercent.html("0%");
        youtubePercent.show();
        isYoutube = true;


        if (!hub_started) {
            setTimeout(YoutubeVideo, 500);
            return;
        }

        totalNumber = 0;
        part = 0;
        cv = v1; // current video
        nextPartLoaded = false;
        parts = [];
        awaitPlay = false;

        var connectionId = $.connection.hub.id;

        connectionToken = Guid();

        var query = "?clientId=" + trimirror_clientId + "&userId=" + GetUserId() + "&connectionToken=" + connectionToken + "&code=" + trimirror_code +
            "&color=" + trimirror_color + "&size=" + trimirror_size + "&period=500&width=1280&height=720";
        if (trimirror_extcode != "")
            query += "&extcode=" + trimirror_extcode + "&extcolor=" + trimirror_extcolor + "&extsize=" + trimirror_extsize;

        var mobileUrl = video_progress + query;

        var url = mobileUrl + "&connectionId=" + connectionId;
        log(url);

        $.ajax({
            url: url,
            dataType: "jsonp",
            success: function (data) {
                if (data && data.isSuccess) {
                    OpenWindowYoutube();
                }
            },
            error: function (data) { log(data) }
        });
    }

    function YoutubeVideo() {
        youtubeButton = $("#youtube_share");
        youtubePercent = $("#youtube_percent");
        if (youtubeLink == "") {
            generateVideo();
        }
        else {
            OpenWindowYoutube();
        }

        return false;
    }

    $('.catwalk').click(openPopup);
    $('.youtube_share').click(YoutubeVideo);

    // При возникновении события trimirror_catwalk_ready заново делаем подвязку
    $(document).on("trimirror_catwalk_ready", function (event) {
        $('.catwalk').click(openPopup);
        $('.youtube_share').click(YoutubeVideo);
    });


    function log(s) {
        console.log(s);
    }
}

function Guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
