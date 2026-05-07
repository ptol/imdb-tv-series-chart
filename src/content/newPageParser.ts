import * as $ from "jquery"

export module NewPageParser {

    export function getSeasonsCount() {
        const $spotlight = $('[data-testid="episode-ratings-spotlight"]')
        const hasSpotlight = $spotlight.length > 0
        const lastSeasonNumber = Number(
          $spotlight
            .find('ul[role="tablist"] > li[role="tab"]')
            .last()
            .text()
            .trim()
            .replace(/^S/, '')
        );
        if(hasSpotlight) {
            return lastSeasonNumber > 0 ? lastSeasonNumber : 1;
        }

        const container = $("[data-testid='episodes-browse-episodes']")

        const lastSeason = $( "[for='browse-episodes-season']", container).text() || container.length.toString()

        return parseInt(lastSeason.replace(/\D/, ''))
    }

    export function getTitle() {
        return document.getElementsByTagName("h1")[0].textContent || ''
    }
}