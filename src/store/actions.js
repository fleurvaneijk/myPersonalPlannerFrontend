import {now} from "./store";

export const getWeekNumber = (date) =>
{
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week = new Date(date.getFullYear(), 0, 4);
  // 86400000 = second in day, 3 = wednesday, 7 & 6 [0-6] = days in week
  let weeknumber =  Math.round(((date.getTime() - week.getTime()) / 86400000
    - 3 + (week.getDay() + 6) % 7) / 7);
  // When weeknumer is 0 (year starts at a wednesday or later continue the week number)
  if (weeknumber === 0) {
    date.setDate(date.getDate() - 7)
    return this.getWeekNumber(date) + 1;
  }
  return weeknumber;
}

export const isToday = (date) => {
  return now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate()
}

export const getDaysOfWeek = (date) => {
  var week = [];
  var current = date;
  current.setDate((current.getDate() - current.getDay() + 1));
  for (var i = 0; i < 7; i++) {
    week.push(
      new Date(current)
    );
    current.setDate(current.getDate() +1);
  }
  return week;
}

export const isNullOrEmpty = (x) =>
{
  if(x === null || x === "" || x === undefined) {
    return true;
  } else if (x.isEmpty()){
    return true;
  } else {
    return false;
  }
  // return (x === null || x === "" || x === undefined || x.isEmpty());
}

