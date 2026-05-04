import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1776480285548 implements MigrationInterface {
  name = 'Init1776480285548';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" text NOT NULL,
        "password" text NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        CONSTRAINT "uq_user_email" UNIQUE ("email"),
        CONSTRAINT "pk_user_id" PRIMARY KEY ("id")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "notes" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" text NOT NULL,
        "content" text NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "userId" uuid,
        CONSTRAINT "pk_note_id" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `ALTER TABLE "notes"
      ADD CONSTRAINT "fk_note_user_user_id"
      FOREIGN KEY ("userId")
      REFERENCES "users"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS idx_user_email ON "users"(email)',
    );

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION set_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryRunner.query(`
      CREATE TRIGGER user_set_updated_at_trigger
      BEFORE UPDATE ON "users"
      FOR EACH ROW
      EXECUTE FUNCTION set_updated_at();
    `);

    await queryRunner.query(`
      CREATE TRIGGER note_set_updated_at_trigger
      BEFORE UPDATE ON "notes"
      FOR EACH ROW
      EXECUTE FUNCTION set_updated_at();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notes" DROP CONSTRAINT "fk_note_user_user_id"`,
    );
    await queryRunner.query(`DROP TABLE "notes"`);
    await queryRunner.query(`DROP TABLE "users"`);

    await queryRunner.query(`
      DROP TRIGGER IF EXISTS user_set_updated_at_trigger ON "users";
    `);

    await queryRunner.query(`
      DROP TRIGGER IF EXISTS note_set_updated_at_trigger ON "users";
    `);

    await queryRunner.query(`
      DROP FUNCTION IF EXISTS set_updated_at;
    `);
  }
}
