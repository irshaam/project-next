/*
  Warnings:

  - You are about to drop the column `metaDescription` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the column `metaTitle` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the column `ogDescription` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the column `ogImage` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the column `ogTitle` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the column `twitterDescription` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the column `twitterImage` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the column `twitterTitle` on the `tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tag" DROP COLUMN "metaDescription",
DROP COLUMN "metaTitle",
DROP COLUMN "ogDescription",
DROP COLUMN "ogImage",
DROP COLUMN "ogTitle",
DROP COLUMN "twitterDescription",
DROP COLUMN "twitterImage",
DROP COLUMN "twitterTitle";
