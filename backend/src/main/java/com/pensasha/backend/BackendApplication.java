package com.pensasha.backend;

// Import necessary Spring Boot and scheduling classes
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main entry point for the Spring Boot application.
 * 
 * This class bootstraps the application and enables any scheduled tasks
 * defined within the project.
 */
@SpringBootApplication // Marks this as a Spring Boot application and triggers auto-configuration,
						// component scanning, etc.
@EnableScheduling // Enables Spring's scheduled task execution capability (@Scheduled annotations)
public class BackendApplication {

	/**
	 * Main method that starts the Spring Boot application.
	 * 
	 * @param args command-line arguments
	 */
	public static void main(String[] args) {
		// Launch the application by creating the Spring application context
		SpringApplication.run(BackendApplication.class, args);
	}

}
