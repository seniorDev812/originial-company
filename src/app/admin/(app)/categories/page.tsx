"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Container, Title, Card, Group, TextInput, Button, Table, ActionIcon, Modal, Stack, Text, Pagination, Tooltip, Badge } from "@mantine/core";
import { IconTags, IconPlus, IconEdit, IconTrash, IconSearch } from "@tabler/icons-react";

type Category = { id: string; name: string };

export default function CategoriesPage() {
  const [cats, setCats] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");

  const pageSize = 10;

  const load = async () => {
    const res = await fetch('/api/admin/categories', { cache: 'no-store' });
    if (!res.ok) return;
    const data = await res.json();
    setCats(data?.data || []);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return cats.filter((c) => !s || c.name.toLowerCase().includes(s));
  }, [cats, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openCreate = () => { setEditing(null); setName(""); setModalOpen(true); };
  const openEdit = (c: Category) => { setEditing(c); setName(c.name); setModalOpen(true); };

  const save = async () => {
    if (!name.trim()) return;
    if (editing) {
      const res = await fetch('/api/admin/categories', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing.id, name: name.trim() }) });
      if (res.ok) { await load(); setModalOpen(false); }
    } else {
      const res = await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.trim() }) });
      if (res.ok) { await load(); setModalOpen(false); }
    }
  };

  const removeCat = async (id: string) => {
    const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
    if (res.ok) load();
  };

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl" c="white"><IconTags size={28} style={{ marginRight: 10 }} /> Categories</Title>

      <Card withBorder p="md" bg="dark.6">
        <Group justify="space-between" mb="md">
          <TextInput placeholder="Search categories..." leftSection={<IconSearch size={16} />} value={search} onChange={(e) => { setPage(1); setSearch(e.currentTarget.value); }} w={300} />
          <Button color="brand" leftSection={<IconPlus size={16} />} onClick={openCreate}>Add category</Button>
        </Group>

        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paged.map((c) => (
              <Table.Tr key={c.id}>
                <Table.Td>
                  <Badge variant="light" color="brand">{c.name}</Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Tooltip label="Edit"><ActionIcon variant="light" color="brand" onClick={() => openEdit(c)} aria-label="Edit category"><IconEdit size={16} /></ActionIcon></Tooltip>
                    <Tooltip label="Delete"><ActionIcon variant="light" color="red" onClick={() => removeCat(c.id)} aria-label="Delete category"><IconTrash size={16} /></ActionIcon></Tooltip>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {filtered.length > 0 && (
          <Group justify="center" mt="md">
            <Pagination total={totalPages} value={page} onChange={setPage} color="brand" />
          </Group>
        )}
      </Card>

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Rename category' : 'Add category'} centered>
        <Stack>
          <TextInput label="Name" value={name} onChange={(e) => setName(e.currentTarget.value)} required />
          <Group justify="flex-end">
            <Button variant="light" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button color="brand" onClick={save}>{editing ? 'Save' : 'Create'}</Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}


