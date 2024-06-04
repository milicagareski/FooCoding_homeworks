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
