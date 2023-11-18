/**
 * The above type represents a timer value with hours, minutes, and seconds.
 * @property {number} hours - A number representing the hours component of a timer value.
 * @property {number} minutes - The `minutes` property represents the number of minutes in a
 * `TimerValue` object. It is a numeric value that indicates the minutes portion of a timer.
 * @property {number} seconds - The "seconds" property represents the number of seconds in a timer
 * value. It is a numeric value that can range from 0 to 59.
 */
export type TimerValue = {
  hours: number;
  minutes: number;
  seconds: number;
};
