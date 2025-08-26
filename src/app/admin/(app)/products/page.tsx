"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Title,
  Card,
  Group,
  Text,
  Button,
  TextInput,
  Select,
  Grid,
  Badge,
  ActionIcon,
  Modal,
  Stack,
  Textarea,
  NumberInput,
  Image as MantineImage,
  Tooltip,
  ScrollArea,
  Pagination,
  Table,
} from "@mantine/core";
import {
  IconBox,
  IconSearch,
  IconPlus,
  IconEdit,
  IconTrash,
  IconCurrencyDollar,
  IconCheck,
  IconX,
  IconUpload,
} from "@tabler/icons-react";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
  description?: string;
  imageUrl?: string;
  createdAt: string;
};

const initialProducts: Product[] = [
  { id: "p1", name: "SE-100 Controller", sku: "SE100", category: "Electronics", price: 199, stock: 23, status: "active", description: "Reliable industrial controller.", imageUrl: "https://picsum.photos/seed/1/320/200", createdAt: "2025-01-12T10:00:00Z" },
  { id: "p2", name: "SG-200 Sensor", sku: "SG200", category: "Sensors", price: 89, stock: 120, status: "active", description: "High-precision sensor for multiple use cases.", imageUrl: "https://picsum.photos/seed/2/320/200", createdAt: "2025-01-10T08:20:00Z" },
  { id: "p3", name: "AX-350 Motor", sku: "AX350", category: "Motors", price: 499, stock: 8, status: "inactive", description: "Powerful and efficient motor.", imageUrl: "https://picsum.photos/seed/3/320/200", createdAt: "2025-01-05T15:45:00Z" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>("all");
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [status, setStatus] = useState<string | null>("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, "id" | "createdAt">>({
    name: "",
    sku: "",
    category: "",
    price: 0,
    stock: 0,
    status: "active",
    description: "",
    imageUrl: "",
  });

  const pageSize = 8;

  useEffect(() => {
    setProducts(initialProducts);
    (async () => {
      try {
        const res = await fetch('/api/admin/categories', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const names: string[] = (data?.data || []).map((c: any) => c.name);
          setCategories(["all", ...names]);
        }
      } catch {}
    })();
  }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return products.filter((p) => {
      const term =
        !s ||
        p.name.toLowerCase().includes(s) ||
        p.sku.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s);
      const catOk = category === "all" || !category || p.category === category;
      const stOk = status === "all" || !status || p.status === status;
      return term && catOk && stOk;
    });
  }, [products, search, category, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", sku: "", category: "", price: 0, stock: 0, status: "active", description: "", imageUrl: "" });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    const { id, createdAt, ...rest } = p;
    setForm(rest);
    setModalOpen(true);
  };

  const saveProduct = () => {
    if (!form.name || !form.sku) return;
    if (editing) {
      setProducts((prev) => prev.map((p) => (p.id === editing.id ? { ...editing, ...form } : p)));
    } else {
      const id = `p${Date.now()}`;
      setProducts((prev) => [{ id, createdAt: new Date().toISOString(), ...form }, ...prev]);
    }
    setModalOpen(false);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl" c="white">
        <IconBox size={28} style={{ marginRight: 10 }} /> Products
      </Title>

      <Card withBorder p="md" bg="dark.6">
        <Group justify="space-between" mb="md" wrap="wrap">
          <Group>
            <TextInput
              placeholder="Search name, sku, category..."
              leftSection={<IconSearch size={16} />}
              value={search}
              onChange={(e) => { setPage(1); setSearch(e.currentTarget.value); }}
              w={300}
            />
            <Select
              placeholder="Category"
              data={categories}
              value={category}
              onChange={(v) => { setPage(1); setCategory(v); }}
              w={160}
            />
            <Select
              placeholder="Status"
              data={["all", "active", "inactive"]}
              value={status}
              onChange={(v) => { setPage(1); setStatus(v); }}
              w={140}
            />
          </Group>
          <Button color="brand" leftSection={<IconPlus size={16} />} onClick={openCreate}>Add product</Button>
        </Group>

        <ScrollArea>
          <Grid>
            {paged.map((p) => (
              <Grid.Col key={p.id} span={{ base: 12, sm: 6, lg: 3 }}>
                <Card withBorder>
                  {p.imageUrl && (
                    <MantineImage src={p.imageUrl} alt={p.name} h={140} w="100%" fit="cover" radius="sm" />
                  )}
                  <Group justify="space-between" mt="sm">
                    <Text fw={600}>{p.name}</Text>
                    <Badge color={p.status === "active" ? "brand" : "gray"} variant="light">{p.status}</Badge>
                  </Group>
                  <Text size="sm" c="dimmed">SKU: {p.sku}</Text>
                  <Group gap="xs" mt={6}>
                    <Badge variant="light">{p.category}</Badge>
                    <Badge variant="light" leftSection={<IconCurrencyDollar size={12} />}>{p.price.toFixed(2)}</Badge>
                    <Badge variant="light">Stock: {p.stock}</Badge>
                  </Group>
                  {p.description && (
                    <Text size="sm" mt={6} lineClamp={2}>{p.description}</Text>
                  )}
                  <Group justify="space-between" mt="sm">
                    <Group gap="xs">
                      <Tooltip label="Edit">
                        <ActionIcon variant="light" color="brand" onClick={() => openEdit(p)} aria-label="Edit product">
                          <IconEdit size={16} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <ActionIcon variant="light" color="red" onClick={() => deleteProduct(p.id)} aria-label="Delete product">
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                    <Text size="xs" c="dimmed">{new Date(p.createdAt).toLocaleDateString()}</Text>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </ScrollArea>

        {filtered.length > 0 && (
          <Group justify="center" mt="md">
            <Pagination total={totalPages} value={page} onChange={setPage} color="brand" />
          </Group>
        )}
        {filtered.length === 0 && (
          <Card withBorder mt="md" p="lg" ta="center">
            <Text c="dimmed">No products found. Try adjusting filters or add a new product.</Text>
          </Card>
        )}
      </Card>

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit product" : "Add product"} size="lg" centered>
        <Stack>
          <Group grow>
            <TextInput label="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.currentTarget.value }))} required />
            <TextInput label="SKU" value={form.sku} onChange={(e) => setForm((f) => ({ ...f, sku: e.currentTarget.value }))} required />
          </Group>
          <Group grow>
            <TextInput label="Category" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.currentTarget.value }))} />
            <NumberInput label="Price" value={form.price} min={0} step={1} onChange={(v) => setForm((f) => ({ ...f, price: Number(v) || 0 }))} leftSection={<IconCurrencyDollar size={14} />} />
            <NumberInput label="Stock" value={form.stock} min={0} step={1} onChange={(v) => setForm((f) => ({ ...f, stock: Number(v) || 0 }))} />
          </Group>
          <Select label="Status" data={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]} value={form.status} onChange={(v) => setForm((f) => ({ ...f, status: (v as Product["status"]) || "active" }))} w={200} />
          <TextInput label="Image URL" value={form.imageUrl} onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.currentTarget.value }))} leftSection={<IconUpload size={14} />} />
          <Textarea label="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.currentTarget.value }))} rows={3} />
          <Group justify="flex-end">
            <Button variant="light" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button color="brand" onClick={saveProduct}>{editing ? "Save" : "Create"}</Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}


