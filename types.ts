
export enum UserRole {
  OWNER = 'OWNER',
  TENANT = 'TENANT'
}

export enum BillType {
  SERVICE_CHARGE = 'Service Charge',
  WATER = 'Water Bill',
  ELECTRICITY = 'Electricity Bill',
  MAINTENANCE = 'Maintenance Fee'
}

export enum BillStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  OVERDUE = 'OVERDUE'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  flatId?: string; // Only for tenants
}

export interface Flat {
  id: string;
  name: string; // e.g. "A-101"
  ownerId: string;
  tenantId?: string;
  cost: number; // Base rent or maintenance cost
  description?: string;
}

export interface Bill {
  id: string;
  flatId: string;
  type: BillType;
  amount: number;
  status: BillStatus;
  dueDate: string;
  billingMonth: string;
}

export interface MaintenanceRequest {
  id: string;
  flatId: string;
  userId: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}
