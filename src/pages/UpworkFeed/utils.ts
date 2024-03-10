export const scoreHandler = (score: number) => {
  if (score < 100) {
    return "scorePink";
  } else if (score > 100 && score < 150) {
    return "scoreOrange";
  } else if (score > 150 && score < 200) {
    return "scoreYellow";
  } else if (score > 200 && score < 250) {
    return "scoreGreen";
  } else if (score > 250) {
    return "scoreBlue";
  }
};

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
