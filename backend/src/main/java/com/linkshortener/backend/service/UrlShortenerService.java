package com.linkshortener.backend.service;

import com.linkshortener.backend.model.UrlMapping;
import com.linkshortener.backend.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class UrlShortenerService {

    @Autowired
    private UrlRepository urlRepository;

    private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int CODE_LENGTH = 6;
    private final Random random = new Random();

    public UrlMapping shortenUrl(String originalUrl) {
        UrlMapping mapping = new UrlMapping();
        mapping.setOriginalUrl(originalUrl);
        mapping.setShortCode(generateUniqueShortCode());
        return urlRepository.save(mapping);
    }

    public List<UrlMapping> getAllUrls() {
        return urlRepository.findAll();
    }

    public String getOriginalUrlAndIncrementClick(String shortCode) {
        UrlMapping mapping = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("URL not found"));
        
        mapping.setClickCount(mapping.getClickCount() + 1);
        urlRepository.save(mapping);
        
        return mapping.getOriginalUrl();
    }

    private String generateUniqueShortCode() {
        String code;
        do {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < CODE_LENGTH; i++) {
                sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
            }
            code = sb.toString();
        } while (urlRepository.findByShortCode(code).isPresent());
        return code;
    }
}
