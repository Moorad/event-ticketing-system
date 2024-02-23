/*
  Warnings:

  - You are about to drop the column `count` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `associatedName` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookedDate` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatNo` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "count",
ADD COLUMN     "associatedName" TEXT NOT NULL,
ADD COLUMN     "bookedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "locationId" INTEGER NOT NULL,
ADD COLUMN     "seatNo" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "EventLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
