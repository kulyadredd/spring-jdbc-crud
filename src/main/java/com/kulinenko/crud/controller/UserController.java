package com.kulinenko.crud.controller;

import com.kulinenko.crud.models.User;
import com.kulinenko.crud.models.UserData;
import com.kulinenko.crud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * Class UserController
 * REST Controller that handles all user request
 *
 * Created by Kulinenko Roman
 */
@RestController
@RequestMapping(value = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.OK)
    public UserData getUsers(HttpServletRequest httpServletRequest,
         @RequestParam("start") Integer start, @RequestParam("count") Integer count) throws Exception {
        return userService.getUsers(start, count);
    }

    @RequestMapping(method = RequestMethod.POST, produces = MimeTypeUtils.APPLICATION_JSON_VALUE, consumes = MimeTypeUtils.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void addUser(HttpServletRequest httpServletRequest, @RequestBody User user) throws Exception {
        userService.insertUser(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteUser(HttpServletRequest httpServletRequest, @PathVariable(value = "id") int id) throws Exception {
        userService.deleteUserById(id);
    }

    @RequestMapping(method = RequestMethod.PUT, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.OK)
    public void updateUser(HttpServletRequest httpServletRequest, @RequestBody User user) throws Exception {
        userService.updateUser(user);
    }
}
