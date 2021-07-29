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
CREATE TABLE "media_collection_tags" (
    "collectionId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    PRIMARY KEY ("collectionId","tagId")
);

-- CreateTable
CREATE TABLE "media_tags" (
    "mediaId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    PRIMARY KEY ("mediaId","tagId")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "nanoid" VARCHAR(20) NOT NULL,
    "slug" VARCHAR,
    "heading" VARCHAR NOT NULL,
    "headingDetailed" VARCHAR,
    "latinHeading" VARCHAR,
    "featuredMedia" JSON,
    "leadText" VARCHAR,
    "hightlights" VARCHAR,
    "content" JSON,
    "contentHtml" VARCHAR,
    "locale" VARCHAR NOT NULL DEFAULT E'dv',
    "layout" VARCHAR NOT NULL DEFAULT E'base',
    "status" "PostStatus" NOT NULL DEFAULT E'draft',
    "currentVersion" INTEGER NOT NULL DEFAULT 0,
    "isLocked" BOOLEAN NOT NULL DEFAULT true,
    "showAuthors" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "scheduledAt" TIMESTAMP(6),
    "editedBy" INTEGER,
    "editedAt" TIMESTAMP(6),
    "editorComments" JSON,
    "remarks" TEXT,
    "categoryId" INTEGER NOT NULL,
    "topicId" INTEGER,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedBy" INTEGER,
    "publishedAt" TIMESTAMP(6),
    "updatedBy" INTEGER,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_authors" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("postId","userId")
);

-- CreateTable
CREATE TABLE "post_meta" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER,
    "metaTitle" VARCHAR(300),
    "metaDescription" VARCHAR(500),
    "ogImage" VARCHAR,
    "ogTitle" VARCHAR(300),
    "ogDescription" VARCHAR(500),
    "twitterImage" VARCHAR,
    "twitterTitle" VARCHAR(300),
    "twitterDescription" VARCHAR(500),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_revisions" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "currentVersion" INTEGER NOT NULL DEFAULT 0,
    "heading" VARCHAR NOT NULL,
    "heading_detailed" VARCHAR,
    "latin_heading" VARCHAR,
    "lead_text" VARCHAR,
    "hightlights" VARCHAR,
    "content" JSON,
    "content_html" VARCHAR,
    "remarks" TEXT,
    "editedBy" INTEGER,
    "editedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editorComments" JSON,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedBy" INTEGER,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_tags" (
    "postId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    PRIMARY KEY ("postId","tagId")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "isRevoked" BOOLEAN NOT NULL,
    "expires" TIMESTAMP(6) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_token" (
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

-- CreateIndex
CREATE UNIQUE INDEX "media_createdBy_unique" ON "media"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "media_updatedBy_unique" ON "media"("updatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "media_collection_createdBy_unique" ON "media_collection"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "media_collection_updatedBy_unique" ON "media_collection"("updatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "post.nanoid_unique" ON "post"("nanoid");

-- CreateIndex
CREATE UNIQUE INDEX "post.slug_unique" ON "post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "post.heading_unique" ON "post"("heading");

-- CreateIndex
CREATE UNIQUE INDEX "post.latinHeading_unique" ON "post"("latinHeading");

-- CreateIndex
CREATE UNIQUE INDEX "post.editedBy_unique" ON "post"("editedBy");

-- CreateIndex
CREATE UNIQUE INDEX "post.createdBy_unique" ON "post"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "post.publishedBy_unique" ON "post"("publishedBy");

-- CreateIndex
CREATE UNIQUE INDEX "post.updatedBy_unique" ON "post"("updatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "post_meta.postId_unique" ON "post_meta"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "post_revisions.heading_unique" ON "post_revisions"("heading");

-- CreateIndex
CREATE UNIQUE INDEX "post_revisions.latin_heading_unique" ON "post_revisions"("latin_heading");

-- CreateIndex
CREATE UNIQUE INDEX "post_revisions_editedBy_unique" ON "post_revisions"("editedBy");

-- CreateIndex
CREATE UNIQUE INDEX "post_revisions_createdBy_unique" ON "post_revisions"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "post_revisions_updatedBy_unique" ON "post_revisions"("updatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token.name_unique" ON "refresh_token"("name");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token.nameEn_unique" ON "refresh_token"("nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token.slug_unique" ON "refresh_token"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tag_type.name_unique" ON "tag_type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tag_type.slug_unique" ON "tag_type"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

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
ALTER TABLE "media_collection_tags" ADD FOREIGN KEY ("collectionId") REFERENCES "media_collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_collection_tags" ADD FOREIGN KEY ("tagId") REFERENCES "refresh_token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_tags" ADD FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_tags" ADD FOREIGN KEY ("tagId") REFERENCES "refresh_token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD FOREIGN KEY ("editedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD FOREIGN KEY ("categoryId") REFERENCES "refresh_token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD FOREIGN KEY ("topicId") REFERENCES "refresh_token"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD FOREIGN KEY ("publishedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_authors" ADD FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_authors" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_meta" ADD FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_revisions" ADD FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_revisions" ADD FOREIGN KEY ("editedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_revisions" ADD FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_revisions" ADD FOREIGN KEY ("updatedBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD FOREIGN KEY ("tagId") REFERENCES "refresh_token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_token" ADD FOREIGN KEY ("parentId") REFERENCES "refresh_token"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_token" ADD FOREIGN KEY ("typeId") REFERENCES "tag_type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
