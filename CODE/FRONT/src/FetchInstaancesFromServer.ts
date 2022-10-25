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
}
