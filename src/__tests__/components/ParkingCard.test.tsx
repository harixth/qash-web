import React from "react";
import { render, screen } from "@testing-library/react";
import { ParkingCard } from "../../app/components/ParkingCard";

describe("ParkingCard", () => {
  it("should render correctly with highest and lowest categories", () => {
    const category = {
      highest: {
        keys: ["CP1", "CP2"],
        value: 30,
      },
      lowest: {
        keys: ["CP3"],
        value: 10,
      },
    };

    const title = "SMALL";

    render(<ParkingCard category={category} title={title} />);

    expect(screen.getByText("HIGHEST (30 lots available)")).toBeInTheDocument();
    expect(screen.getByText("CP1,")).toBeInTheDocument();
    expect(screen.getByText("LOWEST (10 lots available)")).toBeInTheDocument();
    expect(screen.getByText("CP3")).toBeInTheDocument();
  });

  it("should render correctly without highest and lowest categories", () => {
    const category = null;

    const title = "LARGE";

    render(<ParkingCard category={category} title={title} />);

    expect(screen.getByText("LARGE")).toBeInTheDocument();
    expect(screen.queryByText("HIGHEST")).toBeNull();
    expect(screen.queryByText("LOWEST")).toBeNull();
  });
});
