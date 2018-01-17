define( function () {
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
    
    var requirement = IPython.notebook.metadata.requirements

    var python_code = 
    `import pkg_resources from pkg_resources import DistributionNotFound, VersionConflict import json

    requirements = `+requirement+`
    
    def test_requirement(requirement): try: pkg_resources.require(requirement) except DistributionNotFound as err: return ( err.req.name, err.report() ) except VersionConflict as err: return ( err.req.name, err.report() )
    
    checks = {} for requirement in requirements: check = test_requirement(requirement) if check: checks[check[0]] = check[1]
    
    print json.dumps(checks)`

    var load_ipython_extension = function () {
        compatibility_check_icon();

        var kernel = IPython.notebook.kernel;

        kernel.execute(python_code,
            { iopub : { output : data => handle(JSON.parse(data.content.text)) }
        });

    };
    
    return {
        load_ipython_extension : load_ipython_extension,
    };
    
});