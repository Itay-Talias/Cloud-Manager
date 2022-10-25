"use strict";
(function () {
    const data = new DataModel();
    const render = RenderModule();
    data.GetInstanceByTypeAndStates().then(() => {
        render.renderInstances(data.Ec2Instaces);
    });
})();
