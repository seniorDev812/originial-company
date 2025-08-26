import { NextResponse } from 'next/server';

type Category = { id: string; name: string };

let categories: Category[] = [
  { id: 'c1', name: 'Electronics' },
  { id: 'c2', name: 'Sensors' },
  { id: 'c3', name: 'Motors' },
];

export async function GET() {
  return NextResponse.json({ success: true, data: categories });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<Category>;
    if (!body.name || !body.name.trim()) {
      return NextResponse.json({ success: false, message: 'Name is required' }, { status: 400 });
    }
    const exists = categories.some((c) => c.name.toLowerCase() === body.name!.trim().toLowerCase());
    if (exists) {
      return NextResponse.json({ success: false, message: 'Category already exists' }, { status: 400 });
    }
    const newCat = { id: `c${Date.now()}`, name: body.name!.trim() } as Category;
    categories = [newCat, ...categories];
    return NextResponse.json({ success: true, data: newCat });
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as Partial<Category> & { id?: string };
    if (!body.id || !body.name || !body.name.trim()) {
      return NextResponse.json({ success: false, message: 'Id and name are required' }, { status: 400 });
    }
    const idx = categories.findIndex((c) => c.id === body.id);
    if (idx === -1) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    categories[idx] = { ...categories[idx], name: body.name!.trim() };
    return NextResponse.json({ success: true, data: categories[idx] });
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, message: 'Id is required' }, { status: 400 });
  const len = categories.length;
  categories = categories.filter((c) => c.id !== id);
  if (categories.length === len) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}


