"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Card,
  Title,
  Group,
  Text,
  Button,
  ActionIcon,
  TextInput,
  Select,
  Table,
  Badge,
  ScrollArea,
  Pagination,
  Modal,
  Stack,
  Divider,
  Avatar,
  Tooltip,
  Checkbox,
  Alert,
} from "@mantine/core";
import {
  IconMail,
  IconSearch,
  IconEye,
  IconTrash,
  IconDownload,
  IconCheck,
  IconX,
  IconMailForward,
  IconInbox,
  IconFilter,
} from "@tabler/icons-react";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  createdAt: string; // ISO
  read: boolean;
};

const initialMessages: Message[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    subject: "Inquiry about product availability",
    body: "Hello, I'd like to ask if the SE-100 model is available for immediate purchase. Also, do you ship internationally?",
    createdAt: "2025-01-20T09:30:00Z",
    read: false,
  },
  {
    id: "2",
    name: "Ben Carter",
    email: "ben.carter@example.com",
    subject: "Bulk order pricing",
    body: "Could you provide bulk pricing for 200 units, including lead time and shipping?",
    createdAt: "2025-01-18T14:50:00Z",
    read: true,
  },
  {
    id: "3",
    name: "Chloe Kim",
    email: "chloe.kim@example.com",
    subject: "Partnership opportunity",
    body: "We are interested in a distribution partnership in APAC. Are you open to discussing terms?",
    createdAt: "2025-01-17T11:10:00Z",
    read: false,
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [viewOpen, setViewOpen] = useState(false);
  const [toView, setToView] = useState<Message | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const pageSize = 10;

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return messages.filter((m) => {
      const matchTerm =
        !s ||
        m.name.toLowerCase().includes(s) ||
        m.email.toLowerCase().includes(s) ||
        m.subject.toLowerCase().includes(s) ||
        m.body.toLowerCase().includes(s);
      const matchStatus = status === "all" || (status === "read" ? m.read : !m.read);
      return matchTerm && matchStatus;
    });
  }, [messages, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const allOnPageSelected = paged.every((m) => selectedIds.has(m.id)) && paged.length > 0;
  const someOnPageSelected = !allOnPageSelected && paged.some((m) => selectedIds.has(m.id));

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAllOnPage = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) {
        paged.forEach((m) => next.delete(m.id));
      } else {
        paged.forEach((m) => next.add(m.id));
      }
      return next;
    });
  };

  const markRead = (ids: string[], read: boolean) => {
    setMessages((prev) => prev.map((m) => (ids.includes(m.id) ? { ...m, read } : m)));
    setSelectedIds(new Set());
  };

  const deleteMessages = (ids: string[]) => {
    setMessages((prev) => prev.filter((m) => !ids.includes(m.id)));
    setSelectedIds(new Set());
  };

  const exportCSV = (ids: string[]) => {
    const rows = messages.filter((m) => ids.includes(m.id));
    const header = ["id", "name", "email", "subject", "body", "createdAt", "read"]; 
    const csv = [
      header.join(","),
      ...rows.map((r) =>
        header
          .map((key) => {
            const val = String((r as any)[key]).replace(/"/g, '""');
            return `"${val}"`;
          })
          .join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `messages-export-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openView = (m: Message) => {
    setToView(m);
    setViewOpen(true);
    if (!m.read) markRead([m.id], true);
  };

  const selectedArray = Array.from(selectedIds);

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl" c="white">
        <IconInbox size={28} style={{ marginRight: 10 }} /> Messages
      </Title>

      <Card withBorder p="md" bg="dark.6">
        <Group justify="space-between" mb="md" wrap="wrap">
          <Group>
            <TextInput
              placeholder="Search name, email, subject, content..."
              leftSection={<IconSearch size={16} />}
              value={search}
              onChange={(e) => { setPage(1); setSearch(e.currentTarget.value); }}
              w={320}
            />
            <Select
              placeholder="Filter"
              leftSection={<IconFilter size={16} />}
              data={[
                { value: "all", label: "All" },
                { value: "unread", label: "Unread" },
                { value: "read", label: "Read" },
              ]}
              value={status}
              onChange={(v) => { setPage(1); setStatus(v || "all"); }}
              w={140}
            />
          </Group>

          <Group>
            <Button
              variant="light"
              color="brand"
              leftSection={<IconCheck size={16} />}
              disabled={selectedArray.length === 0}
              onClick={() => markRead(selectedArray, true)}
            >
              Mark read
            </Button>
            <Button
              variant="light"
              color="brand"
              leftSection={<IconX size={16} />}
              disabled={selectedArray.length === 0}
              onClick={() => markRead(selectedArray, false)}
            >
              Mark unread
            </Button>
            <Button
              variant="light"
              color="red"
              leftSection={<IconTrash size={16} />}
              disabled={selectedArray.length === 0}
              onClick={() => setConfirmOpen(true)}
            >
              Delete
            </Button>
            <Button
              variant="light"
              color="brand"
              leftSection={<IconDownload size={16} />}
              disabled={selectedArray.length === 0}
              onClick={() => exportCSV(selectedArray)}
            >
              Export
            </Button>
          </Group>
        </Group>

        <ScrollArea>
          <Table verticalSpacing="sm" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: 36 }}>
                  <Checkbox
                    checked={allOnPageSelected}
                    indeterminate={someOnPageSelected}
                    onChange={toggleAllOnPage}
                    aria-label="Select all"
                  />
                </Table.Th>
                <Table.Th>From</Table.Th>
                <Table.Th>Subject</Table.Th>
                <Table.Th>Received</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paged.map((m) => (
                <Table.Tr key={m.id} style={{ background: m.read ? undefined : "rgba(34,139,230,0.12)" }}>
                  <Table.Td>
                    <Checkbox checked={selectedIds.has(m.id)} onChange={() => toggleRow(m.id)} aria-label={`Select message ${m.id}`} />
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Avatar color={m.read ? "gray" : "blue"} radius="xl" size="sm">
                        {m.name.split(" ").map((n) => n[0]).join("")}
                      </Avatar>
                      <div>
                        <Text fw={600} size="sm">{m.name}</Text>
                        <Text size="xs" c="dimmed">{m.email}</Text>
                      </div>
                      {!m.read && <Badge color="blue" variant="light">Unread</Badge>}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" lineClamp={1}>{m.subject}</Text>
                    <Text size="xs" c="dimmed" lineClamp={1}>{m.body}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{new Date(m.createdAt).toLocaleString()}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Tooltip label="Open">
                        <ActionIcon variant="light" color="blue" onClick={() => openView(m)} aria-label="Open message">
                          <IconEye size={16} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label={m.read ? "Mark unread" : "Mark read"}>
                        <ActionIcon
                          variant="light"
                          color={m.read ? "gray" : "green"}
                          onClick={() => markRead([m.id], !m.read)}
                          aria-label={m.read ? "Mark unread" : "Mark read"}
                        >
                          {m.read ? <IconX size={16} /> : <IconCheck size={16} />}
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <ActionIcon variant="light" color="red" onClick={() => { setSelectedIds(new Set([m.id])); setConfirmOpen(true); }} aria-label="Delete message">
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>

        {filtered.length === 0 && (
          <Alert color="blue" mt="md" title="No messages found">
            Try changing your search or filters.
          </Alert>
        )}

        {filtered.length > 0 && (
          <Group justify="center" mt="md">
            <Pagination total={totalPages} value={page} onChange={setPage} color="blue" />
          </Group>
        )}
      </Card>

      {/* View message */}
      <Modal opened={viewOpen} onClose={() => setViewOpen(false)} title="Message details" size="lg" centered>
        {toView && (
          <Stack>
            <Group justify="space-between">
              <div>
                <Title order={3}>{toView.subject}</Title>
                <Text size="sm" c="dimmed">Received: {new Date(toView.createdAt).toLocaleString()}</Text>
              </div>
              {!toView.read && <Badge color="blue" variant="light">Unread</Badge>}
            </Group>

            <Divider />

            <Group>
              <Avatar color="blue" radius="xl" size="md">{toView.name.split(" ").map((n) => n[0]).join("")}</Avatar>
              <div>
                <Text fw={600}>{toView.name}</Text>
                <Text size="sm" c="dimmed">{toView.email}</Text>
              </div>
            </Group>

            <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>{toView.body}</Text>

            <Group justify="flex-end" mt="md">
              <Button variant="light" leftSection={<IconMailForward size={16} />} component="a" href={`mailto:${toView.email}?subject=Re: ${encodeURIComponent(toView.subject)}`}>
                Reply
              </Button>
              <Button variant="light" color="red" leftSection={<IconTrash size={16} />} onClick={() => { setSelectedIds(new Set([toView.id])); setViewOpen(false); setConfirmOpen(true); }}>
                Delete
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* Confirm delete */}
      <Modal opened={confirmOpen} onClose={() => setConfirmOpen(false)} title="Delete messages" centered>
        <Stack>
          <Text>Are you sure you want to delete {selectedArray.length} selected message(s)? This cannot be undone.</Text>
          <Group justify="flex-end">
            <Button variant="light" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button color="red" onClick={() => { deleteMessages(selectedArray); setConfirmOpen(false); }}>Delete</Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}


