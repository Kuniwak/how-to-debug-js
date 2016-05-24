/// <reference path="../node_modules/@types/chai/index.d.ts" />
import {sum} from "./sum";

const {assert} = chai;


describe("sum", () => {
  context("when given []", () => {
    it("should return 0", () => {
      const input: number[] = [];
      assert.strictEqual(sum(input), 0);
    });
  });


  context("when given [100]", () => {
    it("should return 100", () => {
      const input = [100];
      assert.strictEqual(sum(input), 100);
    });
  });


  context("when given [1, 2, 3]", () => {
    it("should return 6", () => {
      const input = [1, 2, 3];
      assert.strictEqual(sum(input), 6);
    });
  });
});
