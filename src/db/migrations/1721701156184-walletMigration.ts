import { MigrationInterface, QueryRunner } from "typeorm";

export class WalletMigration1721701156184 implements MigrationInterface {
    name = 'WalletMigration1721701156184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`wallet\` (\`wallet_id\` varchar(36) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`amount_before\` int NOT NULL DEFAULT '0', \`amount_after\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`wallet_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`wallet\``);
    }

}
