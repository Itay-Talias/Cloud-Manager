import boto3
from typing import List, Dict


class AWS_Manager:
    def __init__(self, aws_access_key_id: str, aws_secret_access_key: str):
        self.ec2_resource = boto3.resource("ec2",
                                           aws_access_key_id=aws_access_key_id,
                                           aws_secret_access_key=aws_secret_access_key, region_name="us-west-2")

    def get_instance_info(self, instance_id: str) -> Dict[str, str]:
        instance = self.ec2_resource.Instance(instance_id)
        return {
            "ID": instance.id,
            "Name": instance.tags[0]["Value"] if instance.tags != None else "",
            "State": instance.state["Name"],
            "AMI": instance.image.id,
            "Type": instance.instance_type,
            "Public IPv4 address": instance.public_ip_address
        }
