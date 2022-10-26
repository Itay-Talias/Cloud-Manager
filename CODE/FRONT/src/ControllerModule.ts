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

$("body").on("click","#filter-btn",async function name() {
    let states: string=""
    let types: string=""
    if ($("#running-check-box:checked").val() == "on"){
        states+="_running"
    }
    if ($("#stopped-check-box:checked").val() == "on"){
        states+="_stopped"
    }
    if ($("#terminated-check-box:checked").val() == "on"){
        states+="_terminated"
    }
    if ($("#reboot-check-box:checked").val() == "on"){
        states+="_reboot"
    }
    if ($("#t2-micro-check-box:checked").val() == "on"){
        types+="_t2.micro"
    }
    if(states.length>0){
        states = states.substring(1);
    }
    if(types.length>0){
        types = types.substring(1);
    }
    render.renderInstances(data.filterInstancesByStatesAndTypes(states,types))
})



