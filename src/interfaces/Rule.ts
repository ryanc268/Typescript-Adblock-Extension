export interface Rule {
  id: number;
  priority: number;
  action: {
    type: string;
  };
  condition: {
    urlFilter: string;
    resourceTypes: string[];
  };
}
