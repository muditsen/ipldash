package com.mudit.ipldash.repo

import com.mudit.ipldash.model.Match
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import java.time.LocalDate

interface MatchRepo : CrudRepository<Match, Long> {

    fun getByTeam1OrTeam2OrderByDateDesc(team1: String, team2: String, pageable: Pageable): List<Match>

    fun getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(
        team1: String,
        startDate1: LocalDate,
        endDate1: LocalDate,
        team2: String,
        startDate2: LocalDate,
        endDate2: LocalDate
    ): List<Match>

    @Query("SELECT m from Match m where (m.team1=:teamName or m.team2=:teamName) and (m.date between :dateStart and :dateEnd) order by m.date desc ")
    fun getMatchesByTeamBetweenDates(
        @Param("teamName") teamName: String,
        @Param("dateStart") startDate: LocalDate,
        @Param("dateEnd") endDate: LocalDate
    ): List<Match>
}