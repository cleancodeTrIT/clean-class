import { IdGenerator } from "./getNewId.clean";

describe("The IdGenerator ", () => {
  describe("with the same instance", () => {
    let idGenerator: IdGenerator;
    beforeEach(() => {
      idGenerator = new IdGenerator();
    });

    test("returns a string", () => {
      expect(typeof idGenerator.generate()).toBe("string");
    });

    test("returns a hexadecimal string", () => {
      const uniqueId = idGenerator.generate();
      expect(uniqueId).toMatch(/^[0-9a-f]+$/i);
    });

    test("returns a string of length 14", () => {
      const uniqueId = idGenerator.generate();
      expect(uniqueId.length).toBe(14);
    });

    test("generates 256 unique identifiers", () => {
      const uniqueIds = new Set<string>();
      for (let i = 0; i < 500; i++) {
        const uniqueId = idGenerator.generate();
        expect(uniqueIds).not.toContain(uniqueId);
        uniqueIds.add(uniqueId);
      }
    });

    test("print 5 unique identifiers", () => {
      const uniqueIds = new Set<string>();
      for (let i = 0; i < 5; i++) {
        const uniqueId = idGenerator.generate();
        expect(uniqueIds).not.toContain(uniqueId);
        uniqueIds.add(uniqueId);
      }
      console.log(uniqueIds);
    });

    test("prints 5k unique identifiers", () => {
      const uniqueIds = new Set<string>();
      for (let i = 0; i < 5000; i++) {
        const uniqueId = idGenerator.generate();

        expect(uniqueIds).not.toContain(uniqueId);
        uniqueIds.add(uniqueId);
      }
      const discriminators: number[] = [];
      uniqueIds.forEach((id) => {
        const dHex: string = id.slice(-2);
        const d = parseInt(dHex, 16);
        if (d >= 16) {
          discriminators.push(d);
        }
      });
      console.log(discriminators);
    });
    test("measure 5k unique identifiers", () => {
      const start = new Date().getTime();
      const uniqueIds = new Set<string>();
      for (let i = 0; i < 5000; i++) {
        const uniqueId = idGenerator.generate();
        expect(uniqueIds).not.toContain(uniqueId);
        uniqueIds.add(uniqueId);
      }
      const end = new Date().getTime();
      console.log(`Time: ${end - start} ms`);
    });
  });
  describe("with a new instance", () => {
    test("returns a string", () => {
      expect(typeof new IdGenerator().generate()).toBe("string");
    });

    test("returns a hexadecimal string", () => {
      const uniqueId = new IdGenerator().generate();
      expect(uniqueId).toMatch(/^[0-9a-f]+$/i);
    });

    test("returns a string of length 14", () => {
      const uniqueId = new IdGenerator().generate();
      expect(uniqueId.length).toBe(14);
    });

    test("generates 256 unique identifiers", () => {
      const uniqueIds = new Set<string>();
      for (let i = 0; i < 500; i++) {
        const uniqueId = new IdGenerator().generate();
        expect(uniqueIds).not.toContain(uniqueId);
        uniqueIds.add(uniqueId);
      }
    });

    test("print 5 unique identifiers", () => {
      const uniqueIds = new Set<string>();
      for (let i = 0; i < 5; i++) {
        const uniqueId = new IdGenerator().generate();
        expect(uniqueIds).not.toContain(uniqueId);
        uniqueIds.add(uniqueId);
      }
      console.log(uniqueIds);
    });

    test("prints 5k unique identifiers", () => {
      const uniqueIds = new Set<string>();
      for (let i = 0; i < 5000; i++) {
        const uniqueId = new IdGenerator().generate();

        expect(uniqueIds).not.toContain(uniqueId);
        uniqueIds.add(uniqueId);
      }
      const discriminators: number[] = [];
      uniqueIds.forEach((id) => {
        const dHex: string = id.slice(-2);
        const d = parseInt(dHex, 16);
        if (d >= 16) {
          discriminators.push(d);
        }
      });
      console.log(discriminators);
    });
    test("measure 5k unique identifiers", () => {
      const start = new Date().getTime();
      const uniqueIds = new Set<string>();
      for (let i = 0; i < 5000; i++) {
        const uniqueId = new IdGenerator().generate();
        expect(uniqueIds).not.toContain(uniqueId);
        uniqueIds.add(uniqueId);
      }
      const end = new Date().getTime();
      console.log(`Time: ${end - start} ms`);
    });
  });
  describe("with a new instance and different length", () => {
    test("returns a string", () => {
      const uniqueId = new IdGenerator(11).generate();
      expect(typeof uniqueId).toBe("string");
    });

    test("returns a hexadecimal string", () => {
      const uniqueId = new IdGenerator(11).generate();
      expect(uniqueId).toMatch(/^[0-9a-f]+$/i);
    });

    test("returns a string of length 11", () => {
      const uniqueId = new IdGenerator(11).generate();
      expect(uniqueId.length).toBe(11);
    });
    test("returns a string of length 12", () => {
      const uniqueId = new IdGenerator(12).generate();
      expect(uniqueId.length).toBe(12);
    });
    test("returns a string of length 15", () => {
      const uniqueId = new IdGenerator(15).generate();
      expect(uniqueId.length).toBe(15);
    });
    test("returns a string of length 20", () => {
      const uniqueId = new IdGenerator(20).generate();
      expect(uniqueId.length).toBe(20);
    });
    // trows an error if the length is less than 11
    test("throws an error if the length is less than 11", () => {
      expect(() => {
        new IdGenerator(10).generate();
      }).toThrow();
    });
    test("prints 50 small unique identifiers", () => {
      const uniqueIds = new Set<string>();
      const base = 12;
      for (let i = 0; i < 50; i++) {
        const uniqueId = new IdGenerator(base).generate();
        expect(uniqueIds).not.toContain(uniqueId);
        uniqueIds.add(uniqueId);
      }
      const discriminators: number[] = [];
      uniqueIds.forEach((id) => {
        const dHex: string = id.slice(-2);
        const d = parseInt(dHex, 16);
        if (d >= 16) {
          discriminators.push(d);
        }
      });
      console.log(discriminators);
    });
  });
});
