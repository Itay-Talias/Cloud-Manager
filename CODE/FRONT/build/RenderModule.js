"use strict";
const RenderModule = function () {
    const renderInstances = function (instances) {
        $(".swiper-wrapper").empty();
        let source = $("#instance-card-template").html();
        let template = Handlebars.compile(source);
        $(".swiper-wrapper").append(template({ instances: instances }));
    };
    return {
        renderInstances: renderInstances,
    };
};
