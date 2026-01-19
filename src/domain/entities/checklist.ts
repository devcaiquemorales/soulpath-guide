export type Task = {
  id: string;
  text: string;
  note?: string;
  isMissable?: boolean;
  isPointOfNoReturn?: boolean;
};

export type ChecklistStep = {
  id: string;
  order: number;
  locationCode?: string;
  title: string;
  isRevisit?: boolean;
  tasks: Task[];
};
