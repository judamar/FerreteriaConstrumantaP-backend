-- MySQL Script generated by MySQL Workbench
-- Sat Dec 30 20:00:53 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS,
  UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
  FOREIGN_KEY_CHECKS = 0;
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
SET @OLD_SQL_MODE = @@SQL_MODE,
  SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema ferreteria-construmanta-p
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ferreteria-construmanta-p` DEFAULT CHARACTER SET utf8;
USE `ferreteria-construmanta-p`;
-- -----------------------------------------------------
-- Table `ferreteria-construmanta-p`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ferreteria-construmanta-p`.`usuarios`;
CREATE TABLE IF NOT EXISTS `ferreteria-construmanta-p`.`usuarios` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `cedula` BIGINT NOT NULL,
  `nombre_completo` VARCHAR(255) NOT NULL,
  `correo_electronico` VARCHAR(255) NULL DEFAULT NULL,
  `telefono` VARCHAR(24) NOT NULL,
  `direccion` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `es_admin` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `cedula`),
  UNIQUE INDEX `correo_electronico_UNIQUE` (`correo_electronico` ASC) VISIBLE,
  UNIQUE INDEX `telefono_UNIQUE` (`telefono` ASC) VISIBLE
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `ferreteria-construmanta-p`.`sugerencias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ferreteria-construmanta-p`.`sugerencias`;
CREATE TABLE IF NOT EXISTS `ferreteria-construmanta-p`.`sugerencias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuarios_id` CHAR(36) NOT NULL,
  `mensaje` TEXT(1024) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_sugerencias_usuarios1_idx` (`usuarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_sugerencias_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `ferreteria-construmanta-p`.`usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `ferreteria-construmanta-p`.`estados_reservas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ferreteria-construmanta-p`.`estados_reservas`;
CREATE TABLE IF NOT EXISTS `ferreteria-construmanta-p`.`estados_reservas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(24) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `ferreteria-construmanta-p`.`estados_herramientas_maquinas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ferreteria-construmanta-p`.`estados_herramientas_maquinas`;
CREATE TABLE IF NOT EXISTS `ferreteria-construmanta-p`.`estados_herramientas_maquinas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(24) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `ferreteria-construmanta-p`.`herramientas_maquinas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ferreteria-construmanta-p`.`herramientas_maquinas`;
CREATE TABLE IF NOT EXISTS `ferreteria-construmanta-p`.`herramientas_maquinas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_articulo` VARCHAR(45) NOT NULL,
  `url_imagen` VARCHAR(255) NULL DEFAULT NULL,
  `descripcion` TEXT(400) NULL DEFAULT NULL,
  `precio_alquiler` DECIMAL(10, 2) NOT NULL,
  `cantidad_disponible` INT NOT NULL,
  `estados_herramientas_maquinas_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_herramientas_maquinas_estados_herramientas_maquinas1_idx` (`estados_herramientas_maquinas_id` ASC) VISIBLE,
  CONSTRAINT `fk_herramientas_maquinas_estados_herramientas_maquinas1` FOREIGN KEY (`estados_herramientas_maquinas_id`) REFERENCES `ferreteria-construmanta-p`.`estados_herramientas_maquinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `ferreteria-construmanta-p`.`reservas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ferreteria-construmanta-p`.`reservas`;
CREATE TABLE IF NOT EXISTS `ferreteria-construmanta-p`.`reservas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuarios_id` CHAR(36) NOT NULL,
  `herramientas_maquinas_id` INT NOT NULL,
  `fecha_inicio` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_fin` DATETIME NOT NULL,
  `cantidad` INT NOT NULL,
  `estados_reservas_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_reservas_usuarios1_idx` (`usuarios_id` ASC) VISIBLE,
  INDEX `fk_reservas_herramientas_maquinas1_idx` (`herramientas_maquinas_id` ASC) VISIBLE,
  INDEX `fk_reservas_estados_reservas1_idx` (`estados_reservas_id` ASC) VISIBLE,
  CONSTRAINT `fk_reservas_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `ferreteria-construmanta-p`.`usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reservas_herramientas_maquinas1` FOREIGN KEY (`herramientas_maquinas_id`) REFERENCES `ferreteria-construmanta-p`.`herramientas_maquinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reservas_estados_reservas1` FOREIGN KEY (`estados_reservas_id`) REFERENCES `ferreteria-construmanta-p`.`estados_reservas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `ferreteria-construmanta-p`.`estados_ventas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ferreteria-construmanta-p`.`estados_ventas`;
CREATE TABLE IF NOT EXISTS `ferreteria-construmanta-p`.`estados_ventas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(24) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `ferreteria-construmanta-p`.`ventas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ferreteria-construmanta-p`.`ventas`;
CREATE TABLE IF NOT EXISTS `ferreteria-construmanta-p`.`ventas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuarios_id` CHAR(36) NOT NULL,
  `fecha_emision` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `total_venta` DECIMAL(10, 2) NOT NULL DEFAULT 0,
  `enviar_factura` TINYINT NOT NULL DEFAULT 0,
  `estados_ventas_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ventas_usuarios1_idx` (`usuarios_id` ASC) VISIBLE,
  INDEX `fk_ventas_estados_ventas1_idx` (`estados_ventas_id` ASC) VISIBLE,
  CONSTRAINT `fk_ventas_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `ferreteria-construmanta-p`.`usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ventas_estados_ventas1` FOREIGN KEY (`estados_ventas_id`) REFERENCES `ferreteria-construmanta-p`.`estados_ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `ferreteria-construmanta-p`.`categorias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ferreteria-construmanta-p`.`categorias`;
CREATE TABLE IF NOT EXISTS `ferreteria-construmanta-p`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categoria` VARCHAR(48) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `categoria_UNIQUE` (`categoria` ASC) VISIBLE
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `ferreteria-construmanta-p`.`productos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ferreteria-construmanta-p`.`productos`;
CREATE TABLE IF NOT EXISTS `ferreteria-construmanta-p`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_producto` VARCHAR(128) NOT NULL,
  `clave_producto` VARCHAR(128) NOT NULL,
  `url_imagen` VARCHAR(255) NULL DEFAULT NULL,
  `marca` VARCHAR(64) NOT NULL,
  `descripcion` TEXT(400) NULL DEFAULT NULL,
  `categorias_id` INT NOT NULL,
  `cantidad` FLOAT(10, 2) NOT NULL,
  `precio` FLOAT(10, 2) NOT NULL,
  PRIMARY KEY (`id`, `clave_producto`),
  INDEX `fk_productos_categorias1_idx` (`categorias_id` ASC) VISIBLE,
  CONSTRAINT `fk_productos_categorias1` FOREIGN KEY (`categorias_id`) REFERENCES `ferreteria-construmanta-p`.`categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `ferreteria-construmanta-p`.`detalles_ventas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ferreteria-construmanta-p`.`detalles_ventas`;
CREATE TABLE IF NOT EXISTS `ferreteria-construmanta-p`.`detalles_ventas` (
  `id` INT NOT NULL DEFAULT AUTO_INCREMENT,
  `ventas_id` INT NOT NULL,
  `productos_id` INT NOT NULL,
  `cantidad_vendida` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_detalles_ventas_ventas1_idx` (`ventas_id` ASC) VISIBLE,
  INDEX `fk_detalles_ventas_productos1_idx` (`productos_id` ASC) VISIBLE,
  CONSTRAINT `fk_detalles_ventas_ventas1` FOREIGN KEY (`ventas_id`) REFERENCES `ferreteria-construmanta-p`.`ventas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_detalles_ventas_productos1` FOREIGN KEY (`productos_id`) REFERENCES `ferreteria-construmanta-p`.`productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `ferreteria-construmanta-p`.`proveedores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ferreteria-construmanta-p`.`proveedores`;
CREATE TABLE IF NOT EXISTS `ferreteria-construmanta-p`.`proveedores` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `NIT` VARCHAR(64) NOT NULL,
  `nombre_proveedor` VARCHAR(255) NOT NULL,
  `direccion_proveedor` VARCHAR(255) NOT NULL,
  `telefono_proveedor` VARCHAR(24) NOT NULL,
  `correo_proveedor` VARCHAR(255) NOT NULL,
  `telefono_vendedor` VARCHAR(24) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `NIT_UNIQUE` (`NIT` ASC) VISIBLE,
  UNIQUE INDEX `nombre_proveedor_UNIQUE` (`nombre_proveedor` ASC) VISIBLE,
  UNIQUE INDEX `correo_proveedor_UNIQUE` (`correo_proveedor` ASC) VISIBLE,
  UNIQUE INDEX `telefono_proveedor_UNIQUE` (`telefono_proveedor` ASC) VISIBLE
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `ferreteria-construmanta-p`.`proveedores_has_categorias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ferreteria-construmanta-p`.`proveedores_has_categorias`;
CREATE TABLE IF NOT EXISTS `ferreteria-construmanta-p`.`proveedores_has_categorias` (
  `proveedores_id` CHAR(36) NOT NULL,
  `categorias_id` INT NOT NULL,
  PRIMARY KEY (`proveedores_id`, `categorias_id`),
  INDEX `fk_proveedores_has_categorias_categorias1_idx` (`categorias_id` ASC) VISIBLE,
  INDEX `fk_proveedores_has_categorias_proveedores1_idx` (`proveedores_id` ASC) VISIBLE,
  CONSTRAINT `fk_proveedores_has_categorias_proveedores1` FOREIGN KEY (`proveedores_id`) REFERENCES `ferreteria-construmanta-p`.`proveedores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_proveedores_has_categorias_categorias1` FOREIGN KEY (`categorias_id`) REFERENCES `ferreteria-construmanta-p`.`categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;