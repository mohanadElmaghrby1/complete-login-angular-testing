package com.mohannad.completelogin.model;

import org.springframework.data.annotation.Id;

import javax.persistence.Entity;

/**
 * created by mohannad  on 12/02/20
 */
@Entity
public class User {
    @Id
    private long id;
    private String email;
    private String firstname;
    private String lastname;
    private String password;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
