package com.mudit.ipldash.controllers

import com.mudit.ipldash.model.Response
import com.mudit.ipldash.model.Team
import com.mudit.ipldash.repo.MatchRepo
import com.mudit.ipldash.repo.TeamRepo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
class TeamController {

    @Autowired
    private lateinit var teamRepo: TeamRepo

    @Autowired
    private lateinit var matchRepo: MatchRepo

    @GetMapping("/team/{teamName}")
    fun getTeam(@PathVariable teamName: String): Team {
        val team = teamRepo.findByTeamName(teamName)
        team.matches = matchRepo.getByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, 4))
        return team
    }

    @GetMapping("/teams")
    fun getAllTeams(): Response<List<Team>> {
        val response = Response<List<Team>>()
        response.data = teamRepo.findAllByOrderByTotalWinsDesc()
        response.status = "success"
        response.isError = false
        return response
    }
}