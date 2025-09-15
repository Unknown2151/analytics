-- CreateTable
CREATE TABLE "public"."AggregatedStats" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "eventName" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "AggregatedStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AggregatedStats_date_eventName_key" ON "public"."AggregatedStats"("date", "eventName");
