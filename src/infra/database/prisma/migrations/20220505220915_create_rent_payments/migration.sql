-- CreateTable
CREATE TABLE "rent_payments" (
    "id" TEXT NOT NULL,
    "rent_id" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "paid_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rent_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rent_payments_rent_id_key" ON "rent_payments"("rent_id");

-- AddForeignKey
ALTER TABLE "rent_payments" ADD CONSTRAINT "rent_payments_rent_id_fkey" FOREIGN KEY ("rent_id") REFERENCES "rents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
