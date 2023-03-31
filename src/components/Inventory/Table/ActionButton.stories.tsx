import { ComponentStory, ComponentMeta } from '@storybook/react'

import ActionButton from './ActionButton'

export default {
  title: 'Inventory/ActionButton',
  component: ActionButton,
} as ComponentMeta<typeof ActionButton>

const Template: ComponentStory<typeof ActionButton> = ({ ...args }) => {
  return (
    <div className="w-24 h-8">
      <ActionButton {...args}>Children</ActionButton>
    </div>
  )
}

export const Default = Template.bind({})
