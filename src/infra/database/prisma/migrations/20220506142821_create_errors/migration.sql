-- CreateTable
CREATE TABLE "errors" (
    "id" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "resource_uri" TEXT NOT NULL,
    "http_method" TEXT NOT NULL,
    "thrown_at" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "errors_pkey" PRIMARY KEY ("id")
);
