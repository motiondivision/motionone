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
