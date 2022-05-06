import { prisma } from '@infra/database/prisma';

import { makeCarBrandsRepository } from '@main/factories/repositories/CarBrand';

export async function seedCarBrands() {
  try {
    await prisma.$connect();

    const carBrandsRepository = makeCarBrandsRepository();

    const carBrandNames = ['Audi', 'BMW', 'Hyundai'];

    carBrandNames.forEach(async name => {
      const alreadyExists = await carBrandsRepository.checkIfExistsByName({
        name,
      });

      if (!alreadyExists) {
        await carBrandsRepository.create({
          name,
        });
      }
    });

    console.log('👍 Car brands seed done.');
  } catch (error) {
    console.log('👎 Fail to create car brands.');

    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCarBrands();
