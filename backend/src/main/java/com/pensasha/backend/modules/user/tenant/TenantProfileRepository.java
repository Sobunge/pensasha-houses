package com.pensasha.backend.modules.user.tenant;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TenantProfileRepository extends JpaRepository<TenantProfile, Long> {

}
