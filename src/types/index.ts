export interface ServiceCategory {
  id: string;
  name: string;
  parentId: string | null;
  children?: ServiceCategory[];
}

export interface Service {
  id: string;
  name: string;
  categoryIds: string[];
} 