import { apiRequest } from "@/lib/api";

export type BookingContext = {
  providerId: string;
  providerName: string;
  defaultDuration: number;
  allowedDurations: number[];
  bufferTime: number;
  calendarStatus: string | null;
  timezone: string;
  source: string;
};

export type SlotStartTime = {
  startTime: string;
  availableDurations: number[];
  endTime: string | null;
};

export type AvailabilityDay = {
  date: string;
  isBookable: boolean;
  status: string;
  reason: string;
  availableSlotCount: number;
};

export type ProviderSlots = {
  providerId: string;
  date: string | null;
  startDate: string | null;
  endDate: string | null;
  allowedDurations: number[];
  visitTypes: string[];
  bufferTime: number;
  defaultDuration: number;
  status?: string | null;
  reason?: string | null;
  isBookable?: boolean | null;
  availableSlotCount?: number | null;
  total: number;
  startTimes: SlotStartTime[];
  days?: AvailabilityDay[] | null;
};

export type LeadBookingPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state?: string;
  goals: string[];
  notes?: string;
  textReminders: boolean;
  startTime: string;
  endTime: string;
};

export type LeadBookingResult = {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  meetUrl: string | null;
  providerName: string;
  source: string;
};

const PUBLIC_SCHEDULING = "/scheduling/public";

export function getBookingContext() {
  return apiRequest<BookingContext>(`${PUBLIC_SCHEDULING}/booking`);
}

export function getProviderSlots(date: string, duration?: number) {
  const query = new URLSearchParams({ date });
  if (duration) query.set("duration", String(duration));
  return apiRequest<ProviderSlots>(`${PUBLIC_SCHEDULING}/slots?${query.toString()}`);
}

export function getProviderAvailability(startDate: string, endDate: string, duration?: number) {
  const query = new URLSearchParams({ start_date: startDate, end_date: endDate });
  if (duration) query.set("duration", String(duration));
  return apiRequest<ProviderSlots>(`${PUBLIC_SCHEDULING}/availability?${query.toString()}`);
}

export function bookConsultation(payload: LeadBookingPayload) {
  return apiRequest<LeadBookingResult>(`${PUBLIC_SCHEDULING}/appointments`, {
    method: "POST",
    body: JSON.stringify({
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      state: payload.state,
      goals: payload.goals,
      notes: payload.notes,
      text_reminders: payload.textReminders,
      start_time: payload.startTime,
      end_time: payload.endTime,
    }),
  });
}

export type WaitlistPayload = { email: string; state: string };

// ponytail: assumes POST /scheduling/public/waitlist { email, state } exists on the backend; adjust the path if it differs.
export function joinWaitlist(payload: WaitlistPayload) {
  return apiRequest<unknown>(`${PUBLIC_SCHEDULING}/waitlist`, {
    method: "POST",
    body: JSON.stringify({ email: payload.email, state: payload.state }),
  });
}
