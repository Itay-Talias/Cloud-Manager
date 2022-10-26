const data: DataModel = new DataModel();
const render = RenderModule();

data.GetInstanceByTypeAndStates().then(() => {
    render.renderInstances(data.Ec2Instaces);
});

$("body").on("click", ".resume-button", async function () {
    let instance_id: string = $(this).closest(".card-content").data().id;
    data.operate(instance_id,"running")
    data.changeInstanceState(instance_id,"running")
    render.renderInstances(data.Ec2Instaces)
});

$("body").on("click", ".stop-button", async function () {
    let instance_id: string = $(this).closest(".card-content").data().id;
    data.operate(instance_id,"stopped")
    data.changeInstanceState(instance_id,"stopped")
    render.renderInstances(data.Ec2Instaces)
});

$("body").on("click", ".power-off-button", async function () {
    let instance_id: string = $(this).closest(".card-content").data().id;
    data.operate(instance_id,"terminated")
    data.changeInstanceState(instance_id,"terminated")
    render.renderInstances(data.Ec2Instaces)
});
$("body").on("click", ".refresh-button", async function () {
    let instance_id: string = $(this).closest(".card-content").data().id;
    data.operate(instance_id,"reboot")
    data.changeInstanceState(instance_id,"reboot")
    render.renderInstances(data.Ec2Instaces)   
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
    if ($("#t1-micro-check-box:checked").val() == "on"){
        types+="_t1.micro"
    }
    if(states.length>0){
        states = states.substring(1);
    }
    if(types.length>0){
        types = types.substring(1);
    }
    render.renderInstances(data.filterInstancesByStatesAndTypes(states,types))
})



