"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class FetchInstancesFromServer {
    static parsingJSONToEc2Instces(ec2InstanceArr) {
        return ec2InstanceArr.map((instance) => {
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
    static FetchInstanceByTypeAndStates(states = "", types = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const ec2InstanceArr = yield $.get(`http://localhost:8040/instances?states=${states}&types=${types}`);
            return this.parsingJSONToEc2Instces(ec2InstanceArr);
        });
    }
}
