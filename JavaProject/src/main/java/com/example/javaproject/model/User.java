package com.example.javaproject.model;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Entity
@Table(name = "tbl_user")
@Data
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_seq", allocationSize = 1)
    private Long id;

    private String firstName;

    private String lastName;

    private String userName;

    private String emailId;

    private String password;

    private String roleName;

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;

}
