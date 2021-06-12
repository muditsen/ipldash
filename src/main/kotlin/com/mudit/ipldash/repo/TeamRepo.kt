package com.mudit.ipldash.repo

import com.mudit.ipldash.model.Team
import org.springframework.data.repository.CrudRepository

interface TeamRepo : CrudRepository<Team, Long> {

    fun findByTeamName(teamName: String): Team

}