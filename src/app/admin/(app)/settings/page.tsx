"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  Tabs,
  Card,
  TextInput,
  Textarea,
  Group,
  Button,
  ColorInput,
  Switch,
  FileInput,
  SegmentedControl,
  Stack,
  Alert,
  Image as MantineImage,
} from "@mantine/core";
import { IconSettings, IconUpload, IconCheck, IconAlertCircle } from "@tabler/icons-react";

type Settings = {
  siteTitle: string;
  siteTagline: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  darkMode: boolean;
  colorScheme: "light" | "dark" | "auto";
  allowRegistrations: boolean;
};

const defaultSettings: Settings = {
  siteTitle: "Seen Group - We Supply Your Growth",
  siteTagline: "We Supply Your Growth",
  contactEmail: "info@seengroup.com",
  contactPhone: "+1 (555) 123-4567",
  description: "Seen Group provides comprehensive solutions to supply your business growth with innovative products and services.",
  logoUrl: "/imgs/site-logo.png",
  faviconUrl: "/imgs/favicon.ico",
  primaryColor: "#228be6", // Mantine blue
  darkMode: true,
  colorScheme: "dark",
  allowRegistrations: false,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/settings', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (mounted && data?.data) setSettings(data.data);
      } catch {}
    })();
    return () => { mounted = false; };
  }, []);

  const onChange = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved("");
  };

  const onSave = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setError(data?.message || 'Failed to save settings');
      } else {
        setSaved('Settings saved successfully.');
        setTimeout(() => setSaved(''), 2000);
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setSettings(defaultSettings);
    setSaved("");
  };

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl" c="white">
        <IconSettings size={28} style={{ marginRight: 10 }} /> Settings
      </Title>

      <Tabs defaultValue="general" variant="pills" color="blue">
        <Tabs.List mb="md">
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="branding">Branding</Tabs.Tab>
          <Tabs.Tab value="theme">Theme</Tabs.Tab>
          <Tabs.Tab value="security">Security</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general">
          <Card withBorder p="md" bg="dark.6">
            <Stack>
              <TextInput
                label="Site Title"
                value={settings.siteTitle}
                onChange={(e) => onChange("siteTitle", e.currentTarget.value)}
                required
              />
              <TextInput
                label="Tagline"
                value={settings.siteTagline}
                onChange={(e) => onChange("siteTagline", e.currentTarget.value)}
              />
              <TextInput
                label="Contact Email"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => onChange("contactEmail", e.currentTarget.value)}
              />
              <TextInput
                label="Contact Phone"
                value={settings.contactPhone}
                onChange={(e) => onChange("contactPhone", e.currentTarget.value)}
              />
              <Textarea
                label="Description"
                value={settings.description}
                onChange={(e) => onChange("description", e.currentTarget.value)}
                rows={3}
              />
              <Group justify="flex-end" mt="sm">
                <Button variant="light" onClick={onReset}>Reset</Button>
                <Button leftSection={<IconCheck size={16} />} loading={loading} onClick={onSave}>Save</Button>
              </Group>
              {error && (<Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">{error}</Alert>)}
              {saved && (<Alert icon={<IconCheck size={16} />} color="green" variant="light">{saved}</Alert>)}
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="branding">
          <Card withBorder p="md" bg="dark.6">
            <Stack>
              <Group>
                <div>
                  <MantineImage src={settings.logoUrl} alt="Logo" h={40} w="auto" fit="contain" />
                </div>
                <TextInput label="Logo URL" value={settings.logoUrl} onChange={(e) => onChange("logoUrl", e.currentTarget.value)} w={420} />
              </Group>
              <TextInput label="Favicon URL" value={settings.faviconUrl} onChange={(e) => onChange("faviconUrl", e.currentTarget.value)} w={420} />
              <Group justify="flex-end" mt="sm">
                <Button variant="light" onClick={onReset}>Reset</Button>
                <Button leftSection={<IconCheck size={16} />} loading={loading} onClick={onSave}>Save</Button>
              </Group>
              {error && (<Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">{error}</Alert>)}
              {saved && (<Alert icon={<IconCheck size={16} />} color="green" variant="light">{saved}</Alert>)}
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="theme">
          <Card withBorder p="md" bg="dark.6">
            <Stack>
              <ColorInput label="Primary color" value={settings.primaryColor} onChange={(v) => onChange("primaryColor", v)} format="hex" swatches={["#228be6","#15aabf","#12b886","#fab005","#fa5252","#7950f2"]} />
              <SegmentedControl
                value={settings.colorScheme}
                onChange={(v) => onChange("colorScheme", v as Settings["colorScheme"])}
                data={[{ label: "Light", value: "light" }, { label: "Dark", value: "dark" }, { label: "Auto", value: "auto" }]}
              />
              <Switch label="Enable dark mode by default" checked={settings.darkMode} onChange={(e) => onChange("darkMode", e.currentTarget.checked)} />
              <Group justify="flex-end" mt="sm">
                <Button variant="light" onClick={onReset}>Reset</Button>
                <Button leftSection={<IconCheck size={16} />} loading={loading} onClick={onSave}>Save</Button>
              </Group>
              {error && (<Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">{error}</Alert>)}
              {saved && (<Alert icon={<IconCheck size={16} />} color="green" variant="light">{saved}</Alert>)}
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="security">
          <Card withBorder p="md" bg="dark.6">
            <Stack>
              <Switch label="Allow new admin registrations" checked={settings.allowRegistrations} onChange={(e) => onChange("allowRegistrations", e.currentTarget.checked)} />
              <Alert icon={<IconAlertCircle size={16} />} color="yellow" variant="light">
                Security-sensitive settings should be backed by server validation. This UI uses static data and does not persist yet.
              </Alert>
              <Group justify="flex-end" mt="sm">
                <Button variant="light" onClick={onReset}>Reset</Button>
                <Button leftSection={<IconCheck size={16} />} loading={loading} onClick={onSave}>Save</Button>
              </Group>
              {error && (<Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">{error}</Alert>)}
              {saved && (<Alert icon={<IconCheck size={16} />} color="green" variant="light">{saved}</Alert>)}
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}


