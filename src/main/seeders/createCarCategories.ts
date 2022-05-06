import { prisma } from '@infra/database/prisma';

import { makeCarCategoriesRepository } from '@main/factories/repositories/CarCategory';

export async function seedCarCategories() {
  try {
    await prisma.$connect();

    const carCategoriesRepository = makeCarCategoriesRepository();

    const carCategories = [
      {
        name: 'Hatch',
        description:
          'Hatch é um apelido, originado da redução da palavra de língua inglesa hatchback, que significa, em tradução literal, “traseira com comporta”. Ou seja, é um carro que, em seu bagageiro, possui uma porta e não uma tampa. Esse detalhe é importante pois é o que define o conceito.',
      },
      {
        name: 'Sedan',
        description:
          'Sedans são carros com inicialização estendido. Estes são mais de hatchbacks. Estes também poderia acomodar no máximo 5 pessoas. Sedans continuam a ser um tipo de carro popular, proporcionando um bom equilíbrio de custo, conforto e eficiência.',
      },
      {
        name: 'SUV',
        description:
          'A sigla SUV significa Sport Utility Vehicle, ou veículo utilitário esportivo.',
      },
    ];

    carCategories.forEach(async category => {
      const alreadyExists = await carCategoriesRepository.checkIfExistsByName({
        name: category.name,
      });

      if (!alreadyExists) {
        await carCategoriesRepository.create({
          name: category.name,
          description: category.description,
        });
      }
    });

    console.log('👍 Car categories seed done.');
  } catch (error) {
    console.log('👎 Fail to create car categories.');

    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCarCategories();
