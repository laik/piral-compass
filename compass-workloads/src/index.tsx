import * as React from 'react';
import { PiletApi } from 'compass-shell';
import {JobMenu, Jobs} from "./+workloads-jobs";
import {KubeObjectListLayout} from "compass-base/client/components/kube-object/index";
import {jobStore} from "./+workloads-jobs/job.store";
import {eventStore} from "compass-base/client/components/+events/event.store";
import {Job} from "compass-base/client/api/endpoints/job.api";
import {KubeEventIcon} from "compass-base/client/components/+events/kube-event-icon";
import kebabCase from "lodash/kebabCase";

export function setup(app: PiletApi) {
  app.showNotification('Hello from Piral!', {
    autoClose: 2000,
  });
  app.registerPage('/hello',
    () =>
      <KubeObjectListLayout
        className="Jobs"
        store={jobStore}
        dependentStores={[eventStore]}

        searchFilters={[
          (job: Job) => job.getSearchFields(),
        ]}
        renderHeaderTitle={`Jobs`}
        renderTableHeader={[
          { title: `Name`, className: "name",},
          { title: `Namespace`, className: "namespace",},
          { title: `Completions`, className: "completions" },
          { className: "warning" },
          { title: `Age`, className: "age", },
          { title: `Conditions`, className: "conditions", },
        ]}
        renderTableContents={(job: Job) => {
          const condition = job.getCondition();
          return [
            job.getName(),
            job.getNs(),
            `${job.getCompletions()} / ${job.getDesiredCompletions()}`,
            <KubeEventIcon object={job}/>,
            job.getAge(),
            condition && {
              title: condition.type,
              className: kebabCase(condition.type),
            }
          ]
        }}
        renderItemMenu={(item: Job) => {
          return <JobMenu object={item}/>
        }}
    />)
}
