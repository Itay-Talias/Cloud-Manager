import { data } from "jquery";

(function(){
    const data: DataModel = new DataModel();
    const render = RenderModule();

    data.GetInstanceByTypeAndStates().then(() => {
        render.renderInstances(data.Ec2Instaces)
    })
})()

$("card").on("click",".resume-button", async function(){
    let instance_id: string =this.closest(".card").find(".ec2_name").text()
})

$("card").on("click",".stop-button", async function(){
    let instance_id: string =this.closest(".card").find(".ec2_name").text()
})

$("card").on("click",".power-off-button", async function(){
    let instance_id: string =this.closest(".card").find(".ec2_name").text()
})
$("card").on("click",".refresh-button", async function(){
    let instance_id: string =this.closest(".card").find(".ec2_name").text()
    
    
})