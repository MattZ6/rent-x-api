-- CreateTable
CREATE TABLE "cars_specifications" (
    "car_id" TEXT NOT NULL,
    "specification_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_specifications_car_id_specification_id_key" ON "cars_specifications"("car_id", "specification_id");

-- AddForeignKey
ALTER TABLE "cars_specifications" ADD CONSTRAINT "cars_specifications_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "car_specifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars_specifications" ADD CONSTRAINT "cars_specifications_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
