package com.example.javaproject.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Data
@ToString
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private boolean visible;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDate expiryDate;
}
