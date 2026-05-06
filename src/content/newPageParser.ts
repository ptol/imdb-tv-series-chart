import * as $ from "jquery"

export module NewPageParser {

    export function getSeasonsCount() {
        const lastSeasonNumber = Number(
          $('[data-testid="episode-ratings-spotlight"]')
            .find('ul[role="tablist"] > li[role="tab"]')
            .last()
            .text()
            .trim()
            .replace(/^S/, '')
        );
        if(lastSeasonNumber > 0) {
            return lastSeasonNumber
        }

        const container = $("[data-testid='episodes-browse-episodes']")

        const lastSeason = $( "[for='browse-episodes-season']", container).text() || container.length.toString()

        return parseInt(lastSeason.replace(/\D/, ''))
    }

    export function getTitle() {
        return document.getElementsByTagName("h1")[0].textContent || ''
    }
}