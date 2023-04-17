import { Id } from "./models/id.type";
import { getNewId } from "./util.functions";

export class GenericRepository<T extends { id: Id }> {
  private items: T[] = [];

  create(item: T): T {
    const id = getNewId();
    const newItem = { ...item, id };
    this.items.push(newItem);
    return newItem;
  }
  read(): T[] {
    return this.items;
  }
  readById(id: Id): T | undefined {
    return this.items.find((i) => i.id === id);
  }
  readByField(field: keyof T, value: T[keyof T]): T[] {
    return this.items.filter((i) => i[field] === value);
  }
  update(item: T): T | undefined {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index < 0) return undefined;
    const updatedItem = Object.assign(this.items[index], item);
    this.items[index] = updatedItem;
    return updatedItem;
  }
  delete(id: Id): void {
    const index = this.items.findIndex((i) => i.id === id);
    if (index == 0) return;
    this.items.splice(index, 1);
  }
}
