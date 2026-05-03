import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";

// This is a reusable middleware function
// It takes any Zod schema and validates the request against it
// If validation fails, it sends back errors immediately
// If validation passes, it calls next() to continue to the controller
export const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next(); // validation passed, move on
    } catch (err) {
      if (err instanceof ZodError) {
        // Format errors in a clean way
        res.status(400).json({
          message: "Validation failed",
          errors: err.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
        return;
      }
      next(err); // unknown error, pass to global error handler
    }
  };
