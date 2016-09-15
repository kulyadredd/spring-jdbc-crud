package com.kulinenko.crud.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * Class RedirectController
 * REST Controller for redirecting
 *
 * Created by Kulinenko Roman
 */
@RestController
public class RedirectController {

    // Match everything without a suffix (so not a static resource)
    @RequestMapping(value = "/{[path:[^\\.]*}")
    public ModelAndView redirect() {
        // Forward to home page so that route is preserved.
        return new ModelAndView("forward:/");
    }
}
