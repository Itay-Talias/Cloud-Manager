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
const data = new DataModel();
const render = RenderModule();
data.GetInstanceByTypeAndStates().then(() => {
    render.renderInstances(data.Ec2Instaces);
});
$("card").on("click", ".resume-button", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let instance_id = this.closest(".card").find(".ec2_name").text();
    });
});
$("card").on("click", ".stop-button", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let instance_id = this.closest(".card").find(".ec2_name").text();
    });
});
$("card").on("click", ".power-off-button", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let instance_id = this.closest(".card").find(".ec2_name").text();
    });
});
$("card").on("click", ".refresh-button", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let instance_id = this.closest(".card").find(".ec2_name").text();
    });
});
