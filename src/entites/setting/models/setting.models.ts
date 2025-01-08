export interface ISettings {
  tomato: {
    time: number;
    shortBreak: number;
    longBreak: number;
    autostartBreak: boolean;
    autostartTomato: boolean;
    longBreakInterval: number;
  };
  sound: {
    on: boolean;
    alarmSound: string;
    alarmVol: number;
    tickSound: string;
    tickVol: number;
  };
  notification: {
    on: boolean;
  };
  window: {
    opacity: number;
    onTop: boolean;
    resize: boolean;
  };
  id?: string;
}

export const defaultSettings: ISettings = {
  tomato: {
    time: 45,
    shortBreak: 5,
    longBreak: 15,
    autostartBreak: false,
    autostartTomato: false,
    longBreakInterval: 4,
  },
  sound: {
    on: true,
    alarmSound: "default",
    alarmVol: 50,
    tickSound: "sounds/tick.mp3",
    tickVol: 50,
  },
  notification: {
    on: true,
  },
  window: {
    opacity: 100,
    onTop: false,
    resize: true,
  },
};
