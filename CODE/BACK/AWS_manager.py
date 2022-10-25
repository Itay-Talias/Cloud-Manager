import boto3
from dotenv import load_dotenv
from pathlib import Path
from typing import List, Dict


class AWS_Manager:
    def __init__(self, aws_access_key_id: str, aws_secret_access_key: str):
        self.ec2_resource = boto3.resource("ec2",
                                           aws_access_key_id=aws_access_key_id,
                                           aws_secret_access_key=aws_secret_access_key, region_name="us-west-2")
