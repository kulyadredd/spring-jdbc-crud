package com.kulinenko.crud.models;

import java.util.List;

/**
 * Class UserData
 * Entity that holds getusers's representation
 *
 * Created by Kulinenko Roman
 */
public class UserData {

    private Integer count;
    private List<User> userList;

    public UserData() {
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }
}
