import { prisma } from '@infra/database/prisma';

import { makeCarSpecificationsRepository } from '@main/factories/repositories/CarSpecification';

export async function seedCarSpecifications() {
  try {
    await prisma.$connect();

    const carSpecificationsRepository = makeCarSpecificationsRepository();

    const carSpecifications = [
      {
        name: '2 portas',
        description: 'Carro com duas portas.',
      },
      {
        name: '3 portas',
        description: 'Carro com três portas.',
      },
      {
        name: '4 portas',
        description: 'Carro com quatro portas.',
      },
      {
        name: 'Bancos de couro',
        description: 'Carro com bancos de couro.',
      },
      {
        name: 'Teto solar',
        description: 'Carro com teto solar.',
      },
    ];

    carSpecifications.forEach(async specification => {
      const alreadyExists =
        await carSpecificationsRepository.checkIfExistsByName({
          name: specification.name,
        });

      if (!alreadyExists) {
        await carSpecificationsRepository.create({
          name: specification.name,
          description: specification.description,
        });
      }
    });

    console.log('👍 Car specifications seed done.');
  } catch (error) {
    console.log('👎 Fail to create car specifications.');

    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCarSpecifications();
