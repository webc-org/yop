import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, Image, Logo } from 'base'
import { LayoutDashboard, LogOut, UserCog } from 'lucide-react'
import {
  DashboardBrand,
  DashboardLayout,
  DashboardMain,
  DashboardMainHeader,
  DashboardMainTitle,
  DashboardNav,
  DashboardNavLink,
  DashboardNavTitle,
  DashboardSidebar,
} from './index'

const meta: Meta = {
  title: 'Sections/Dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'grey',
      values: [{ name: 'grey', value: 'var(--color-grey-6)' }],
    },
  },
}

export default meta
type Story = StoryObj

export const DashboardPage: Story = {
  render: () => (
    <DashboardLayout>
      <DashboardSidebar>
        <DashboardBrand>
          <Logo href="/">
            <Image
              src="/pushui_black.svg"
              alt="Push UI"
              width={81}
              height={28}
            />
          </Logo>
        </DashboardBrand>

        <DashboardNav>
          <DashboardNavTitle>General</DashboardNavTitle>
          <DashboardNavLink href="/dashboard" current>
            <LayoutDashboard size={21} />
            Dashboard
          </DashboardNavLink>
          <DashboardNavLink href="/dashboard/account">
            <UserCog size={21} />
            Account
          </DashboardNavLink>
        </DashboardNav>

        <DashboardNav>
          <DashboardNavTitle>Account</DashboardNavTitle>
          <DashboardNavLink asChild>
            <button type="button">
              <LogOut size={21} />
              Logout
            </button>
          </DashboardNavLink>
        </DashboardNav>
      </DashboardSidebar>

      <DashboardMain>
        <DashboardMainHeader>
          <DashboardMainTitle>Welcome Joe</DashboardMainTitle>
          <Avatar
            name="johndoe"
            width="6rem"
            fontSize={6}
            variant="default"
          />
        </DashboardMainHeader>
      </DashboardMain>
    </DashboardLayout>
  ),
}
