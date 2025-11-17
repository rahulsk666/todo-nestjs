import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.raw(
    'CREATE TABLE IF NOT EXISTS todos (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),title VARCHAR(255) NOT NULL,description TEXT,completed BOOLEAN NOT NULL DEFAULT FALSE,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())',
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.raw('DROP TABLE IF EXISTS todos');
}
