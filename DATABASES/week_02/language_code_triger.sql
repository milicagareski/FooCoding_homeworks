USE new_world;

CREATE TABLE IF NOT EXISTS notifications(
	ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    country_code VARCHAR(10) NOT NULL,
    message VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //

CREATE TRIGGER after_insert_contry_Language
AFTER INSERT ON countrylanguage
FOR EACH ROW
BEGIN
	DECLARE lc INT;
    
    SELECT COUNT(*) INTO lc
    FROM countrylanguage
    WHERE CountryCode = NEW.CountryCode;
    
    IF lc >= 10 THEN
		INSERT INTO notifications (country_code, message)
        VALUES (NEW.CountryCode, CONCAT('Country ', NEW.CountryCode, ' now has ', lc, ' Languages'));
	END IF;
END //

DELIMITER ;

-- tests


-- INSERT INTO countrylanguage (CountryCode, `Language`, IsOfficial, Percentage) VALUES ('GLP', 'Espreanto', 'T', 5.8);
-- INSERT INTO countrylanguagenotifications (CountryCode, `Language`, IsOfficial, Percentage) VALUES ('GLP', 'Swiss', 'F', 45.0);
-- INSERT INTO countrylanguage (CountryCode, `Language`, IsOfficial, Percentage) VALUES ('GLP', 'French', 'F', 22.3);
-- INSERT INTO countrylanguage (CountryCode, `Language`, IsOfficial, Percentage) VALUES ('GLP', 'Greek', 'T', 67.9);
-- INSERT INTO countrylanguage (CountryCode, `Language`, IsOfficial, Percentage) VALUES ('GLP', 'Macedonian', 'F', 93.1);
-- INSERT INTO countrylanguage (CountryCode, `Language`, IsOfficial, Percentage) VALUES ('GLP', 'Russian', 'T', 17.4);
-- INSERT INTO countrylanguage (CountryCode, `Language`, IsOfficial, Percentage) VALUES ('GLP', 'Chinese', 'T', 36.5);
-- INSERT INTO countrylanguage (CountryCode, `Language`, IsOfficial, Percentage) VALUES ('GLP', 'Polish', 'T', 42.8);
-- INSERT INTO countrylanguage (CountryCode, `Language`, IsOfficial, Percentage) VALUES ('GLP', 'Belgian', 'F', 21.7);
-- INSERT INTO countrylanguage (CountryCode, `Language`, IsOfficial, Percentage) VALUES ('GLP', 'Spanish', 'T', 84.4);

-- SELECT * FROM notifications;
