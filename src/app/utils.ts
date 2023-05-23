export function mapCarparkNumberWithAvailableLots(
  carparkData: CarparkData[]
): CarparkMap {
  const carparkMap: CarparkMap = {
    small: new Map<string, number>(),
    medium: new Map<string, number>(),
    big: new Map<string, number>(),
    large: new Map<string, number>(),
  };

  carparkData.forEach((carpark: CarparkData) => {
    let availableLots = 0;
    let totalLots = 0;
    carpark.carpark_info.forEach((info) => {
      availableLots += parseInt(info.lots_available);
      totalLots += parseInt(info.total_lots);
    });
    if (totalLots < 100) {
      carparkMap.small.set(
        carpark.carpark_number, //+ "-" + availableLots + "/" + totalLots
        availableLots
      );
    } else if (totalLots < 300) {
      carparkMap.medium.set(carpark.carpark_number, availableLots);
    } else if (totalLots < 400) {
      carparkMap.big.set(carpark.carpark_number, availableLots);
    } else {
      carparkMap.large.set(carpark.carpark_number, availableLots);
    }
  });
  return carparkMap;
}

export function getHighestandLowest(
  carParkMap: Map<string, number> | null
): HighestAndLowestCarpark | null {
  if (!carParkMap) {
    return null;
  }

  let highest: { keys: string[]; value: number } | undefined;
  let lowest: { keys: string[]; value: number } | undefined;

  for (const [key, value] of carParkMap) {
    if (!highest || value > highest.value) {
      highest = { keys: [key], value };
    } else if (value === highest.value) {
      highest.keys.push(key);
    }

    if (!lowest || value < lowest.value) {
      lowest = { keys: [key], value };
    } else if (value === lowest.value) {
      lowest.keys.push(key);
    }
  }

  return { highest, lowest } as HighestAndLowestCarpark;
}
