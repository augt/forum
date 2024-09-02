import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: configService.get<string>(
    'POSTGRES_URL',
    'postgres://postgres:password@localhost:5432/forumproject',
  ),
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
