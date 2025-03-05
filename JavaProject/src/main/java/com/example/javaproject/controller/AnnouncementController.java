package com.example.javaproject.controller;

import com.example.javaproject.model.Announcement;
import com.example.javaproject.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping(value = "/announcement",produces = {MediaType.APPLICATION_JSON_VALUE})
public class AnnouncementController {

    @Autowired AnnouncementRepository announcementRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addAnnouncement(@RequestBody Map<String, String> requestData){
        System.out.println();
        Announcement announcement=new Announcement();
        announcement.setContent(requestData.get("content"));
        announcement.setExpiryDate(LocalDate.parse(requestData.get("expiryDate")));
        announcement.setTitle(requestData.get("title"));
        announcement.setVisible(Boolean.parseBoolean(requestData.get("visible")));
        final Announcement save = this.announcementRepository.save(announcement);
        return ResponseEntity.status(HttpStatus.OK).body(announcement);
    }



}
