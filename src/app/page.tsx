import { ParkingCard } from "./components/ParkingCard";
import {
  getHighestandLowest,
  mapCarparkNumberWithAvailableLots,
} from "./utils";

async function getCarParkData(): Promise<
  | {
      small: Map<string, number>;
      medium: Map<string, number>;
      big: Map<string, number>;
      large: Map<string, number>;
    }
  | undefined
> {
  try {
    const res = await fetch(
      "https://api.data.gov.sg/v1/transport/carpark-availability"
    );
    const data = await res.json();
    if (!data.items || !data.items[0].carpark_data)
      throw new Error("No items in response");
    return mapCarparkNumberWithAvailableLots(data.items[0].carpark_data);
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const data = await getCarParkData();
  if (!data) {
    return (
      <div className="container">
        <h3 className="my-10">No data available. Please check again later!</h3>
      </div>
    );
  }
  const small = getHighestandLowest(data.small);
  const medium = getHighestandLowest(data.medium);
  const big = getHighestandLowest(data.big);
  const large = getHighestandLowest(data.large);
  return (
    <div className="container">
      <h1 className="my-8">Car Park Availability</h1>
      <ParkingCard category={small} title="SMALL" />
      <ParkingCard category={medium} title="MEDIUM" />
      <ParkingCard category={big} title="BIG" />
      <ParkingCard category={large} title="LARGE" />
    </div>
  );
}
