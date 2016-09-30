package com.uniandes.thesis.web.rest;

import com.twilio.sdk.TwilioRestException;
import com.uniandes.thesis.service.SMSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class NotificationResource {

    @Autowired
    private SMSService smsService;

    /**
     * Notify via SMS the horror of having a fallen microservice
     */
    @RequestMapping(value = "/notify", method = RequestMethod.GET, params = {"notifyTo"})
    public void notifyViaSMS(@RequestParam(value = "notifyTo") String[] notifyTo) throws TwilioRestException {
        for (String mobileNumber : notifyTo) {
            smsService.sendSMS(mobileNumber);
        }
    }
}
