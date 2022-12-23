export function className(...args: string[]) {
  return args.filter(Boolean).join(' ');
}