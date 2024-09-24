export function getWeatherImage(weatherCode: number) {
  let imageName;

  switch (true) {
    case weatherCode === 800:
      imageName = "clear";
      break;

    case weatherCode === 801 || weatherCode === 802:
      imageName = "clouds-801-802";
      break;

    case weatherCode === 803:
      imageName = "clouds-803";
      break;

    case weatherCode === 804:
      imageName = "clouds-804";
      break;

    case weatherCode === 500 || weatherCode === 501:
      imageName = "rain-500-501";
      break;

    case weatherCode >= 502 && weatherCode <= 531:
      imageName = "rain-502-531";
      break;

    case weatherCode >= 202 && weatherCode <= 212:
      imageName = "thunderstorm-202-212";
      break;

    case weatherCode === 200 || weatherCode === 201:
      imageName = "thunderstorm-200-201";
      break;

    case weatherCode >= 600 && weatherCode <= 622:
      imageName = "snow";
      break;

    default:
      imageName = "default";
      break;
  }

  return imageName;
}
