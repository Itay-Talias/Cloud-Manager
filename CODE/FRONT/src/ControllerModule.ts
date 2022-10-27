const data: DataModel = new DataModel();
const render = RenderModule();

data.GetInstanceByTypeAndStates().then(() => {
    render.renderInstances(data.Ec2Instaces);
});

$("body").on("click", ".resume-button", async function () {
    let instance_id: string = $(this).closest(".card-content").data().id;
    data.operate(instance_id, "running");
    data.changeInstanceState(instance_id, "running");
    render.renderInstances(data.Ec2Instaces);
});

$("body").on("click", ".stop-button", async function () {
    let instance_id: string = $(this).closest(".card-content").data().id;
    data.operate(instance_id, "stopped");
    data.changeInstanceState(instance_id, "stopped");
    render.renderInstances(data.Ec2Instaces);
});

$("body").on("click", ".power-off-button", async function () {
    let instance_id: string = $(this).closest(".card-content").data().id;
    data.operate(instance_id, "terminated");
    data.changeInstanceState(instance_id, "terminated");
    render.renderInstances(data.Ec2Instaces);
});
$("body").on("click", ".refresh-button", async function () {
    let instance_id: string = $(this).closest(".card-content").data().id;
    data.operate(instance_id, "reboot");
    data.changeInstanceState(instance_id, "reboot");
    render.renderInstances(data.Ec2Instaces);
});

$("body").on("click", "#filter-btn", async function name() {
    let states: string = "";
    let types: string = "";
    if ($("#running-check-box:checked").val() == "on") {
        states += "_running";
    }
    if ($("#stopped-check-box:checked").val() == "on") {
        states += "_stopped";
    }
    if ($("#terminated-check-box:checked").val() == "on") {
        states += "_terminated";
    }
    if ($("#reboot-check-box:checked").val() == "on") {
        states += "_reboot";
    }
    if ($("#t2-micro-check-box:checked").val() == "on") {
        types += "_t2.micro";
    }
    if ($("#t1-micro-check-box:checked").val() == "on") {
        types += "_t1.micro";
    }
    if (states.length > 0) {
        states = states.substring(1);
    }
    if (types.length > 0) {
        types = types.substring(1);
    }
    render.renderInstances(data.filterInstancesByStatesAndTypes(states, types));
});

$("body").on("click", ".image", function () {
    let instance_ip: string = $(this)
        .closest(".card-content")
        .find(".ip")
        .text()
        .split(" ")[1];
    if (instance_ip.length != 0) {
        const win = window.open(
            `http://localhost:8888/?hostname=${instance_ip}&username=ec2-user&password=STF0MmEzeTQh`,
            "_blank"
        );
        if (win) {
            win.focus();
        } else {
            alert("Please allow popups for this website");
        }
    } else {
        alert("The ec2 instance is inactive");
    }
});
