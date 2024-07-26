export function formatRoomName(id: string): string {
  return id
    .replace(/%20/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
