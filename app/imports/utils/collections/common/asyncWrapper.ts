export const sync = <T extends unknown[]>(
    asyncFn: (...props: T) => Promise<void>,
): ((...props: T) => void) => {
    return (...props) => {
        asyncFn(...props).then();
    };
};
