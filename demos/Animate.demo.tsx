import React from "react"
import { Story, Meta } from "@storybook/react"

import { Box, BoxProps } from "./Animate"

export default {
  title: "Animate/Box",
  component: Box,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta

const Template: Story<BoxProps> = (args) => <Box {...args} />

export const Primary = Template.bind({})
Primary.args = {}

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
