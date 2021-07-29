/*
  Warnings:

  - You are about to drop the column `hightlights` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "hightlights",
ADD COLUMN     "highlights" VARCHAR;
