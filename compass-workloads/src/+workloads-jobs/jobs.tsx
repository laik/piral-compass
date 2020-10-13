import "./jobs.scss";

import React from "react";
import { observer } from "mobx-react";
import { jobStore } from "./job.store";
import { eventStore } from "compass-base/client/components/+events/event.store";
import { Job, jobApi } from "compass-base/client/api/endpoints/job.api";
import { KubeObjectMenu, KubeObjectMenuProps } from "compass-base/client/components/kube-object/kube-object-menu";
import { KubeObjectListLayout } from "compass-base/client/components/kube-object";
import { KubeEventIcon } from "compass-base/client/components/+events/kube-event-icon";
import kebabCase from "lodash/kebabCase";
import { apiManager } from "compass-base/client/api/api-manager";

import {PageComponentProps} from "compass-shell";

enum sortBy {
  name = "name",
  namespace = "namespace",
  conditions = "conditions",
  age = "age",
}

interface Props extends PageComponentProps {
}

@observer
export class Jobs extends React.Component<Props> {
  render() {
    return (
      <KubeObjectListLayout
        className="Jobs" store={jobStore}
        dependentStores={[eventStore]}
        sortingCallbacks={{
          [sortBy.name]: (job: Job) => job.getName(),
          [sortBy.namespace]: (job: Job) => job.getNs(),
          [sortBy.conditions]: (job: Job) => job.getCondition().type,
          [sortBy.age]: (job: Job) => job.getAge(false),
        }}
        searchFilters={[
          (job: Job) => job.getSearchFields(),
        ]}
        renderHeaderTitle={`Jobs`}
        renderTableHeader={[
          { title: `Name`, className: "name", sortBy: sortBy.name },
          { title: `Namespace`, className: "namespace", sortBy: sortBy.namespace },
          { title: `Completions`, className: "completions" },
          { className: "warning" },
          { title: `Age`, className: "age", sortBy: sortBy.age },
          { title: `Conditions`, className: "conditions", sortBy: sortBy.conditions },
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
      />
    )
  }
}

export function JobMenu(props: KubeObjectMenuProps<Job>) {
  return (
    <KubeObjectMenu {...props}/>
  )
}

apiManager.registerViews(jobApi, {
  Menu: JobMenu,
})