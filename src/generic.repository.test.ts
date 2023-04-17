import { GenericRepository } from "./generic.repository";

type Item = {
  id: number;
  name: string;
};
const item = { id: 0, name: "First item" };
const item2 = { id: 0, name: "Second item" };
describe("GenericRepository", () => {
  let repo: GenericRepository<Item>;
  beforeEach(() => {
    repo = new GenericRepository<Item>();
  });
  it("should create a new item", () => {
    const newItem = repo.create(item);
    expect(newItem.id).not.toEqual(0);
    expect(newItem.name).toEqual(item.name);
  });
  it("should read all items", () => {
    repo.create(item);
    repo.create(item2);
    const items = repo.read();
    expect(items).toHaveLength(2);
  });
  it("should read an item by id", () => {
    const createdItem = repo.create(item);
    repo.create(item2);
    const foundItem = repo.readById(createdItem.id);
    expect(foundItem).toEqual(createdItem);
  });
  it("should read an item by field", () => {
    repo.create(item);
    repo.create(item2);
    const foundItem = repo.readByField("name", item.name)[0];
    expect(foundItem.name).toEqual(item.name);
    const foundItem2 = repo.readByField("name", item2.name)[0];
    expect(foundItem2.name).toEqual(item2.name);
  });
  it("should update an item", () => {
    repo.create(item);
    const createdItem2 = repo.create(item2);
    const updatedItem = repo.update({ id: createdItem2.id, name: "Changed item" });
    expect(updatedItem).toEqual({ id: createdItem2.id, name: "Changed item" });
  });
  it("should delete an item", () => {
    repo.create(item);
    const createdItem2 = repo.create(item2);
    repo.delete(createdItem2.id);
    const items = repo.read();
    expect(items).toHaveLength(1);
    expect(items[0].name).toEqual(item.name);
  });
});
