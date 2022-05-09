import darkHouse from "../../icons/darkHouse.svg"
import colorHouse from "../../icons/colorHouse.svg"
import lightHouse from "../../icons/lightHouse.svg"

import darkCamera from "../../icons/darkCamera.svg"
import colorCamera from "../../icons/colorCamera.svg"
import lightCamera from "../../icons/lightCamera.svg"

import darkBed from "../../icons/darkBed.svg"
import colorBed from "../../icons/colorBed.svg"
import lightBed from "../../icons/lightBed.svg"

import darkMap from "../../icons/darkMap.svg"
import colorMap from "../../icons/colorMap.svg"
import lightMap from "../../icons/lightMap.svg"

import darkCalendar from "../../icons/darkCalendar.svg"
import colorCalendar from "../../icons/colorCalendar.svg"
import lightCalendar from "../../icons/lightCalendar.svg"

import darkConversation from "../../icons/darkConversation.svg"
import colorConversation from "../../icons/colorConversation.svg"
import lightConversation from "../../icons/lightConversation.svg"
import { importIcons } from "../imagesImporter"


export const globalIcons = importIcons("../icons/portada/")[1];

// export its icons
const iconDictionary = {
    house:[darkHouse,colorHouse,lightHouse],
    camera:[darkCamera,colorCamera,lightCamera],
    bed:[darkBed,colorBed,lightBed],
    map:[darkMap,colorMap,lightMap],
    calendar:[darkCalendar,colorCalendar,lightCalendar],
    conversation:[darkConversation,colorConversation,lightConversation]
}


export default iconDictionary;