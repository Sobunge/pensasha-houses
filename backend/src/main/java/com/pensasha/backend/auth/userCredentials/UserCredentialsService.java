package com.pensasha.backend.auth.userCredentials;

import com.pensasha.backend.modules.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserCredentialsService {

    private final UserCredentialsRepository credentialsRepository;
    private final PasswordEncoder passwordEncoder;

    /* ========================= CREATE ========================= */

    public UserCredentials create(User user, String rawPassword) {

        // Prevent duplicate credentials
        if (credentialsRepository.findByUser(user).isPresent()) {
            throw new IllegalStateException("Credentials already exist for user");
        }

        UserCredentials credentials = new UserCredentials();
        credentials.setUser(user);
        credentials.setPassword(passwordEncoder.encode(rawPassword));
        credentials.setEnabled(true);
        credentials.setLocked(false);

        return credentialsRepository.save(credentials);
    }

    /* ========================= READ ========================= */

    public UserCredentials getByUser(User user) {
        return credentialsRepository.findByUser(user)
                .orElseThrow(() -> new IllegalStateException("Credentials not found for user"));
    }

    public UserCredentials getByPhone(String phoneNumber) {
        return credentialsRepository.findByUser_PhoneNumber(phoneNumber)
                .orElseThrow(() ->
                        new org.springframework.security.core.userdetails.UsernameNotFoundException(
                                "Authentication failed: user not found with phone " + phoneNumber
                        ));
    }

    public Optional<UserCredentials> findByUser(User user) {
        return credentialsRepository.findByUser(user);
    }

    /* ========================= UPDATE ========================= */

    public void updatePassword(User user, String newRawPassword) {

        UserCredentials credentials = getByUser(user);

        credentials.setPassword(passwordEncoder.encode(newRawPassword));

        credentialsRepository.save(credentials);
    }

    public void lockUser(User user) {
        UserCredentials credentials = getByUser(user);
        credentials.setLocked(true);
        credentialsRepository.save(credentials);
    }

    public void unlockUser(User user) {
        UserCredentials credentials = getByUser(user);
        credentials.setLocked(false);
        credentialsRepository.save(credentials);
    }

    public void disableUser(User user) {
        UserCredentials credentials = getByUser(user);
        credentials.setEnabled(false);
        credentialsRepository.save(credentials);
    }

    /* ========================= DELETE ========================= */

    public void deleteByUser(User user) {
        credentialsRepository.deleteByUser(user);
    }
}