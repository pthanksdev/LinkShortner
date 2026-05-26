package com.linkshortener.backend.repository;

import com.linkshortener.backend.model.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UrlRepository extends JpaRepository<UrlMapping, Long> {
    Optional<UrlMapping> findByShortCode(String shortCode);
}
