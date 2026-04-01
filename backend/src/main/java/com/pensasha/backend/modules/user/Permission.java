package com.pensasha.backend.modules.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "permissions")
@Setter
@Getter
public class Permission {
    @Id @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String name;
}