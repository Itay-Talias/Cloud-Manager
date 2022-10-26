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

    public async operate(instance_id: string, new_state: string) {
        $.ajax({
            url: `/instances/${instance_id}`,
            type: "PATCH",
            dataType: "json",
            data: JSON.stringify({
                state: new_state,
            }),
            success: function (res) {
                console.log(res);
            },
            error: function (response) {
                console.log(response);
            },
        });
    }

    public filterInstancesByStatesAndTypes(
        states: string,
        types: string
    ): EC2_Instance[] {
        let filtered_instances: EC2_Instance[];
        if (states.length > 0 && types.length > 0) {
            filtered_instances = this._ec2Instaces.filter(
                (instance) =>
                    states.split("_").includes(instance.State) &&
                    types.split("_").includes(instance.Type)
            );
        } else if (states.length > 0) {
            filtered_instances = this._ec2Instaces.filter((instance) =>
                states.split("_").includes(instance.State)
            );
        } else if (types.length > 0) {
            filtered_instances = this._ec2Instaces.filter((instance) =>
                types.split("_").includes(instance.Type)
            );
        } else {
            filtered_instances = [];
        }
        return filtered_instances;
    }

    public changeInstanceState(instance_id: string, new_state: string) {
        for (let i = 0; i < this.Ec2Instaces.length; i++) {
            if (this.Ec2Instaces[i].ID == instance_id) {
                this.Ec2Instaces[i].State = new_state;
            }
        }
    }
}
