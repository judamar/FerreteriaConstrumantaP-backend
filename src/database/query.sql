SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema FerreteriaConstrumantaP
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema FerreteriaConstrumantaP
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS ferreteria-construmanta-p DEFAULT CHARACTER SET utf8 ;
USE ferreteria-construmanta-p ;

-- -----------------------------------------------------
-- Table `FerreteriaConstrumantaP`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS usuario (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(20) NOT NULL,
  `nombre_completo` VARCHAR(100) NOT NULL,
  `correo_electronico` VARCHAR(50) NOT NULL,
  `direccion` VARCHAR(50) NULL,
  `telefono` INT(10) NOT NULL,
  `es_admin` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `correo_electronico_UNIQUE` (`correo_electronico` ASC) VISIBLE,
  UNIQUE INDEX `telefono_UNIQUE` (`telefono` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FerreteriaConstrumantaP`.`sugerencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FerreteriaConstrumantaP`.`sugerencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `mensaje` TEXT(300) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_sugerencia_usuario_idx` (`usuario_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `fk_sugerencia_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `FerreteriaConstrumantaP`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FerreteriaConstrumantaP`.`estado_reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FerreteriaConstrumantaP`.`estado_reserva` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FerreteriaConstrumantaP`.`estado_herramienta_maquina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FerreteriaConstrumantaP`.`estado_herramienta_maquina` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FerreteriaConstrumantaP`.`herramienta_maquina`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FerreteriaConstrumantaP`.`herramienta_maquina` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_articulo` VARCHAR(45) NOT NULL,
  `descripcion` TEXT NULL,
  `precio_alquiler` INT(20) NOT NULL,
  `cantidad_disponible` INT NOT NULL,
  `estado_herramienta_maquina_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_herramienta_maquina_estado_herramienta_maquina1_idx` (`estado_herramienta_maquina_id` ASC) VISIBLE,
  CONSTRAINT `fk_herramienta_maquina_estado_herramienta_maquina1`
    FOREIGN KEY (`estado_herramienta_maquina_id`)
    REFERENCES `FerreteriaConstrumantaP`.`estado_herramienta_maquina` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FerreteriaConstrumantaP`.`reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FerreteriaConstrumantaP`.`reserva` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha_inicio` DATE NOT NULL,
  `fecha_fin` DATE NOT NULL,
  `cantidad` INT NOT NULL,
  `estado_reserva_id` INT NOT NULL,
  `herramienta_maquina_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_reserva_estado_reserva1_idx` (`estado_reserva_id` ASC) VISIBLE,
  INDEX `fk_reserva_herramienta_maquina1_idx` (`herramienta_maquina_id` ASC) VISIBLE,
  INDEX `fk_reserva_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_reserva_estado_reserva1`
    FOREIGN KEY (`estado_reserva_id`)
    REFERENCES `FerreteriaConstrumantaP`.`estado_reserva` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reserva_herramienta_maquina1`
    FOREIGN KEY (`herramienta_maquina_id`)
    REFERENCES `FerreteriaConstrumantaP`.`herramienta_maquina` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reserva_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `FerreteriaConstrumantaP`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FerreteriaConstrumantaP`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FerreteriaConstrumantaP`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categoria` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `categoria_UNIQUE` (`categoria` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FerreteriaConstrumantaP`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FerreteriaConstrumantaP`.`producto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_producto` VARCHAR(45) NOT NULL,
  `descripcion` TEXT(300) NULL,
  `precio` FLOAT NOT NULL,
  `cantidad` INT NOT NULL,
  `categoria_id` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `nombre_producto_UNIQUE` (`nombre_producto` ASC) VISIBLE,
  INDEX `fk_producto_categoria1_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_producto_categoria1`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `FerreteriaConstrumantaP`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FerreteriaConstrumantaP`.`detalle_factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FerreteriaConstrumantaP`.`detalle_factura` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cantidad` INT NOT NULL,
  `producto_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_detalle_factura_producto1_idx` (`producto_id` ASC) VISIBLE,
  CONSTRAINT `fk_detalle_factura_producto1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `FerreteriaConstrumantaP`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FerreteriaConstrumantaP`.`factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FerreteriaConstrumantaP`.`factura` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha_emision` TIMESTAMP NOT NULL,
  `total` FLOAT NOT NULL,
  `enviar_factura` TINYINT NOT NULL,
  `correo_enviado` TINYINT NOT NULL,
  `usuario_id` INT NOT NULL,
  `detalle_factura_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_factura_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_factura_detalle_factura1_idx` (`detalle_factura_id` ASC) VISIBLE,
  CONSTRAINT `fk_factura_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `FerreteriaConstrumantaP`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_factura_detalle_factura1`
    FOREIGN KEY (`detalle_factura_id`)
    REFERENCES `FerreteriaConstrumantaP`.`detalle_factura` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FerreteriaConstrumantaP`.`proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FerreteriaConstrumantaP`.`proveedor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `NIT` INT NOT NULL,
  `nombre_proveedor` VARCHAR(45) NOT NULL,
  `direccion_proveedor` VARCHAR(45) NOT NULL,
  `telefono_proveedor` INT(10) NOT NULL,
  `correo_proveedor` VARCHAR(45) NOT NULL,
  `telefono_vendedor` INT(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `NIT_UNIQUE` (`NIT` ASC) VISIBLE,
  UNIQUE INDEX `nombre_proveedor_UNIQUE` (`nombre_proveedor` ASC) VISIBLE,
  UNIQUE INDEX `correo_proveedor_UNIQUE` (`correo_proveedor` ASC) VISIBLE,
  UNIQUE INDEX `telefono_proveedor_UNIQUE` (`telefono_proveedor` ASC) VISIBLE,
  UNIQUE INDEX `telefono_vendedor_UNIQUE` (`telefono_vendedor` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FerreteriaConstrumantaP`.`categoria_has_proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FerreteriaConstrumantaP`.`categoria_has_proveedor` (
  `categoria_id` INT NULL,
  `proveedor_id` INT NULL,
  PRIMARY KEY (`categoria_id`, `proveedor_id`),
  INDEX `fk_categoria_has_proveedor_proveedor1_idx` (`proveedor_id` ASC) VISIBLE,
  INDEX `fk_categoria_has_proveedor_categoria1_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_categoria_has_proveedor_categoria1`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `FerreteriaConstrumantaP`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_categoria_has_proveedor_proveedor1`
    FOREIGN KEY (`proveedor_id`)
    REFERENCES `FerreteriaConstrumantaP`.`proveedor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FerreteriaConstrumantaP`.`producto_has_proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FerreteriaConstrumantaP`.`producto_has_proveedor` (
  `producto_id` INT NULL,
  `proveedor_id` INT NULL,
  PRIMARY KEY (`producto_id`, `proveedor_id`),
  INDEX `fk_producto_has_proveedor_proveedor1_idx` (`proveedor_id` ASC) VISIBLE,
  INDEX `fk_producto_has_proveedor_producto1_idx` (`producto_id` ASC) VISIBLE,
  CONSTRAINT `fk_producto_has_proveedor_producto1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `FerreteriaConstrumantaP`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_producto_has_proveedor_proveedor1`
    FOREIGN KEY (`proveedor_id`)
    REFERENCES `FerreteriaConstrumantaP`.`proveedor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
