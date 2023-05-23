import {
  getHighestandLowest,
  mapCarparkNumberWithAvailableLots,
} from "../app/utils";

describe("mapCarparkNumberWithAvailableLots", () => {
  test("should correctly map carpark numbers with available lots", () => {
    const carparkData = [
      {
        carpark_number: "CP1",
        carpark_info: [
          { lots_available: "10", lot_type: "C", total_lots: "50" },
          { lots_available: "20", lot_type: "C", total_lots: "80" },
        ],
        update_datetime: "2023-05-23T16:30:20",
      },
      {
        carpark_number: "CP2",
        carpark_info: [
          { lots_available: "30", lot_type: "C", total_lots: "120" },
          { lots_available: "40", lot_type: "C", total_lots: "200" },
        ],
        update_datetime: "2023-05-23T16:30:20",
      },
      {
        carpark_number: "CP3",
        carpark_info: [
          { lots_available: "50", lot_type: "C", total_lots: "180" },
          { lots_available: "60", lot_type: "C", total_lots: "250" },
        ],
        update_datetime: "2023-05-23T16:30:20",
      },
    ];

    const result = mapCarparkNumberWithAvailableLots(carparkData);

    expect(result.medium.get("CP1")).toBe(30);
    expect(result.big.get("CP2")).toBe(70);
    expect(result.large.get("CP3")).toBe(110);
  });
});

describe("getHighestandLowest", () => {
  it("should return null when carParkMap is falsy", () => {
    const carParkMap = null;
    const result = getHighestandLowest(carParkMap);
    expect(result).toBeNull();
  });

  it("should return highest and lowest carpark values", () => {
    const carParkMap = new Map<string, number>([
      ["Carpark A", 10],
      ["Carpark B", 20],
      ["Carpark C", 30],
      ["Carpark D", 20],
    ]);

    const result = getHighestandLowest(carParkMap);
    expect(result).toEqual({
      highest: { keys: ["Carpark C"], value: 30 },
      lowest: { keys: ["Carpark A"], value: 10 },
    });
  });

  it("should handle multiple carpark keys with the same value", () => {
    const carParkMap = new Map<string, number>([
      ["Carpark A", 10],
      ["Carpark B", 20],
      ["Carpark C", 20],
      ["Carpark D", 20],
    ]);

    const result = getHighestandLowest(carParkMap);
    expect(result).toEqual({
      highest: { keys: ["Carpark B", "Carpark C", "Carpark D"], value: 20 },
      lowest: { keys: ["Carpark A"], value: 10 },
    });
  });
});
