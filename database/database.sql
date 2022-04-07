DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `uuid` varchar(24) NOT NULL,
  `country_code` varchar(10) NOT NULL,
  `order_type` int(11) NOT NULL,
  `validated` int(1) NOT NULL DEFAULT 0,
  `last_changed` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
