from typing import List, Dict, Union

acceptable_states = ["running", "stopped", "terminated"]
acceptable_types = ["t2.micro", "t1.micro"]

def check_params(params_received: List[str], acceptable_params: List[str]):
    if len(params_received) == 0:
        return True
    for param_received in params_received.split("_"):
        if param_received not in acceptable_params:
            return False
    return True