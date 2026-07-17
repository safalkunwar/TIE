/**
 * Booking service abstraction.
 *
 * This is the single seam where real integrations plug in later:
 *   - Zoom API (create meeting + secure link)
 *   - Google Calendar / Outlook (calendar reminder invite)
 *   - Email provider (confirmation)
 *
 * Components import ONLY `createBooking` and consume `BookingConfirmation`.
 * Swapping the mock for `fetch("/api/bookings", ...)` requires no UI changes.
 */

import type { ConsultationBooking } from "@/data/consultation";

export type BookingConfirmation = {
  bookingId: string;
  /** Placeholder secure Zoom link until the Zoom API is wired in. */
  meetingUrl: string;
  /** Human meeting id, e.g. "TIE-4821". */
  meetingCode: string;
  status: "confirmed" | "pending";
  /** Echo of what was booked for display. */
  booking: ConsultationBooking;
};

/**
 * Mock booking creator. Simulates async latency and returns placeholder
 * confirmation data. Replace the body with a real API call — the signature and
 * return shape are intentionally production-ready.
 */
export async function createBooking(
  booking: ConsultationBooking,
): Promise<BookingConfirmation> {
  // Simulate network round-trip (Zoom + calendar + email fan-out).
  await new Promise((resolve) => setTimeout(resolve, 900));

  const code = `TIE-${Math.floor(1000 + Math.random() * 8999)}`;

  return {
    bookingId: `bk_${Date.now().toString(36)}`,
    // Placeholder — a real Zoom join URL will replace this.
    meetingUrl: `https://zoom.us/j/placeholder?tie=${code}`,
    meetingCode: code,
    status: "confirmed",
    booking,
  };
}
