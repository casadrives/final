import { Driver } from './driver';

export type LeaveRequestStatus = 'pending' | 'approved' | 'rejected';
export type LeaveRequestType = 'sick' | 'personal' | 'emergency' | 'vacation';

export interface LeaveRequest {
  id: string;
  driverId: string;
  driver?: Driver;
  type: LeaveRequestType;
  reason: string;
  startDate: string;
  endDate: string;
  status: LeaveRequestStatus;
  documents?: File[];
  createdAt: string;
  updatedAt: string;
  reviewedBy?: string;
  reviewNote?: string;
}