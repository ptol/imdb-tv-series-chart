import * as $ from "jquery"

export module NewPageParser {

    export function getSeasonsCount() {
        const container = $(".episodes-browse-episodes")
        const lastSeason = $( "[for='browse-episodes-season']", container).text() || container.length.toString()

        return parseInt(lastSeason.replace(/\D/, ''))
    }

    export function getTitle() {
        return document.getElementsByTagName("h1")[0].textContent || ''
    }
}