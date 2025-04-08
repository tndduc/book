import vine from '@vinejs/vine';
export const bookValidator = vine.compile(vine.object({
    title: vine.string().minLength(1).maxLength(255),
    author: vine.string().minLength(1).maxLength(255),
    published_year: vine.number().withoutDecimals().positive()
}));
//# sourceMappingURL=book.js.map