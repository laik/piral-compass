import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, createMuiTheme, ExpansionPanelActions } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';
const theme = createMuiTheme({
    overrides: {
        MuiAccordionDetails: {
            root: {
                display: "gird",
            }
        },
        MuiPaper: {
            root: {
                color: "",
            },
        }
    },
});
const defaultProps = {
    defaultExpanded: true,
    useExpandIcon: true,
    useDivider: true,
    key: ""
};
export class Collapse extends React.Component {
    render() {
        const { key, useExpandIcon, useDivider, panelName, panelAction, defaultExpanded, extraExpand, children } = this.props;
        return (<ThemeProvider theme={theme}>
        <Accordion key={key} defaultExpanded={defaultExpanded}>
          <AccordionSummary expandIcon={<div>
                {extraExpand}
                {useExpandIcon ? <ExpandMoreIcon /> : null}
              </div>} aria-controls="panel1bh-content" id="panel1bh-header">
            {panelName}
          </AccordionSummary>
          {useDivider ? <Divider /> : null}
          <AccordionDetails>
            {children}
          </AccordionDetails>
          {panelAction ? <ExpansionPanelActions>{panelAction}</ExpansionPanelActions> : null}
        </Accordion>
      </ThemeProvider>);
    }
}
Collapse.defaultProps = defaultProps;
//# sourceMappingURL=collapse.jsx.map