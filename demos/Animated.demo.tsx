import React from "react"
import { Story, Meta } from "@storybook/react"

import { InViewport, InViewportProps } from "./Animated"

export default {
  title: "Animated/inViewport",
  component: InViewport,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta

const Template: Story<InViewport> = (args) => <InViewport {...args} />

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
