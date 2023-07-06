import { ComplianceInterface } from 'interfaces/compliance';
import { InventoryInterface } from 'interfaces/inventory';
import { TaskInterface } from 'interfaces/task';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  name: string;
  description?: string;
  status: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  compliance?: ComplianceInterface[];
  inventory?: InventoryInterface[];
  task?: TaskInterface[];
  organization?: OrganizationInterface;
  _count?: {
    compliance?: number;
    inventory?: number;
    task?: number;
  };
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  status?: string;
  organization_id?: string;
}
