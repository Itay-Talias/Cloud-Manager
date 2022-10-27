from AWS_manager import AWS_Manager
from audit_controller import Audit_Controller
from config import AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY
class Cloud_Managers_Controller:
    def __init__(self):
        aws_manager = AWS_Manager(aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
        self.client_cloud_connections = {"cyberark":{"connection":aws_manager ,"audit": Audit_Controller()}}

    def add_client(self, client_name: str, client_access_key_id: str, client_access_secret_key_id: str) -> None:
        aws_manager = AWS_Manager(
            aws_access_key_id=client_access_key_id, aws_secret_access_key=client_access_secret_key_id)
        self.client_cloud_connections[client_name]={"connection": aws_manager,"audit":None}

    def get_client_instance_by_client_name(self, client_name: str) -> AWS_Manager:
        return self.client_cloud_connections[client_name]["connection"]