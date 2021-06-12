package com.mudit.ipldash.controllers

import com.mudit.ipldash.model.Match
import com.mudit.ipldash.model.Response
import com.mudit.ipldash.repo.MatchRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
@CrossOrigin
class MatchController {

    @Autowired
    private lateinit var matchRepo: MatchRepo


    @GetMapping("/team/{teamName}/matches")
    fun getTeam(@PathVariable teamName: String, @RequestParam year: Int): Response<List<Match>> {
        val startDate = LocalDate.of(year, 1, 1)
        val endDate = LocalDate.of(year + 1, 1, 1)

        val response = Response<List<Match>>()
        response.data = matchRepo.getMatchesByTeamBetweenDates(
            teamName, startDate, endDate
        )
        response.isError = false
        response.status = "Success"
        return response
    }
}