"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppShell,
  Group,
  Title,
  Text,
  NavLink,
  Burger,
  ActionIcon,
  ScrollArea,
  Image as MantineImage,
  Tooltip,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconGauge, IconInbox, IconUsers, IconSettings, IconBox, IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from "@tabler/icons-react";

export default function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure(); // mobile
  const [collapsed, setCollapsed] = useState(false); // desktop
  const pathname = usePathname();
  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: IconGauge },
    { href: "/admin/products", label: "Products", icon: IconBox },
    { href: "/admin/messages", label: "Messages", icon: IconInbox },
    { href: "/admin/career", label: "Careers", icon: IconUsers },
    { href: "/admin/settings", label: "Settings", icon: IconSettings },
  ];

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{ width: collapsed ? 56 : 240, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="sm"
    >
      <AppShell.Header>
        <Group justify="space-between" h="100%" px="sm">
          <Group gap={8} wrap="nowrap">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" aria-label="Toggle navigation" />
            {!collapsed && (
              <MantineImage src="/imgs/site-logo.png" alt="Seen Group Logo" h={24} w="auto" fit="contain" />
            )}
            <Title order={5} hiddenFrom="sm">SG Admin</Title>
            <Title order={4} visibleFrom="sm">Seen Group Admin</Title>
          </Group>
          <Group gap={6} wrap="nowrap">
            <Tooltip label={collapsed ? "Expand sidebar" : "Collapse sidebar"} withArrow>
              <ActionIcon variant="subtle" onClick={() => setCollapsed((v) => !v)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
                {collapsed ? <IconLayoutSidebarLeftExpand size={18} /> : <IconLayoutSidebarLeftCollapse size={18} />}
              </ActionIcon>
            </Tooltip>
            <Text size="xs" c="dimmed" hiddenFrom="sm">Admin</Text>
            <Text size="sm" c="dimmed" visibleFrom="sm">Admin</Text>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p={6}>
        {collapsed ? (
          <Stack align="center" gap={6}>
            {links.map((l) => {
              const ActiveIcon = l.icon;
              const active = pathname?.startsWith(l.href);
              return (
                <Tooltip key={l.href} label={l.label} position="right" withArrow>
                  <ActionIcon
                    component={Link}
                    href={l.href}
                    variant={active ? "filled" : "subtle"}
                    color={active ? "blue" : "gray"}
                    size="md"
                    aria-label={l.label}
                  >
                    <ActiveIcon size={18} />
                  </ActionIcon>
                </Tooltip>
              );
            })}
          </Stack>
        ) : (
          <ScrollArea type="auto" style={{ height: "100%" }}>
            {links.map((l) => {
              const active = pathname?.startsWith(l.href);
              const Icon = l.icon;
              return (
                <NavLink
                  key={l.href}
                  component={Link}
                  href={l.href}
                  label={l.label}
                  leftSection={<Icon size={18} />}
                  active={!!active}
                  aria-label={l.label}
                />
              );
            })}
          </ScrollArea>
        )}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}


