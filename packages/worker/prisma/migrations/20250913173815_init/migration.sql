-- CreateTable
CREATE TABLE "public"."RawEvent" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "payload" JSONB,

    CONSTRAINT "RawEvent_pkey" PRIMARY KEY ("id")
);
