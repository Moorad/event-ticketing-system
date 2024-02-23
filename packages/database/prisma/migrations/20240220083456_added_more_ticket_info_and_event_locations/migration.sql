/*
  Warnings:

  - The primary key for the `TicketType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `type` on the `TicketType` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `description` to the `TicketType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `TicketType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_type_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "type",
ADD COLUMN     "type" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TicketType" DROP CONSTRAINT "TicketType_pkey",
DROP COLUMN "type",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "TicketType_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "EventLocation" (
    "eventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EventLocation_pkey" PRIMARY KEY ("eventId")
);

-- AddForeignKey
ALTER TABLE "EventLocation" ADD CONSTRAINT "EventLocation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_type_fkey" FOREIGN KEY ("type") REFERENCES "TicketType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
