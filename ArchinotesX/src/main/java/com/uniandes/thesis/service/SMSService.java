package com.uniandes.thesis.service;

import com.twilio.sdk.TwilioRestClient;
import com.twilio.sdk.TwilioRestException;
import com.twilio.sdk.resource.factory.MessageFactory;
import com.twilio.sdk.resource.instance.Message;
import com.uniandes.thesis.domain.DataMicroservice;
import com.uniandes.thesis.repository.DataMicroserviceRepository;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.amazonaws.services.cloudsearchv2.model.AnalysisSchemeLanguage.It;

@Service
public class SMSService {

    public void sendSMS(String mobileNumber, String microserviceName) throws TwilioRestException {
        TwilioRestClient client = new TwilioRestClient("AC8a30897f2b17c00bc6ef005b25e1229b", "fdf0912be81dd1a5f48cc07a125c0e5e");

        // Build a filter for the MessageList
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        params.add(new BasicNameValuePair("Body", "The '" + microserviceName + "' microservice is out of service... DO SOMETHING!"));
        params.add(new BasicNameValuePair("To", "+" + mobileNumber));
        params.add(new BasicNameValuePair("From", "+12052366634"));

        MessageFactory messageFactory = client.getAccount().getMessageFactory();
        Message message = messageFactory.create(params);
        System.out.println(message.getSid());
    }
}
