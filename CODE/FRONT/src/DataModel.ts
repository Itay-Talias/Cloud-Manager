class DataModel {
    private _ec2Instaces: EC2_Instance[];

    constructor() {
        this._ec2Instaces = [] as EC2_Instance[];
    }

    public get Ec2Instaces(): EC2_Instance[] {
        return this._ec2Instaces;
    }

    public async GetInstanceByTypeAndStates(
        states: string = "",
        types: string = ""
    ) {
        this._ec2Instaces =
            await FetchInstancesFromServer.FetchInstanceByTypeAndStates(
                states,
                types
            );
    }

    public async operate(instance_id: string,new_state: string){
        $.ajax({
            url: `/instances/${instance_id}`,
            type: 'PATCH',
            dataType: 'json',
            data: {
                "state": new_state
            },
            success: function(res) {
                console.log(res);
            },
            error: function(response) {
                console.log(response);
            }
        });
    }
    public filterInstancesByStatesAndTypes(states: string, types: string){
        let filtered_instances = this._ec2Instaces.filter(instance => states.split("_").includes(instance["State"])
                                &&types.split("_").includes(instance["Type"]));
        return filtered_instances;
    }
}
