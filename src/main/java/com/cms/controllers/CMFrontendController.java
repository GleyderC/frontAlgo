package com.cms.controllers;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class CMFrontendController {

    private static final Logger logger = Logger.getLogger(CMFrontendController.class.getName());

    @RequestMapping(value = "/")
    public String index(HttpServletRequest request, HttpServletResponse response, Model model){

        return "index";

    }

}
