import {
    RadioButton,
    RadioButtonGroup,
  } from "../../components/Elements/RadioButton";
  
  export default {
    title: "Elements/Form elements",
    component: RadioButton,
    argTypes: {
      labels: {
        control: { type: "array" },
        description: "Array of radio button labels",
      },
      groupLabel: {
        control: { type: "text" },
        description: "Label for the radio button group",
      },
    },
  };
  
  export const RadioGroup = (args) => {
    const { labels, groupLabel } = args;
  
    return <RadioButtonGroup labels={labels} groupLabel={groupLabel} />;
  };
  
  RadioGroup.args = {
    labels: [
      "As often as you can",
      "Once or twice a week",
      "Once or twice a month",
    ],
    groupLabel: "How often do you want to hear from us?",
  };