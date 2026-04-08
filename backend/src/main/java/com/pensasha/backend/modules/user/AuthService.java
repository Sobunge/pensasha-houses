package com.pensasha.backend.modules.user;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JavaMailSender mailSender;
    private final PasswordResetTokenRepository tokenRepository;

    public void createPasswordResetTokenForUser(User user, String token) {
        PasswordResetToken myToken = new PasswordResetToken(token, user);
        tokenRepository.save(myToken);
    }

    public void sendResetEmail(User user, String token) {
        String resetUrl = "http://yourdomain.com/reset-password?token=" + token;
        
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("Reset Your Fairways Hotel Password");
        email.setText("Hello,\n\nTo reset your password, please click the link below:\n" + resetUrl);
        email.setFrom("your-hotel-email@gmail.com");

        mailSender.send(email);
    }
}