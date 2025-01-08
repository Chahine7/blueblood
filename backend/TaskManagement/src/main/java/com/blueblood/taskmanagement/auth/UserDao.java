package com.blueblood.taskmanagement.auth;

import java.util.Optional;

public interface UserDao {
    Optional<User> selectUserByEmail(String email);
    boolean existsByEmail(String email);

    void insertUser(User user);

}
