package com.kulinenko.crud.service;

import com.kulinenko.crud.database.MySqlConnection;
import com.kulinenko.crud.models.User;
import com.kulinenko.crud.models.UserData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Class UserService
 * Service that handle UserController
 * Use @Autowired for connect to necessary repositories
 *
 * Created by Kulinenko Roman
 */
@Service
public class UserService {

    @Autowired
    private MySqlConnection mySqlConn;

    public UserData getUsers(Integer start, Integer count) throws Exception {
        return mySqlConn.getUsers(start, count);
    }

    public User getUserById(int id) throws Exception {
        return mySqlConn.getUserById(id);
    }

    public void updateUser(User user) throws Exception {
        mySqlConn.updateUser(user);
    }

    public void insertUser(User user) throws Exception {
        mySqlConn.insertUser(user);
    }

    public void deleteUserById(Integer id) throws Exception {
        mySqlConn.deleteUserById(id);
    }

    public void deleteAllUsers() throws Exception {
        mySqlConn.deleteAllUsers();
    }
}
