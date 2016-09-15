package com.kulinenko.crud.controller;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

import com.kulinenko.crud.models.UserData;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.kulinenko.crud.SpringJDBCApplication;
import com.kulinenko.crud.models.User;
import com.kulinenko.crud.service.UserService;

/**
 * Created by Roman Kulinenko
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = SpringJDBCApplication.class)
@WebAppConfiguration
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class UserControllerTests {

	private MockMvc mvc;

	@Autowired
	private WebApplicationContext wac;

	@Autowired
	private UserService userService;

	@Before
	public void populate() throws Exception{
		this.mvc = MockMvcBuilders.webAppContextSetup(this.wac).build();

		User user1 = new User();
		User user2 = new User();

		user1.setName("User-1");
		user2.setName("User-2");

	 	userService.insertUser(user1);
		userService.insertUser(user2);
	}

	@After
	public void erase() throws Exception{
		userService.deleteAllUsers();
	}

	@Test
	public void getUsersTest() throws Exception{
		mvc
			.perform(get("/api/users").param("start", "0").param("count", "10"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$count", is(2)));
	}

	@Test
	public void insertUserTest() throws Exception{
		mvc
			.perform(post("/api/users").content("{\"name\": \"User-3\"}").contentType(MediaType.APPLICATION_JSON_UTF8))
			.andExpect(status().isCreated());
		mvc
			.perform(get("/api/users").param("start", "0").param("count", "10"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$count", is(3)));
	}

	@Test
	public void deleteUserTest() throws Exception{
		UserData usersBeforeDelete = userService.getUsers(0, 10);
		assertNotNull(usersBeforeDelete.getUserList());
		assertEquals(usersBeforeDelete.getUserList().size(), 2);
		mvc
			.perform(delete("/api/users/1"))
			.andExpect(status().isOk());
		UserData usersAfterDelete = userService.getUsers(0, 10);
		assertNotNull(usersAfterDelete.getUserList());
		assertEquals(usersAfterDelete.getUserList().size(), 1);
	}

	@Test
	public void updateUserTest() throws Exception{
		mvc
			.perform(put("/api/users").content("{\"id\":1, \"name\":\"Updated User\"}").contentType(MediaType.APPLICATION_JSON_UTF8))
				.andExpect(status().isOk());
		mvc
			.perform(get("/api/users").param("start", "0").param("count", "10"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$count", is(2)));

		User updatedUser = userService.getUserById(1);
		assertNotNull(updatedUser);
		assertEquals(updatedUser.getId(), 1);
		assertEquals(updatedUser.getName(), "Updated User");
	}
	@Test
	public void getPages() throws Exception{
		mvc
			.perform(get("/api/users").param("start", "0").param("count", "1"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$userList", hasSize(1)));
		mvc
			.perform(get("/api/users").param("start", "1").param("count", "1"))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$userList", hasSize(1)));
	}
}
