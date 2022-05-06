-- CreateEnum
CREATE TYPE "CarTypeOfFuel" AS ENUM ('ALCOHOL', 'GAS', 'ELETRICITY');

-- CreateEnum
CREATE TYPE "CarTransmissionType" AS ENUM ('AUTO', 'MANUAL');

-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "daily_rate" DOUBLE PRECISION NOT NULL,
    "daily_late_fee" DOUBLE PRECISION NOT NULL,
    "brand_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "type_of_fuel" "CarTypeOfFuel" NOT NULL,
    "transmission_type" "CarTransmissionType" NOT NULL,
    "number_of_seats" INTEGER NOT NULL,
    "horse_power" DOUBLE PRECISION NOT NULL,
    "max_speed" DOUBLE PRECISION NOT NULL,
    "zero_to_one_hundred_in_millisseconds" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_license_plate_key" ON "cars"("license_plate");

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "car_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "car_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
