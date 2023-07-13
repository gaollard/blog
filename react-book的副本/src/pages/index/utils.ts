import { TreeNode } from './MenuItem';

export function listToTree<
  T extends {
    id: number;
    pid: number;
  },
>(arr: T[]) {
  const result = [];
  const map = new Map();
  arr.forEach((item) => {
    map.set(item.id, item);
  });
  for (let item of arr) {
    if (map.has(item.pid)) {
      if (!map.get(item.pid).children) {
        map.get(item.pid).children = [];
      }
      map.get(item.pid).children.push(item);
    } else {
      result.push(item);
    }
  }
  return result as unknown as TreeNode[];
}
