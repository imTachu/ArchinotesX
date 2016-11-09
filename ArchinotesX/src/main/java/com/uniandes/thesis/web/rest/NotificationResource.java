package com.uniandes.thesis.web.rest;

import com.uniandes.thesis.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class NotificationResource {

    @Autowired
    private MailService mailService;

    /**
     * Notify via email the horror of having a fallen microservice
     */
    @RequestMapping(value = "/notify", method = RequestMethod.GET, params = {"notifyTo"})
    public void notifyViaSMS(@RequestParam(value = "notifyTo") String[] notifyTo) {
        for (String email : notifyTo) {
            mailService.sendEmail(email, "el subject", "el content", false, true);
        }
    }
}
