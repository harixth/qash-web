import React from "react";

type ParkingCardProps = {
  category: HighestAndLowestCarpark | null;
  title: string;
};

export function ParkingCard({
  category,
  title,
}: ParkingCardProps): JSX.Element {
  return (
    <div className=" bg-slate-200 hover:bg-sky-100 p-8 mx-auto w-full rounded-xl shadow-lg m-3">
      <div className="container">
        <div className="flex flex-row items-center">
          <img
            className="h-16 w-16 mr-4"
            src="parking-car.png"
            alt="parking logo"
          />
          <h3>{title}</h3>
        </div>
        <hr className="w-48 h-1 mx-auto bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
        <div>
          {category?.highest && (
            <div>
              <p className="text-xl font-medium text-black">
                HIGHEST ({category.highest.value} lots available)
              </p>
              {category.highest.keys.map((key, i) => (
                <span key={i} className="text-lg text-slate-500">
                  {key}
                  {i != category.highest.keys.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
          {category?.lowest && (
            <div>
              <p className="text-xl font-medium text-black">
                LOWEST ({category.lowest.value} lots available)
              </p>
              {category.lowest.keys.map((key, i) => (
                <span key={i} className="text-lg text-slate-500">
                  {key}
                  {i != category.lowest.keys.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
