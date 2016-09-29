package com.uniandes.thesis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;

/**
 *
 * @author Julián Yezid Castellanos Pinzón <jcastellanos@vectoritcgroup.com>
 */
@Configuration
@EnableScheduling
public class SchedulerConfiguration  {

    @Bean
    public TaskScheduler taskScheduler() {
        return new ConcurrentTaskScheduler();
    }

}
