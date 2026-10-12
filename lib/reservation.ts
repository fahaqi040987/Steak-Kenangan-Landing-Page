/**
 * Reservation seam — turns form fields into a reservation request and hands it
 * to a channel. Two adapters justify the seam: WhatsApp today (wa.me deep link),
 * the PRD's HTTP reservation backend later behind the same interface — the form
 * never knows which one is plugged in.
 */
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

/** What the guest asked for. Pure data — no wire format, no UI types. */
export interface ReservationRequest {
  firstName: string;
  lastName: string;
  date: Date;
  time: string;
  guests: number;
}

/** The seam. One implementation per transport; the form depends only on this. */
export interface ReservationChannel {
  readonly id: string;
  send: (request: ReservationRequest) => void;
}

/**
 * Pure: request → wa.me deep link. The message format is the WhatsApp adapter's
 * wire format; encoding is handled by encodeURIComponent.
 */
export function buildReservationLink(
  request: ReservationRequest,
  waNumber: string
): string {
  const { firstName, lastName, date, time, guests } = request;
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const message = [
    "Halo Steak Kenangan, saya ingin reservasi meja.",
    `Nama: ${fullName}`,
    `Tanggal: ${format(date, "EEEE, d MMMM yyyy", { locale: localeId })}`,
    `Jam: ${time} WIB`,
    `Jumlah orang: ${guests}`,
  ].join("\n");
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}

/** WhatsApp adapter: opens the deep link in a new tab. */
export function createWhatsAppChannel(waNumber: string): ReservationChannel {
  return {
    id: "whatsapp",
    send: (request) => {
      window.open(
        buildReservationLink(request, waNumber),
        "_blank",
        "noopener,noreferrer"
      );
    },
  };
}
