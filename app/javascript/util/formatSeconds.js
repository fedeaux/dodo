export default function formatSeconds(seconds) {
  const hours = parseInt(seconds / 3600);
  const minutes = parseInt((seconds - hours * 3600) / 60);
  seconds = parseInt(seconds - minutes * 60 - hours * 3600);

  return [hours > 0 ? hours : -1, minutes, seconds]
    .filter((unit) => {
      return unit >= 0;
    })
    .map((unit) => {
      return unit > 9 ? unit : `0${unit}`;
    })
    .join(":");
}
