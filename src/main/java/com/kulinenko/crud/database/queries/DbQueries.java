package com.kulinenko.crud.database.queries;

/**
 * Class DbQueries
 * Interface that holds all queries to data base
 *
 * Created by Roman Kulinenko
 */
public interface DbQueries {
    public final String SELECT_ALL_QUERY = "SELECT * FROM users ORDER BY users.id DESC LIMIT %1$d, %2$d";
    public final String DROP_TABLE_QUERY = "TRUNCATE users";
    public final String DELETE_USER_BY_ID_QUERY = "DELETE FROM users WHERE id = %1$d";
    public final String GET_ALL_USERS_COUNT_QUERY = "SELECT COUNT(*) FROM users";
    public final String GET_USER_BY_ID_QUERY = "SELECT * FROM users WHERE id = %1$d";
    public final String UPDATE_USER_BY_ID_QUERY = "UPDATE users SET name = '%1$s', mobile = '%2$s', email = '%3$s' WHERE id = %4$d";
    public final String INSERT_USER_QUERY = "INSERT INTO users (name, email, mobile) VALUES ('%1$s', '%2$s', '%3$s')";
    public final String CREATE_TABLE_QUERY = "CREATE TABLE users (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
            "name VARCHAR(255) not NULL, email VARCHAR(255), mobile VARCHAR(255))";

    public final String CONNECTION_QUERY = "jdbc:mysql://localhost/crud?serverTimezone=UTC&user=%s&password=%s";
}
