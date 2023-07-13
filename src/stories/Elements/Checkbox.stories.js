import { Checkbox } from "../../components/Elements/Checkbox";

export default {
  title: "Elements/Form elements",
  component: Checkbox,
  argTypes: {
    labels: {
      control: { type: "array" },
      description: "Array of checkbox labels",
    },
  },
};

export const CheckboxGroup = (args) => {
  const { labels } = args;
  return (
    <>
      <h1>Where do you wear Travismathew?</h1>
      <br />
      {labels.length ? (
        labels.map((label, index) => <Checkbox key={index} label={label} />)
      ) : (
        <Checkbox label={""} />
      )}
    </>
  );
};

CheckboxGroup.args = {
  labels: ["Work", "Golf", "Dinner & drinks", "Working out", "Vacation"],
};