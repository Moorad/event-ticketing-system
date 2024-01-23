/*
  Warnings:

  - You are about to drop the column `expires` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `session_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[full_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `full_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "expires",
DROP COLUMN "session_token";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username",
ADD COLUMN     "full_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_full_name_key" ON "User"("full_name");
