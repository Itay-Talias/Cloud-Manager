"use strict";
const RenderModule = function () {
    const renderInstances = function (instances) {
        $("#instances-container").empty();
        let source = $("#instance-card-template").html();
        let template = Handlebars.compile(source);
        $("#instances-container").append(template({ instances: instances }));
    };
    return {
        renderInstances: renderInstances,
    };
};
