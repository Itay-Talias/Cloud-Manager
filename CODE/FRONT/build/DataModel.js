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
class DataModel {
    constructor() {
        this._ec2Instaces = [];
    }
    get Ec2Instaces() {
        return this._ec2Instaces;
    }
    GetInstanceByTypeAndStates(states = "", types = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this._ec2Instaces =
                yield FetchInstancesFromServer.FetchInstanceByTypeAndStates(states, types);
        });
    }
    operate(instance_id, new_state) {
        return __awaiter(this, void 0, void 0, function* () {
            $.ajax({
                url: `/instances/${instance_id}`,
                type: 'PATCH',
                dataType: 'json',
                data: {
                    "state": new_state
                },
                success: function (res) {
                    console.log(res);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        });
    }
}
