import Input from "@/components/primitives/Input";

export default function TicketNumberInput() {
    return <>
        <Input
            name="ticketNumber"
            label="Ticket Number"
            className="w-full text-left"
            placeholder="#91838927"
        />
    </>
}