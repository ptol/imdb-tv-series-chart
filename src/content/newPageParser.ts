import * as $ from "jquery"

export module NewPageParser {

    export function getSeasonsCount() {
        const option = $("[class^='BrowseEpisodes__BrowseEpisodesContainer'] option:eq(1)")[0] as any
        return parseInt(option.value)
    }

    export function getTitle() {
        return document.getElementsByTagName("h1")[0].textContent || ''
    }
}