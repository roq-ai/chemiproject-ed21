const mapping: Record<string, string> = {
  compliances: 'compliance',
  inventories: 'inventory',
  organizations: 'organization',
  projects: 'project',
  tasks: 'task',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
