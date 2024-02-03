function useAbcOrder(array) {
    return [...array].sort((a, b) => {
        const nameA = a.name
        const nameB = b.name
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
    });
}

export default useAbcOrder;