-- CreateTable
CREATE TABLE "tag_meta" (
    "id" SERIAL NOT NULL,
    "ogImage" VARCHAR,
    "ogTitle" VARCHAR(300),
    "ogDescription" VARCHAR(500),
    "twitterImage" VARCHAR,
    "twitterTitle" VARCHAR(300),
    "twitterDescription" VARCHAR(500),
    "metaTitle" VARCHAR(300),
    "metaDescription" VARCHAR(500),
    "tagId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tag_meta" ADD FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
