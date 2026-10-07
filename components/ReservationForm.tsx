"use client";

/**
 * ReservationForm – Collects reservation details and hands them to the reservation
 * channel (lib/reservation). Copy & config come from content/site; the WhatsApp
 * adapter opens a wa.me deep link. Swapping in the PRD's HTTP adapter is a
 * one-line change: replace createWhatsAppChannel with the new channel factory.
 */
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { createWhatsAppChannel } from "@/lib/reservation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const { reservasi } = site;

export default function ReservationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [hint, setHint] = useState<string | null>(null);

  /** The only place the transport is chosen. Swap here when the PRD backend lands. */
  const channel = useMemo(
    () => createWhatsAppChannel(reservasi.waNumber),
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName.trim() || !date || !time || !guests) {
      setHint("Mohon lengkapi nama depan, tanggal, jam, dan jumlah orang.");
      return;
    }
    setHint(null);
    channel.send({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      date,
      time,
      guests: Number(guests),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-10">
      <div className="grid gap-[30px]">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
          <div>
            <Label htmlFor="firstname">nama depan</Label>
            <Input
              id="firstname"
              name="firstname"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="lastname">nama belakang</Label>
            <Input
              id="lastname"
              name="lastname"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-[30px]">
          <div>
            <Label htmlFor="tanggal">tanggal</Label>
            {/* Radix Popover wraps trigger (button) and content (Calendar); asChild forwards props to Button.
                The trigger carries the label's id so the htmlFor association resolves to a real control. */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="tanggal"
                  variant="input"
                  className={cn("w-full justify-start text-left font-normal")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP")
                  ) : (
                    <span>Pilih tanggal…</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="jam">jam</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="jam" className="w-full">
                <SelectValue placeholder="Pilih jam…" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Jam</SelectLabel>
                  {reservasi.timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="jumlah-orang">jumlah orang</Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger id="jumlah-orang" className="w-full">
                <SelectValue placeholder="Berapa orang…" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Orang</SelectLabel>
                  {Array.from({ length: 10 }, (_, i) => String(i + 1)).map(
                    (n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" className="uppercase w-full xl:w-auto xl:self-end">
          {reservasi.submitLabel}
        </Button>
        {hint && (
          <p
            className="text-gold text-sm text-center xl:text-right -mt-6"
            aria-live="polite"
          >
            {hint}
          </p>
        )}
      </div>
    </form>
  );
}
