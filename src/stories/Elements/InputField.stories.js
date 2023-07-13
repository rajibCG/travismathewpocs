import { InputField } from "/components/Elements/InputField";
import { Checkbox } from "../../components/Elements/Checkbox";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Elements/Form elements",
  component: InputField,
  argTypes: {
    type: {
      options: ["input", "input-search"],
      control: { type: "radio" },
      defaultValue: "input",
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const InputFields = {
  args: {
    label: "Label",
    placeholder: "Search",
  },
};
// export const Checkbox = {
//   args: {
//     label: "Label",
//     placeholder: "Search",
//   },
// };