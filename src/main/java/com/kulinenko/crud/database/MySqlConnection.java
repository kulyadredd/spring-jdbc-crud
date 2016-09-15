package com.kulinenko.crud.database;

import com.kulinenko.crud.models.User;
import com.kulinenko.crud.models.UserData;
import com.kulinenko.crud.database.queries.DbQueries;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import static com.kulinenko.crud.database.queries.DbQueries.CREATE_TABLE_QUERY;

/**
 * Class MySqlConnection
 * That class handles all user request to DB
 *
 * Created by Roman Kulinenko
 */
@Component
public class MySqlConnection {

    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;

    private Connection connect = null;
    private Statement statement = null;

    private void connection() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        connect = DriverManager.getConnection(String.format(DbQueries.CONNECTION_QUERY, username, password));
        statement = connect.createStatement();
        ResultSet resultSet = connect.getMetaData().getTables(null, null, "users", null);
        if (!resultSet.next())
            statement.executeUpdate(CREATE_TABLE_QUERY);
    }

    private void closeConnection() throws SQLException {
        connect.close();
    }

    public UserData getUsers(Integer start, Integer count) throws Exception {
        connection();
        UserData userData = new UserData();
        ResultSet resultSet = statement.executeQuery(DbQueries.GET_ALL_USERS_COUNT_QUERY);
        resultSet.next();
        userData.setCount(resultSet.getInt(1));
        resultSet = statement.executeQuery(String.format(DbQueries.SELECT_ALL_QUERY, start, count));
        userData.setUserList(writeResultSet(resultSet));
        return userData;
    }

    public User getUserById(int id) throws Exception {
        connection();
        ResultSet resultSet = statement.executeQuery(String.format(DbQueries.GET_USER_BY_ID_QUERY, id));
        return writeResultSet(resultSet).get(0);
    }

    public void updateUser(User user) throws Exception {
        connection();
        statement.executeUpdate(String.format(
            DbQueries.UPDATE_USER_BY_ID_QUERY,
            user.getName(),
            user.getMobile(),
            user.getEmail(),
            user.getId()));
        closeConnection();
    }

    public void insertUser(User user) throws Exception {
        connection();
        statement.executeUpdate(String.format(DbQueries.INSERT_USER_QUERY,
            user.getName(),
            user.getEmail(),
            user.getMobile()));
        closeConnection();
    }

    public void deleteUserById(Integer id) throws Exception {
        connection();
        statement.execute(String.format(DbQueries.DELETE_USER_BY_ID_QUERY, id));
        closeConnection();
    }

    public void deleteAllUsers() throws Exception {
        connection();
        statement.execute(DbQueries.DROP_TABLE_QUERY);
        closeConnection();
    }

    private List<User> writeResultSet(ResultSet resultSet) throws SQLException {
        List<User> users = new ArrayList<>();
        while (resultSet.next()) {
            users.add(new User(
                resultSet.getInt("id"),
                resultSet.getString("name"),
                resultSet.getString("email"),
                resultSet.getString("mobile")));
        }
        closeConnection();
        return users;
    }
}
