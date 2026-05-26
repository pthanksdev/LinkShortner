package com.linkshortener.backend.controller;

import com.linkshortener.backend.model.UrlMapping;
import com.linkshortener.backend.service.UrlShortenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@CrossOrigin(origins = "*")
public class UrlController {

    @Autowired
    private UrlShortenerService urlShortenerService;

    @GetMapping
    public List<UrlMapping> getAllUrls() {
        return urlShortenerService.getAllUrls();
    }

    @PostMapping("/shorten")
    public UrlMapping shortenUrl(@RequestBody Map<String, String> request) {
        String originalUrl = request.get("url");
        if (originalUrl == null || originalUrl.isEmpty()) {
            throw new RuntimeException("URL is required");
        }
        return urlShortenerService.shortenUrl(originalUrl);
    }
}
