import { getNewId, getSlug } from "./util.functions";

describe("getNewId", () => {
  it("should return a string with more than 13 characters", () => {
    const result = getNewId();
    expect(result.length).toBeGreaterThan(13);
  });
});

describe("getSlug", () => {
  it("should return an url readable string", () => {
    const result = getSlug("Hello World desde España!");
    expect(result).toEqual("hello-world-desde-espa_a_");
  });
});
