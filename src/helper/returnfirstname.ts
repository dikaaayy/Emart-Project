export default function firstname(name: string): string {
  let name_to_return = name.split(" ");
  return name_to_return[0];
}
