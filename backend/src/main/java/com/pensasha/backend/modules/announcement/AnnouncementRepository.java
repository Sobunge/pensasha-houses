package com.pensasha.backend.modules.announcement;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    
    // Custom query to find announcements by user ID
    List<Announcement> findByUserId(Long userId);
}
