class FetchDetailsFromAPI {
    private static parsingJSONToEc2Instces(
        ec2InstanceArr: any[]
    ): ec2_instance[] {
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

    public async GetInstanceByTypeAndStates(
        states: string = "",
        types: string = ""
    ): Promise<ec2_instance[]> {
        const ec2InstanceArr = await $.get(
            `./instances?states=${states}&types=${types}`
        );
        return FetchDetailsFromAPI.parsingJSONToEc2Instces(ec2InstanceArr);
    }
}
