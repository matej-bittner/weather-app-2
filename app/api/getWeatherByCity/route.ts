import { getWeatherImage } from "@/lib/utils";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city"); // Získání města z query parametru

  if (!city) {
    return new Response("City is required", { status: 400 });
  }

  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;

  try {
    const res = await fetch(baseUrl);
    const data = await res.json();
    const imageToDisplay = getWeatherImage(data.weather[0].id);
    const filteredData = {
      weatherId: data.weather[0].id,
      weatherMain: data.weather[0].main,
      temperature: parseFloat(data.main.temp.toFixed(1)), // Zaokrouhlení na 1 desetinné místo
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      cityName: data.name,
      image: imageToDisplay,
    };

    return new Response(JSON.stringify(filteredData), { status: 200 });
  } catch (error) {
    return new Response("Error fetching weather data", { status: 500 });
  }
}
