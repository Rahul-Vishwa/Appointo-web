import { FormControl } from "@angular/forms";

export interface BookAppointment {
    date: FormControl<string | null>;
    time: FormControl<string | null>;
}

export interface GetAppointments {
    appointments: Array<GetAppointment>;
    totalCount: number;
}

export interface GetAppointment {
    id: number;
    date: string;
    time: string;
    createdAt: Date;
    modifiedAt?: Date;
    modifiedBy?: string;
}

export interface LeaveForm {
    date: FormControl<string | null>;
    fromTime: FormControl<string | null>;
    toTime: FormControl<string | null>;
}

export interface GetLeave {
    id: number;
    leaveType: string;
    fromTime?: string;
    toTime?: string;
}

export interface BookedSlots{
    id: number; 
    userId: number | null; 
    time: string; 
    name: string; 
}