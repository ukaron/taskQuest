export interface ISettings {
  tomato: {
    time: number;
    shotBreak: number;
    longBreak: number;
    autostartBreak: boolean;
    autostartTomato: boolean;
    longBreakInterval: number;
  };
  sound: {
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
  id: string;
}
