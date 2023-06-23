import { returnLocations } from "./storage"
import { generateUI } from "./ui"

const contentContainer = document.querySelector('.content')

function init() {
    generateUI(returnLocations())
}

function getContentContainer() {
    return contentContainer
}

init ()

export { getContentContainer }