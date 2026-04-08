package com.pensasha.backend.modules.user;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    public void sendResetEmail(String to, String resetLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("it-support@fairwayshotel.com");
        message.setTo(to);
        message.setSubject("Password Reset Request - Fairways Hotel");
        message.setText("To reset your password, click the link below:\n" + resetLink);
        
        mailSender.send(message);
    }
}
