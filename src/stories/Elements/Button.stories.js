import { Button } from "/components/Elements/Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Elements/Button",
  component: Button,
  tags: ["autodocs"],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PrimaryBlack = {
  args: {
    label: "Shop Now",
    type: "primary-black",
  },
};

export const PrimaryWhite = {
  args: {
    label: "Shop Now",
    type: "primary-white",
  },
};

export const PrimaryOutlined = {
  args: {
    label: "Shop Now",
    type: "primary-outlined",
  },
};

export const SecondaryBlack = {
  args: {
    label: "Shop Now",
    type: "secondary-black",
  },
};

export const SecondaryWhite = {
  args: {
    label: "Shop Now",
    type: "secondary-white",
  },
};