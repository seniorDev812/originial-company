"use client";

import React from 'react';
import { Container, Title, Text, Card, Grid, Group, ThemeIcon, Stack, Button } from "@mantine/core";
import { IconPackage, IconMail, IconUsers, IconEye, IconArrowRight } from "@tabler/icons-react";

export default function AdminDashboard() {
  const stats = [
    { icon: IconPackage, color: "blue", label: "Total Products", value: "24" },
    { icon: IconMail, color: "green", label: "New Messages", value: "12" },
    { icon: IconUsers, color: "violet", label: "Career Applications", value: "8" },
    { icon: IconEye, color: "orange", label: "Page Views", value: "1,234" },
  ];

  const sections = [
    { title: "Content Management", actions: ["Manage Products", "Edit Homepage", "Update About Page"] },
    { title: "User Management", actions: ["View Messages", "Career Applications", "User Analytics"] },
    { title: "System", actions: ["Settings", "Backup & Restore", "System Logs"] },
  ];

  return (
    <Container size="lg" py="lg">
      <Card radius="lg" withBorder>
        <Title order={2}>Dashboard</Title>
        <Text c="dimmed" mt={4}>Quick overview of key site metrics and actions.</Text>
      </Card>

      <Grid mt="lg">
        {stats.map((s, i) => (
          <Grid.Col key={i} span={{ base: 12, sm: 6, lg: 3 }}>
            <Card radius="lg" withBorder>
              <Group>
                <ThemeIcon variant="light" color={s.color} size={48} radius="md">
                  <s.icon size={24} />
                </ThemeIcon>
                <div>
                  <Text size="sm" c="dimmed">{s.label}</Text>
                  <Title order={3}>{s.value}</Title>
                </div>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Grid mt="lg">
        {sections.map((sec, i) => (
          <Grid.Col key={i} span={{ base: 12, md: 6, lg: 4 }}>
            <Card radius="lg" withBorder>
              <Title order={4} mb="md">{sec.title}</Title>
              <Stack>
                {sec.actions.map((a, j) => (
                  <Button key={j} variant="subtle" color="gray" justify="space-between" rightSection={<IconArrowRight size={16} />}>{a}</Button>
                ))}
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}


