import { observable } from "mobx";
import { KubeObjectStore } from "compass-base/client/kube-object.store";
import { autobind } from "compass-base/client/utils";
import { DaemonSet, daemonSetApi, IPodMetrics, Pod, podsApi, PodStatus } from "compass-base/client/api/endpoints";
import { podsStore } from "../+workloads-pods/pods.store";
import { apiManager } from "compass-base/client/api/api-manager";

@autobind()
export class DaemonSetStore extends KubeObjectStore<DaemonSet> {
  api = daemonSetApi

  @observable metrics: IPodMetrics = null;

  loadMetrics(daemonSet: DaemonSet) {
    const pods = this.getChildPods(daemonSet);
    return podsApi.getMetrics(pods, daemonSet.getNs(), "").then(metrics =>
      this.metrics = metrics
    );
  }

  getChildPods(daemonSet: DaemonSet): Pod[] {
    return podsStore.getPodsByOwner(daemonSet)
  }

  getStatuses(daemonSets?: DaemonSet[]) {
    const status = { failed: 0, pending: 0, running: 0 }
    daemonSets.forEach(daemonSet => {
      const pods = this.getChildPods(daemonSet)
      if (pods.some(pod => pod.getStatus() === PodStatus.FAILED)) {
        status.failed++
      }
      else if (pods.some(pod => pod.getStatus() === PodStatus.PENDING)) {
        status.pending++
      }
      else {
        status.running++
      }
    })
    return status
  }

  reset() {
    this.metrics = null;
  }
}

export const daemonSetStore = new DaemonSetStore();
apiManager.registerStore(daemonSetApi, daemonSetStore);
