const data: DataModel = new DataModel();
const render = RenderModule();

data.GetInstanceByTypeAndStates().then(() => {
    render.renderInstances(data.Ec2Instaces);
});

$("body").on("click", ".resume-button", async function () {
    let instance_id: string = $(this).closest(".card-content").find(".card-id").text().split(":")[1]
    data.operate(instance_id,"running")
});

$("body").on("click", ".stop-button", async function () {
    let instance_id: string = $(this).closest(".card-content").find(".card-id").text().split(":")[1]
    data.operate(instance_id,"stopped")
});

$("body").on("click", ".power-off-button", async function () {
    let instance_id: string = $(this).closest(".card-content").find(".card-id").text().split(":")[1]
    data.operate(instance_id,"terminated")
});
$("body").on("click", ".refresh-button", async function () {
    let instance_id: string = $(this).closest(".card-content").find(".card-id").text().split(":")[1]
    data.operate(instance_id,"reboot")   
});
