import * as $ from "jquery"

export module NewPageParser {

    export function getSeasonsCount() {
        const container = $("[class^='BrowseEpisodes__BrowseEpisodesContainer']")
        const lastSeason = $( "[for='browse-episodes-season']", container).text() || $(".ipc-button__text:eq(1)", container).text()

        return parseInt(lastSeason.replace(/\D/, ''))
    }

    export function getTitle() {
        return document.getElementsByTagName("h1")[0].textContent || ''
    }
}