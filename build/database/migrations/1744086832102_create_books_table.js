import { BaseSchema } from '@adonisjs/lucid/schema';
export default class Books extends BaseSchema {
    tableName = 'books';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('title', 255).notNullable();
            table.string('author', 255).notNullable();
            table.integer('published_year').notNullable();
            table.timestamps(true, true);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1744086832102_create_books_table.js.map