import { compareAsc } from 'date-fns';

export function compareIsoDate(a: Date | string, b: Date | string) {
  return compareAsc(new Date(a), new Date(b))
}
