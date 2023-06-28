import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js"

export const validateCreate = [
    check('cedula')
    .exists()
    .notEmpty()
    .isNumeric()
    .isLength({min: 5}),
    check('nombre')
    .not()
    .isEmpty()
    .isAlpha(),
    check('apellido')
    .notEmpty(),
    check('telefono')
    .exists()
    .isNumeric()
    .isLength({min: 10}),
    check('direccion')
    .exists()
    .not()
    .isEmpty(),
    check('correo')
    .exists()
    .isEmail()
    .normalizeEmail(),
    check('idLab')
    .notEmpty()
    .isNumeric(),
    check('fecha')
    .exists()
    .not()
    .isISO8601('yyyy-mm-dd')
    .withMessage("No ingresaste fecha valida"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]