package com.mudit.ipldash.processor

import com.mudit.ipldash.data.MatchInput
import com.mudit.ipldash.model.Match
import com.mudit.ipldash.model.Team
import org.springframework.batch.core.*
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory
import org.springframework.batch.core.launch.support.RunIdIncrementer
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider
import org.springframework.batch.item.database.JdbcBatchItemWriter
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder
import org.springframework.batch.item.file.FlatFileItemReader
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Component
import javax.persistence.EntityManager
import javax.sql.DataSource
import javax.transaction.Transactional


@Configuration
@EnableBatchProcessing
class BatchConfig {
    @Autowired
    lateinit var jobBuilderFactory: JobBuilderFactory

    @Autowired
    lateinit var stepBuilderFactory: StepBuilderFactory

    @Bean
    fun reader(): FlatFileItemReader<MatchInput> {
        return FlatFileItemReaderBuilder<MatchInput>()
                .name("MatchItemReader")
                .resource(ClassPathResource("match-data.csv"))
                .delimited()
                .names(*arrayOf("id", "city", "date", "player_of_match", "venue", "neutral_venue", "team1", "team2", "toss_winner", "toss_decision", "winner", "result", "result_margin", "eliminator", "method", "umpire1", "umpire2"))
                .fieldSetMapper(object : BeanWrapperFieldSetMapper<MatchInput?>() {
                    init {
                        setTargetType(MatchInput::class.java)
                    }
                })
                .linesToSkip(1)
                .build()
    }

    @Bean
    fun processor(): MatchDataProcessor {
        return MatchDataProcessor()
    }

    @Bean
    fun writer(dataSource: DataSource): JdbcBatchItemWriter<Match?>? {
        return JdbcBatchItemWriterBuilder<Match>()
                .itemSqlParameterSourceProvider(BeanPropertyItemSqlParameterSourceProvider())
                .sql("INSERT INTO MATCH (id,city,date,player_of_match,venue,team1,team2,toss_winner,toss_decision,match_winner,result_by,result_margin,umpire1,umpire2)" +
                        "VALUES (:id,:city,:date,:playerOfMatch,:venue,:team1,:team2,:tossWinner,:tossDecision,:matchWinner,:resultBy,:resultMargin,:umpire1,:umpire2)")
                .dataSource(dataSource)
                .build()
    }

    @Bean
    fun importUserJob(listener: JobCompletionNotificationListener, step1: Step): Job? {
        return jobBuilderFactory["importUserJob"]
                .incrementer(RunIdIncrementer())
                .listener(listener)
                .flow(step1)
                .end()
                .build()
    }

    @Bean
    fun step1(writer: JdbcBatchItemWriter<Match?>): Step? {
        return stepBuilderFactory["step1"]
                .chunk<MatchInput, Match>(10)
                .reader(reader())
                .processor(processor())
                .writer(writer)
                .build()
    }


    @Component
    class JobCompletionNotificationListener : JobExecutionListener {

        private var entityManager: EntityManager? = null

        @Autowired
        constructor(entityManager: EntityManager) {
            this.entityManager = entityManager
        }

        override fun beforeJob(jobExecution: JobExecution) {
            println("Before Job Start: ")
        }

        @Transactional
        override fun afterJob(jobExecution: JobExecution) {
            if (jobExecution.status == BatchStatus.COMPLETED) {
                val map = HashMap<String, Team>()

                entityManager?.createQuery("select distinct m.team1, count(m) from Match m group by m.team1", Array<Any>::class.java)
                        ?.resultList
                        ?.stream()
                        ?.map {
                            val i = it as Array<*>
                            val t = Team()
                            t.teamName = i[0] as String?
                            t.totalMatches = i[1] as Long
                            t
                        }?.forEach {
                            map[it.teamName] = it
                        }

                entityManager?.createQuery("select distinct m.team2, count(m) from Match m group by m.team2", Array<Any>::class.java)
                        ?.resultList?.stream()?.forEach {
                            it as Array<*>
                            val team = map[it[0]]
                            team?.totalMatches = (team?.totalMatches?:0) + it[1].toString().toLong()
                        }

                entityManager?.createQuery("select m.matchWinner, count(m) from Match m group by m.matchWinner", Array<Any>::class.java)
                        ?.resultList?.stream()?.forEach {
                            it as Array<*>
                            val team = map[it[0]]
                            team?.totalWins = it[1].toString().toLong()
                        }

                map.values.forEach {
                    entityManager?.persist(it)
                }

                map.values.forEach {
                    println(it)
                }

            }
        }

    }
}