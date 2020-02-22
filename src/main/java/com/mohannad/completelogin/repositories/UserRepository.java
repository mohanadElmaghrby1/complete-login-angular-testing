package com.mohannad.completelogin.repositories;

import com.mohannad.completelogin.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * created by mohannad  on 12/02/20
 */
@Repository
public interface UserRepository extends CrudRepository<User , Long> {
}
