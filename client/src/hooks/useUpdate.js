// This hook initializes with an object and nested array key
// and updates the nested array with or without nested object

function useUpdate(object, key) {

    function updateWith(nestedObject) {
        const { id } = nestedObject;
        if(object[key].find((o) => o.id === id)) {
            const updatedNestedObjects = [...object[key].map((o) => o.id === id ? nestedObject : o)];
            const updatedObject = { ...object, [key]: updatedNestedObjects};
            return updatedObject;
        } else {
            const updatedObject = { ...object, [key]: [...object[key], nestedObject]}
            return updatedObject;
        }
    };

    function updateWithout(nestedObjectId) {
        const updatedNestedObjects = [...object[key].filter((o) => o.id !== nestedObjectId)];
        const updatedObject = { ...object, [key]: updatedNestedObjects}
        return updatedObject
    }

    const props = {
        updateWith: updateWith,
        updateWithout: updateWithout
    };

    return props;
}

export default useUpdate;