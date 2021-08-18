-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('draft', 'review', 'rejected', 'approved', 'scheduled', 'published', 'unpublished', 'archived');

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "file" VARCHAR NOT NULL,
    "originalFilename" VARCHAR NOT NULL,
    "path" VARCHAR NOT NULL,
    "contentSize" VARCHAR,
    "mimeType" VARCHAR,
    "type" VARCHAR NOT NULL,
    "caption" VARCHAR,
    "captionEn" VARCHAR,
    "hasWatermark" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "collectionId" INTEGER,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_collection" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "name_en" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "nanoid" VARCHAR(20) NOT NULL,
    "slug" VARCHAR,
    "heading" VARCHAR,
    "headingDetailed" VARCHAR NOT NULL,
    "latinHeading" VARCHAR,
    "featuredMedia" JSON,
    "leadText" VARCHAR,
    "highlights" VARCHAR,
    "content" JSON,
    "contentHtml" VARCHAR,
    "locale" VARCHAR NOT NULL DEFAULT E'dv',
    "layout" VARCHAR NOT NULL DEFAULT E'base',
    "status" "PostStatus" NOT NULL DEFAULT E'draft',
    "currentVersion" INTEGER NOT NULL DEFAULT 0,
    "isLocked" BOOLEAN NOT NULL DEFAULT true,
    "showAuthors" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN DEFAULT false,
    "isPublished" BOOLEAN DEFAULT false,
    "scheduledAt" TIMESTAMP(6),
    "categoryId" INTEGER,
    "topicId" INTEGER,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "isRevoked" BOOLEAN NOT NULL,
    "expires" TIMESTAMP(6) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "nameEn" VARCHAR NOT NULL,
    "slug" VARCHAR NOT NULL,
    "description" TEXT,
    "descriptionEn" TEXT,
    "image" VARCHAR,
    "icon" VARCHAR,
    "primaryColor" VARCHAR,
    "secondryColor" VARCHAR,
    "layout" VARCHAR,
    "ogImage" VARCHAR,
    "ogTitle" VARCHAR(300),
    "ogDescription" VARCHAR(500),
    "twitterImage" VARCHAR,
    "twitterTitle" VARCHAR(300),
    "twitterDescription" VARCHAR(500),
    "metaTitle" VARCHAR(300),
    "metaDescription" VARCHAR(500),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" INTEGER,
    "parentId" INTEGER,
    "typeId" INTEGER NOT NULL,
    "mediaId" INTEGER,
    "mediaCollectionId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "slug" VARCHAR,
    "layout" VARCHAR NOT NULL DEFAULT E'default',
    "meta" JSON,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "nameEn" VARCHAR,
    "slug" VARCHAR,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "picture" VARCHAR,
    "coverPicture" VARCHAR,
    "bio" VARCHAR,
    "bioEn" VARCHAR,
    "twitter" VARCHAR,
    "facebook" VARCHAR,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "__media_tags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "__collection_tags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "__post_tags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "__post_authors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "post.nanoid_unique" ON "post"("nanoid");

-- CreateIndex
CREATE UNIQUE INDEX "post.slug_unique" ON "post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "post.heading_unique" ON "post"("heading");

-- CreateIndex
CREATE UNIQUE INDEX "post.latinHeading_unique" ON "post"("latinHeading");

-- CreateIndex
CREATE UNIQUE INDEX "tag.name_unique" ON "tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tag.nameEn_unique" ON "tag"("nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "tag.slug_unique" ON "tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tag_type.name_unique" ON "tag_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_type.slug_unique" ON "tag_type"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "__media_tags_AB_unique" ON "__media_tags"("A", "B");

-- CreateIndex
CREATE INDEX "__media_tags_B_index" ON "__media_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "__collection_tags_AB_unique" ON "__collection_tags"("A", "B");

-- CreateIndex
CREATE INDEX "__collection_tags_B_index" ON "__collection_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "__post_tags_AB_unique" ON "__post_tags"("A", "B");

-- CreateIndex
CREATE INDEX "__post_tags_B_index" ON "__post_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "__post_authors_AB_unique" ON "__post_authors"("A", "B");

-- CreateIndex
CREATE INDEX "__post_authors_B_index" ON "__post_authors"("B");

-- AddForeignKey
ALTER TABLE "media" ADD FOREIGN KEY ("collectionId") REFERENCES "media_collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_collection" ADD FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_collection" ADD FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD FOREIGN KEY ("categoryId") REFERENCES "tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD FOREIGN KEY ("topicId") REFERENCES "tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag" ADD FOREIGN KEY ("parentId") REFERENCES "tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag" ADD FOREIGN KEY ("typeId") REFERENCES "tag_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag" ADD FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag" ADD FOREIGN KEY ("mediaCollectionId") REFERENCES "media_collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__media_tags" ADD FOREIGN KEY ("A") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__media_tags" ADD FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__collection_tags" ADD FOREIGN KEY ("A") REFERENCES "media_collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__collection_tags" ADD FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__post_tags" ADD FOREIGN KEY ("A") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__post_tags" ADD FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__post_authors" ADD FOREIGN KEY ("A") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "__post_authors" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
