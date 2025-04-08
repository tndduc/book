import vine from '@vinejs/vine';
export const registerValidator = vine.compile(vine.object({
    email: vine.string().email().normalizeEmail().unique(async (db, values) => {
        const user = await db.from('users').where('email', values).first();
        return !user;
    }),
    password: vine.string().minLength(8).maxLength(32)
}));
export const loginValidator = vine.compile(vine.object({
    email: vine.string().email().normalizeEmail(),
    password: vine.string().minLength(8).maxLength(32)
}));
//# sourceMappingURL=auth.js.map