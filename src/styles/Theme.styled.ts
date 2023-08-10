export interface Theme {
  name: string;
  colors: {
    background: string;
    backgroundSecond: string;
    hover: string;
    text: string;
    border: string;
  };
}

export const light: Theme = {
  name: "light-theme",
  colors: {
    background: "hsl(0,0%,100%)",
    backgroundSecond: "hsl(200,13%,95%)",
    hover: "hsl(176,85%,50%)",
    text: "hsl(0,0%,0%)",
    border: "hsl(213,9%,75%)",
  },
};

export const dark: Theme = {
  name: "dark-theme",
  colors: {
    background: "hsl(0,0%,12%)",
    backgroundSecond: "hsl(240,1%,15%)",
    hover: "hsl(177,79%,44%)",
    text: "hsl(0,0%,100%)",
    border: "hsl(240,3%,25%)",
  },
};
