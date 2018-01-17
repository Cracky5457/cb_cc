define( function () {
    // change the compatibility icon color based on the compatibility checks
    var handle = function(requirementChecks) {
        const color = Object.keys(requirementChecks).length ? "red" : "green";
        $('#compatibility').css('color', color);
    };
    
    var compatibility_check_icon = function () {
        console.log("load compatibility icon")
        // add compatibility icon if necessary
        if ($('#compatibility').length === 0) {
            $('#notification_area').append('<i id="compatibility" class="kernel_busy_icon" title="Kernel Idle"></i>');
        }
    };
    
    var load_ipython_extension = function () {
        compatibility_check_icon();
    };
    
    return {
        load_ipython_extension : load_ipython_extension,
    };
    
});