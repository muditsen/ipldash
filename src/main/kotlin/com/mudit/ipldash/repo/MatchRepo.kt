package com.mudit.ipldash.repo

import com.mudit.ipldash.model.Match
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.CrudRepository

interface MatchRepo : CrudRepository<Match, Long> {

    fun getByTeam1OrTeam2OrderByDateDesc(team1:String,team2:String,pageable: Pageable): List<Match>

}