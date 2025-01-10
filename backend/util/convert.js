export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} Bytes`;
  const units = ["KB", "MB", "GB", "TB"];
  let unitIndex = -1;
  do {
    bytes /= 1024;
    unitIndex++;
  } while (bytes >= 1024 && unitIndex < units.length - 1);
  return `${bytes.toFixed(2)} ${units[unitIndex]}`;
}
