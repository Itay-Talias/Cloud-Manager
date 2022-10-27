from datetime import datetime

class Audit_Manager:
    def __init__(self, comapny_name: str) -> None:
        self.audit_file = f"BACK/public/{comapny_name}.txt"
        print(self.audit_file)
    

    def write_activity(self, activity_time: datetime, description: str) -> None:
        with open(self.audit_file, 'a+') as log_file:
            current_time = activity_time.strftime("%H:%M:%S")
            log_file.write(f"{current_time}: {description}")

