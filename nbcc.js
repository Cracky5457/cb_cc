define(['require', 'jquery', 'base/js/utils', 'base/js/dialog', 'base/js/events', 'base/js/namespace'],
  function (require, $, utils, dialog, events, Jupyter) {
    'use strict';
    // change the compatibility icon color based on the compatibility checks
    var handle = function(requirementChecks) {
        const color = Object.keys(requirementChecks).length ? "red" : "green";
        $('#compatibility').css('color', color);
    };
    
    var compatibility_check_icon = function () {
        console.log("load compatibility icon");
        // add compatibility icon if necessary
        if ($('#compatibility').length === 0) {
            $('#notification_area').append('<i id="compatibility" class="kernel_busy_icon" title="Kernel Idle"></i>');
        }
    };

    var execute_compatibility_check = function() {
        if (IPython.notebook.kernel && IPython.notebook.kernel.is_connected()) {

            var kernel = IPython.notebook.kernel;

            var requirement = IPython.notebook.metadata.requirements

            var python_code = "print 'hello zorld'"
            
            kernel.execute(python_code,{ iopub : 
                { output : data => handle(JSON.parse(data.content.text))}
            });
        }
    }

    var load_ipython_extension = function () {
        compatibility_check_icon();

        $([IPython.events]).on('kernel_ready.Kernel kernel_created.Session notebook_loaded.Notebook', function() {
            execute_compatibility_check();
          });

    };
    
    return {
        load_ipython_extension : load_ipython_extension,
    };
    
});