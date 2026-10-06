export type ChangeInWeightVariant = {
  step: string;
  label: string;
  title: string;
  before: string;
  after: string;
  unit: string;
  image: string;
};

const P = "/weight-loss/change";

export const CHANGE_IN_WEIGHT_VARIANTS: ChangeInWeightVariant[] = [
  {
    step: "01",
    label: "Starting change",
    title: "Total Caloric Intake",
    before: "2,200",
    after: "1,800",
    unit: "Kcal",
    image: `${P}/card-default.png`,
  },
  {
    step: "02",
    label: "Weeks later",
    title: "Weight Moves Down",
    before: "214",
    after: "207",
    unit: "lbs",
    image: `${P}/card-variant2.jpg`,
  },
  {
    step: "03",
    label: "Months later",
    title: "A1c Moves Down",
    before: "6.1",
    after: "5.8",
    unit: "%",
    image: `${P}/card-variant3.png`,
  },
];

export const CHANGE_IN_WEIGHT_DESC =
  "See how changes in nutrition, exercise, sleep, weight, and medications align with changes in your health over time.";
