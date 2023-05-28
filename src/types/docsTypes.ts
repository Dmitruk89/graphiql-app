export type DocsType = { name: string; kind: string; description: string; ofType: DocsOfType };
export type DocsField = {
  name: string;
  description: string;
  type: DocsType;
  args?: DocsArg[];
};
export type DocsArg = {
  name: string;
  description: string;
  type: DocsType;
};
export type DocsOfType = { kind: string; name: string; ofType: DocsOfType };

export type DocsListItem = { name: string; isType: boolean };
