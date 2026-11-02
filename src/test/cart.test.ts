import { describe, expect, it } from "vitest";
import { addLine, setQty, subtotal } from "@/lib/cart";

describe("cart rules", () => {
  it("increments quantity for repeated products", () => {
    const l = addLine(addLine([], "prd-kettlebell"), "prd-kettlebell");
    expect(l).toEqual([{ id: "prd-kettlebell", qty: 2 }]);
  });
  it("allows only one of the same plan", () => {
    const l = addLine(addLine([], "pkg-strength"), "pkg-strength");
    expect(setQty(l, "pkg-strength", 3)).toEqual([{ id: "pkg-strength", qty: 1 }]);
  });
  it("removes a line at zero and sums prices from data", () => {
    const l = addLine(addLine([], "prd-hex-dumbbells"), "pkg-starter");
    expect(subtotal(l)).toBe(89 + 29);
    expect(setQty(l, "pkg-starter", 0)).toEqual([{ id: "prd-hex-dumbbells", qty: 1 }]);
  });
});
