import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsers1703179416280 implements MigrationInterface {
    name = 'createUsers1703179416280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `first_name` varchar(255) NULL, `email` varchar(255) NOT NULL, `phone` varchar(255) NULL, `password` text NOT NULL, `is_admin` tinyint NOT NULL DEFAULT 0, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `last_login` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `IDX_a3ffb1c0c8416b9fc6f907b743` (`id`), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `IDX_a000cca60bcf04454e72769949` (`phone`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_a000cca60bcf04454e72769949` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_a3ffb1c0c8416b9fc6f907b743` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
