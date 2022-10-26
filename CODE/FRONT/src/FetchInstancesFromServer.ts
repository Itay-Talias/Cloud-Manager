class FetchInstancesFromServer {
    private static parsingJSONToEc2Instces(
        ec2InstanceArr: any[]
    ): EC2_Instance[] {
        return ec2InstanceArr.map((instance: any) => {
            return {
                ID: instance.ID,
                Name: instance.Name,
                State: instance.State,
                AMI: instance.AMI,
                Type: instance.Type,
                PublicIPv4Address: instance.Public_IPv4_address,
            };
        });
    }
    public static async FetchInstanceByTypeAndStates(
        states: string = "",
        types: string = ""
    ): Promise<EC2_Instance[]> {
        const ec2InstanceArr = await $.get(
            `http://localhost:8034/instances?states=${states}&types=${types}`
        );
        return this.parsingJSONToEc2Instces(ec2InstanceArr);
    }
}
