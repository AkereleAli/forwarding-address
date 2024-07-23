import { MigrationInterface, QueryRunner } from "typeorm";

export class UserMigration1721392307880 implements MigrationInterface {
    name = 'UserMigration1721392307880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`user_id\` varchar(36) NOT NULL COMMENT 'unique identifier', \`first_name\` varchar(255) NOT NULL, \`other_names\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`gender\` enum ('male', 'female') NOT NULL, \`address\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('ADMIN', 'USER') NOT NULL DEFAULT 'USER', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_b0ec0293d53a1385955f9834d5\` (\`address\`), UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_b0ec0293d53a1385955f9834d5\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
