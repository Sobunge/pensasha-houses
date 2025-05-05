package com.pensasha.backend.modules.invoice;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Scheduler class responsible for handling all invoice-related scheduled tasks.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class InvoiceScheduler {

    private final InvoiceService invoiceService;

    /**
     * Runs on the 5th of every month at midnight to generate monthly invoices.
     */
    @Scheduled(cron = "0 0 0 5 * ?")
    public void runMonthlyInvoiceGeneration() {
        log.info("Starting monthly invoice generation...");
        invoiceService.generateMonthlyInvoices();
        log.info("Monthly invoice generation completed.");
    }
}
