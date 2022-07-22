export const sync = <T extends any[]> (asyncFn: (...props: T) => Promise<void>): (...props: T) => void => {
    return (...props) => {
        asyncFn(...props).then();
    };
};
