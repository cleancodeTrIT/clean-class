import { Id } from "./models/id.type";

export class GenericRepository<T extends { id: Id }> {
  private items: T[] = [];

  create(item: T): T {
    const newItem = { ...item, id: this.items.length + 1 };
    this.items.push(newItem);
    return newItem;
  }
  readAll(): T[] {
    return this.items;
  }
  read(id: number): T | undefined {
    return this.items.find((i) => i.id === id);
  }
  update(item: T): T | undefined {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index == 0) return undefined;
    this.items[index] = item;
    return item;
  }
  delete(id: number): void {
    const index = this.items.findIndex((i) => i.id === id);
    if (index == 0) return;
    this.items.splice(index, 1);
  }
}
