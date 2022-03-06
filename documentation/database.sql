DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `uuid` varchar(24) NOT NULL,
  `country_code` varchar(10) NOT NULL,
  `order_type` int(11) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;