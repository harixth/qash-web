type CarparkData = {
  carpark_info: {
    total_lots: string;
    lot_type: string;
    lots_available: string;
  }[];
  carpark_number: string;
  update_datetime: string;
};

type CarparkMap = {
  small: Map<string, number>;
  medium: Map<string, number>;
  big: Map<string, number>;
  large: Map<string, number>;
};

type HighestAndLowestCarpark = {
  highest: { keys: string[]; value: number };
  lowest: { keys: string[]; value: number };
};
