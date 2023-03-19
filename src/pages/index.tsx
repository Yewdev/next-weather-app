import { IWeatherProps, IWeatherResponse } from "@/types";
import axios from "axios";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Home: NextPage<IWeatherProps> = ({ weatherResponse }) => {
  const [city, setCity] = useState("Bangkok");
  const inputRef = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState(weatherResponse);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      )
      .then((response) => {
        toast.dismiss();
        setWeatherData({
          id: response.data.id,
          name: response.data.name,
          weather: response.data.weather[0],
          main: response.data.main,
        });
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Please fill in the correct information.");
        console.error(error);
      });
  }, [city]);

  function handleEnter() {
    if (inputRef.current?.value) {
      toast.loading("Loading data...");
      setCity(inputRef.current?.value);
      inputRef.current.value = "";
    }
  }
  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffc67b] via-[#9c73d6] to-[#274e98] pt-10">
        <Toaster />
        {/* Weather Card */}
        <div className="relative flex min-w-[20rem] flex-col items-center justify-center rounded-xl bg-black/20 px-10 py-6 text-white md:min-w-[30rem]">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter city / country here"
            onKeyDown={(e) => (e.key === "Enter" ? handleEnter() : "")}
            className="absolute top-[-4rem] w-full rounded-md border-4 border-black/20 bg-black/5 py-2 text-center text-lg capitalize tracking-wider placeholder:normal-case placeholder:tracking-normal  placeholder:text-white/50 focus:outline-none md:text-2xl"
          />
          {weatherData && (
            <div>
              <div className="pb-4 text-center text-4xl font-bold tracking-wider">
                {weatherData.name}
              </div>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 place-items-center rounded-lg border-4 border-white/20">
                  <Image
                    alt="weather-icon"
                    width={100}
                    height={100}
                    src={`https://openweathermap.org/img/wn/${weatherData.weather.icon}.png`}
                  />
                  <div>
                    <div className="text-3xl font-bold">
                      {weatherData.main.temp.toFixed(0)}{" "}
                      <span className="text-2xl">°C</span>
                    </div>
                    <div className="flex gap-2 text-sm text-white/50">
                      <div>min/max </div>
                      <div>
                        {weatherData.main.temp_min.toFixed(0)}/
                        {weatherData.main.temp_max.toFixed(0)}
                        <span className="text-xs">°C</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-flow-col grid-rows-1 gap-4">
                  <div className="grid grid-cols-1 place-items-center rounded-lg border-4 border-white/20 p-2 text-center">
                    <div className="text-sm">Weather</div>
                    <div className="text-xl font-bold">
                      {weatherData.weather.main}
                    </div>
                    <div className="text-xs text-white/80">
                      {weatherData.weather.description}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 place-items-center rounded-lg border-4 border-white/20 p-2 text-center">
                    <div className="text-sm ">Humidity</div>
                    <div className="text-xl font-bold">
                      {weatherData.main.humidity} %
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
