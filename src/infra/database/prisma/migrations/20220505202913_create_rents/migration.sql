-- CreateTable
CREATE TABLE "rents" (
    "id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "daily_late_fee" DOUBLE PRECISION NOT NULL,
    "daily_rate" DOUBLE PRECISION NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "expected_return_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3),
    "payment_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rents" ADD CONSTRAINT "rents_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
