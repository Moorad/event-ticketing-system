/*
  Warnings:

  - The primary key for the `EventLocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `EventLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventLocation" DROP CONSTRAINT "EventLocation_pkey",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "EventLocation_pkey" PRIMARY KEY ("id");
