-- CreateTable
CREATE TABLE "TicketType" (
    "type" TEXT NOT NULL,
    "cost" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "TicketType_pkey" PRIMARY KEY ("type")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_type_fkey" FOREIGN KEY ("type") REFERENCES "TicketType"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
