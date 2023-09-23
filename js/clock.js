export function Clock() {
  let timeEnd = new Date("Sep 23 2023 18:00:00");
  let time = Math.abs((timeEnd - new Date()) / 1000);
  let day = Math.floor(time / 3600 / 24);
  let hour = Math.floor(time / 3600) % 24;
  let min = Math.floor(time / 60) % 60;
  let sec = Math.floor(time) % 60;
  document.getElementById("tmrDays").textContent = day;
  document.getElementById("tmrHours").textContent = hour;
  document.getElementById("tmrMins").textContent = min < 10 ? "0" + min : min;
  document.getElementById("tmrSecs").textContent = sec < 10 ? "0" + sec : sec;
  setInterval(() => {
    Clock();
  }, 1000);
}
