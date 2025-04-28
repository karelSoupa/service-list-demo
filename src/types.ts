export interface Service {
  id: string;
  name: string;
  categoryIds: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  parentId: string | null;
  children: ServiceCategory[];
  services: Service[];
}
