export type proposal = {
  name: string;
  comment: string;
  result: number[];
};
export type event = {
  scheduleList: string[];
  participants: proposal[];
};
