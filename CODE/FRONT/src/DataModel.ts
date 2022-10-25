class DataModel {
    private _ec2Instaces: ec2_instance[];
    constructor() {
        this._ec2Instaces = [] as ec2_instance[];
    }
    public get Ec2Instaces(): ec2_instance[] {
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
}
