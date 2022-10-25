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
            "Public_IPv4_address": instance.public_ip_address
        }

    def filter_instances_by_states(self, states: List[str]) -> List[Dict[str, str]]:
        instances = self.ec2_resource.instances.filter(
            Filters=[
                {
                    "Name": "instance-state-name",
                    "Values": states
                }
            ]
        )

        filtered_instances: List[Dict[str, str]] = []
        for instance in instances:
            filtered_instances.append(self.get_instance_info(instance.id))

        return filtered_instances

    def filter_instances_by_types(self, types: List[str]) -> List[Dict[str, str]]:
        instances = self.ec2_resource.instances.filter(
            Filters=[
                {
                    "Name": "instance-type",
                    "Values": types
                }
            ]
        )

        filtered_instances: List[Dict[str, str]] = []
        for instance in instances:
            filtered_instances.append(self.get_instance_info(instance.id))

        return filtered_instances

    def stop_instance(self, instance_id: str) -> None:
        try:
            instance = self.ec2_resource.Instance(instance_id)
            instance.stop()
            instance.wait_until_stopped()
        except Exception as e:
            print(e)
    

    def start_instance(self, instance_id: str) -> None:
        try:
            instance = self.ec2_resource.Instance(instance_id)
            instance.start()
            instance.wait_until_running()
        except Exception as e:
            print(e)


    def reboot_instance(self, instance_id: str) -> None:
        try:
            instance = self.ec2_resource.Instance(instance_id)
            instance.reboot()
        except Exception as e:
            print(e)
        
    def terminate_instance(self, instance_id: str) -> None:
        try:
            instance = self.ec2_resource.Instance(instance_id)
            instance.terminate()
            instance.wait_until_terminated()
        except Exception as e:
            print(e)
  
