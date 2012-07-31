
// The code below uses require.js, a module system for javscript:
// http://requirejs.org/docs/api.html#define

require.config({
    baseUrl: 'js/lib',
    paths: {'jquery': ['jquery']}
});



// When you write javascript in separate files, list them as
// dependencies along with jquery
define("app", function(require) {

    var $ = require('jquery');

    // If using Twitter Bootstrap, you need to require all the
    // components that you use, like so:
    // require('bootstrap/dropdown');
    // require('bootstrap/alert');


    // **** START HERE: Put your js code here *************
    $().ready(function() {
        var popcorn = Popcorn('#never');
        popcorn.on("timeupdate", function(e) {
            var secs = [18, 22, 26, 31, 35, 40, 43, 45, 47, 51, 53, 56, 60];
            var txtidx = secs.indexOf(popcorn.roundTime());
            if (txtidx === -1) return;
            $('#lyrics').children('li:not(:eq('+txtidx+'))').hide().end()
                        .children('li:eq('+txtidx+')').show();
        });
        popcorn.play(17);
    });
    // ****************************************************


    // Hook up the installation button, feel free to customize how
    // this works

    var install = require('install');

    function updateInstallButton() {
        $(function() {
            var btn = $('.install-btn');
            if(install.state == 'uninstalled') {
                btn.show();
            }
            else if(install.state == 'installed' || install.state == 'unsupported') {
                btn.hide();
            }
        });
    }

    $(function() {
        $('.install-btn').click(install);
    });

    install.on('change', updateInstallButton);

    install.on('error', function(e, err) {
        // Feel free to customize this
        $('.install-error').text(err.toString()).show();
    });

    install.on('showiOSInstall', function() {
        // Feel free to customize this
        var msg = $('.install-ios-msg');
        msg.show();

        setTimeout(function() {
            msg.hide();
        }, 8000);
    });

});

// Include the in-app payments API, and if it fails to load handle it
// gracefully.
// https://developer.mozilla.org/en/Apps/In-app_payments
require(['https://marketplace-cdn.addons.mozilla.net/mozmarket.js'],
        function() {},
        function(err) {
            window.mozmarket = window.mozmarket || {};
            window.mozmarket.buy = function() {
                alert('The in-app purchasing is currently unavailable.');
            };
        });
