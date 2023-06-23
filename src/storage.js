function returnLocations() {
    if (storageAvailable("localStorage")) {
        return getFromStorage()
    }
    else {
        console.log("storage not available")
    }
}

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            (e.code === 22 || 
                e.code === 1014 || 
                e.name === "QuotaExceededError" || 
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            storage &&
            storage.length !== 0
        );
    }
}

function getFromStorage() {
    const storedLocations = localStorage.getItem("locations")
    if (!storedLocations) {
        populateStorage();
    }
    else {
        return JSON.parse(storedLocations)
    }
}

function populateStorage(locations = defaultLocations) {
    localStorage.clear()
    localStorage.setItem("locations", JSON.stringify(locations))
}

const defaultLocations = ["Chelmsford", "Birmingham", "Cavtat"]

export { returnLocations, populateStorage, getFromStorage }