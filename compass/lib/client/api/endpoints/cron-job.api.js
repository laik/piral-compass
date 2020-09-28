var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import moment from "moment";
import { KubeObject } from "../kube-object";
import { formatDuration } from "../../utils/formatDuration";
import { autobind } from "../../utils";
import { KubeApi } from "../kube-api";
let CronJob = class CronJob extends KubeObject {
    getSuspendFlag() {
        return this.spec.suspend.toString();
    }
    getLastScheduleTime() {
        const diff = moment().diff(this.status.lastScheduleTime);
        return formatDuration(diff, true);
    }
    getSchedule() {
        return this.spec.schedule;
    }
    isNeverRun() {
        const schedule = this.getSchedule();
        const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const stamps = schedule.split(" ");
        const day = Number(stamps[stamps.length - 3]); // 1-31
        const month = Number(stamps[stamps.length - 2]); // 1-12
        if (schedule.startsWith("@"))
            return false;
        return day > daysInMonth[month - 1];
    }
};
CronJob.kind = "CronJob";
CronJob = __decorate([
    autobind()
], CronJob);
export { CronJob };
export const cronJobApi = new KubeApi({
    kind: CronJob.kind,
    apiBase: "/apis/batch/v1beta1/cronjobs",
    isNamespaced: true,
    objectConstructor: CronJob,
});
//# sourceMappingURL=cron-job.api.js.map