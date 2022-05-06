import { prisma } from '@infra/database/prisma';

import { makeBcryptjsHashProvider } from '@main/factories/providers/BcryptjsHashProviderFactory';
import { makeUsersRepository } from '@main/factories/repositories/User';

export async function seedAdminUser() {
  try {
    await prisma.$connect();

    const usersRepository = makeUsersRepository();

    const adminEmail = 'admin@rentx.com.br';

    const alreadyExists = await usersRepository.checkIfExistsByEmail({
      email: adminEmail,
    });

    if (alreadyExists) {
      console.log('👌 Admin already exists.');

      return;
    }

    const hashProvider = makeBcryptjsHashProvider();

    const passwordHash = await hashProvider.hash({ value: 'administrator' });

    await usersRepository.create({
      name: 'Rent-X Administrator',
      driver_license: '69002796169',
      role: 'ADMIN',
      email: adminEmail,
      password_hash: passwordHash,
    });

    console.log('👍 Admin seed done.');
  } catch (error) {
    console.log('👎 Fail to create administrator.');

    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdminUser();
