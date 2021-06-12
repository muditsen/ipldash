package com.mudit.ipldash.processor

import com.mudit.ipldash.data.MatchInput
import com.mudit.ipldash.model.Match
import com.mudit.ipldash.model.ResultBy
import com.mudit.ipldash.model.TossDecision
import org.springframework.batch.item.ItemProcessor
import java.time.LocalDate

class MatchDataProcessor : ItemProcessor<MatchInput, Match> {

    override fun process(input: MatchInput): Match {

        val inputTeam1 = input.team1
        val inputTeam2 = input.team2

        val team1: String
        val team2: String
        if ("bat".equals(input.toss_decision, true)) {
            team1 = input.toss_winner ?: ""
            team2 = if (input.toss_winner.equals(inputTeam1, true)) inputTeam2 ?: "" else inputTeam1 ?: ""
        } else {
            team2 = input.toss_winner ?: ""
            team1 = if (input.toss_winner.equals(inputTeam1, true)) inputTeam2 ?: "" else inputTeam1 ?: ""
        }

        return Match(
                id = input.id?.toLong() ?: 0L,
                city = input.city ?: "",
                date = LocalDate.parse(input.date),
                playerOfMatch = input.player_of_match ?: "",
                venue = input.venue ?: "",
                team1 = team1,
                team2 = team2,
                tossWinner = input.toss_winner ?: "",
                tossDecision = if (input.toss_decision == "bat") TossDecision.BAT.name else TossDecision.FIELD.name,
                matchWinner = input.winner ?: "",
                resultBy = if (input.result == "wickets") ResultBy.WICKETS.name else if (input.result == "runs") ResultBy.RUNS.name else ResultBy.TIE.name,
                resultMargin = input.result_margin ?: "",
                umpire1 = input.umpire1 ?: "",
                umpire2 = input.umpire2 ?: ""
        )
    }

}