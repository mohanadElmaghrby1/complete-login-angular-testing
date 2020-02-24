package com.mohannad.completelogin.controller;

import com.mohannad.completelogin.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * created by mohannad  on 12/02/20
 */
@RestController
@RequestMapping("api/login")
public class LoginController {

    @GetMapping()
    public ResponseEntity<User> login(){

    }
}
