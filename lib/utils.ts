export function getWeatherImage(weatherCode: number) {
  let imageName;

  switch (true) {
    case weatherCode === 800:
      imageName = "Clear";
      break;

    case weatherCode === 801 || weatherCode === 802:
      imageName = "Clouds-801-802";
      break;

    case weatherCode === 803:
      imageName = "Clouds-803";
      break;

    case weatherCode === 804:
      imageName = "Clouds-804";
      break;

    case weatherCode === 500 || weatherCode === 501:
      imageName = "Rain-500-501";
      break;

    case weatherCode >= 502 && weatherCode <= 531:
      imageName = "Rain-502-531";
      break;

    case weatherCode >= 202 && weatherCode <= 212:
      imageName = "Thunderstorm-202-212";
      break;

    case weatherCode === 200 || weatherCode === 201:
      imageName = "Thunderstorm-200-201";
      break;

    case weatherCode >= 600 && weatherCode <= 622:
      imageName = "Snow";
      break;

    default:
      imageName = "Default";
      break;
  }

  return imageName;
}
