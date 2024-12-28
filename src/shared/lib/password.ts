export const removePassword = <T extends { passwordHash?: string }>(
    data: T
): Omit<T, "passwordHash"> => {
    return { ...data, passwordHash: undefined };
};
