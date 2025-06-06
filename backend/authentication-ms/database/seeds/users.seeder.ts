import { User, UserRole } from 'src/modules/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    const count = await userRepository.count();

    if (count === 0) {
      const userFactory = factoryManager.get(User);

      await userFactory.save({
        password: await bcrypt.hash(process.env.AUTHENTICATION_MS_BACKEND_USERS_PASSWORDS, 10),
        email: 'admin@egrocery.com', 
        role: UserRole.ADMINISTRATOR, 
        id: 'a1fa8681-72af-4363-869a-930e123794a7',
        emailVerified: true,
      });

      await userFactory.save({
        email: 'customer@egrocery.com', 
        password: await bcrypt.hash(process.env.AUTHENTICATION_MS_BACKEND_USERS_PASSWORDS, 10),
        emailVerified: true,
      });

      console.log('Users seeded successfully.');
    } else {
      console.log(`Skipped seeding users. ${count} users already exist.`);
    }
  }
}