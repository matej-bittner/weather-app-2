"use client";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";

const WeatherCard = () => {
  const [cityData, setcityData] = useState<any>();
  const [openSearch, setopenSearch] = useState(true);
  const [citySearch, setCitySearch] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (cityData) {
      setopenSearch(false);
    }
    setCitySearch("");
  }, [cityData]);

  const onClick = () => {
    if (!cityData && !citySearch) {
      return;
    } else if (!cityData && citySearch && openSearch) {
      startTransition(async () => {
        const res = await fetch(`/api/getWeatherByCity?city=${citySearch}`);
        if (res.ok) {
          const data = await res.json();
          setcityData(data);
        } else {
          console.error("Error fetching weather data");
        }
      });
    } else if (cityData && !openSearch) {
      setopenSearch(true);
    } else {
      startTransition(async () => {
        const res = await fetch(`/api/getWeatherByCity?city=${citySearch}`);
        if (res.ok) {
          const data = await res.json();
          setcityData(data);
        } else {
          console.error("Error fetching weather data");
        }
      });
    }
  };

  return (
    <section
      className={` ${
        !cityData ? "h-fit" : "min-h-[500px]"
      }  sm:w-[550px] w-[300px] mx-auto min-w-[305px] bg-[#E0F1FF] rounded-3xl py-3 px-4 flex flex-col `}
    >
      <div className="flex items-center w-full relative">
        <Image
          src="/icons/location.svg"
          width={30}
          height={30}
          alt="location"
          className="mr-4 sm:w-[55px] aspect-square"
        />
        <h2 className="font-light text-lg sm:text-3xl ">
          {cityData?.cityName || ""}
        </h2>
        <div
          className={`${
            openSearch
              ? "sm:w-[calc(100%-55px)] w-[calc(100%-35px)]  pl-4 "
              : "w-fit"
          } absolute   rounded-full sm:h-[50px] h-[35px] flex items-center  bg-[#F3F9FC]  right-0`}
        >
          <input
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
            className={`${
              !openSearch && "hidden"
            } font-light text-lg sm:text-3xl bg-transparent placeholder:text-black/40 max-sm:max-w-[calc(170px)] `}
            placeholder={cityData?.cityName || "Prague"}
          />
          <button
            onClick={onClick}
            disabled={isPending}
            className="flex items-center justify-center h-full aspect-square rounded-full ml-auto"
          >
            <Image
              src="/icons/search.svg"
              width={20}
              height={20}
              className="sm:w-[30px] aspect-square"
              alt="search"
            />
          </button>
        </div>
      </div>
      {cityData && (
        <>
          <div className="flex-1 flex justify-around items-center flex-col">
            <div className="w-[60%] aspect-[4/3] relative ">
              <Image
                src={
                  "/weather/" + cityData?.image + ".svg" ||
                  "weather/default.svg"
                }
                fill
                alt="weather image"
              />
            </div>
            <div className=" text-center  ">
              <p className="font-medium text-xl sm:text-3xl ">
                {cityData?.temperature}°C
              </p>
              <p className="text-lg">{cityData?.weatherMain}</p>
            </div>
          </div>
          <div className="flex  w-[80%]  mx-auto justify-between ">
            <div className="flex max-sm:flex-col max-sm:text-center">
              <Image
                src="/icons/humidity.svg"
                width={65}
                height={65}
                alt="humidity"
              />
              <div className="flex flex-col justify-end pb-2">
                <p className="font-medium">{cityData?.humidity} %</p>
                <p className="font-semibold">HUMIDITY</p>
              </div>
            </div>
            <div className="flex max-sm:flex-col max-sm:text-center">
              <Image src="/icons/wind.svg" width={65} height={65} alt="wind" />
              <div className="flex flex-col justify-end pb-2">
                <p className="font-medium">{cityData?.windSpeed} Km/h</p>
                <p className="font-semibold">WIND</p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
export default WeatherCard;
